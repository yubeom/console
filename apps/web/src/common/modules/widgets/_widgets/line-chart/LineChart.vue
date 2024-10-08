<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core/index';
import {
    computed, defineExpose, reactive, ref, watch,
} from 'vue';

import dayjs from 'dayjs';
import type { LineSeriesOption } from 'echarts/charts';
import { init } from 'echarts/core';
import type {
    EChartsType,
} from 'echarts/core';
import {
    groupBy, isEmpty, orderBy, throttle,
} from 'lodash';

import { SpaceConnector } from '@cloudforet/core-lib/space-connector';
import { numberFormatter } from '@cloudforet/utils';

import type { ListResponse } from '@/schema/_common/api-verbs/list';
import type { PrivateWidgetLoadParameters } from '@/schema/dashboard/private-widget/api-verbs/load';
import type { PublicWidgetLoadParameters } from '@/schema/dashboard/public-widget/api-verbs/load';

import type { APIErrorToast } from '@/common/composables/error/errorHandler';
import ErrorHandler from '@/common/composables/error/errorHandler';
import WidgetFrame from '@/common/modules/widgets/_components/WidgetFrame.vue';
import { useWidgetFrame } from '@/common/modules/widgets/_composables/use-widget-frame';
import { useWidgetInitAndRefresh } from '@/common/modules/widgets/_composables/use-widget-init-and-refresh';
import { DATE_FIELD } from '@/common/modules/widgets/_constants/widget-constant';
import { DATE_FORMAT } from '@/common/modules/widgets/_constants/widget-field-constant';
import {
    getApiQueryDateRange,
    getReferenceLabel,
    getWidgetBasedOnDate,
    getWidgetDateFields,
    getWidgetDateRange,
} from '@/common/modules/widgets/_helpers/widget-date-helper';
import type { DateRange } from '@/common/modules/widgets/types/widget-data-type';
import type {
    WidgetProps, WidgetEmit, WidgetExpose,
} from '@/common/modules/widgets/types/widget-display-type';
import type { LineByValue, XAxisValue, DateFormatValue } from '@/common/modules/widgets/types/widget-field-value-type';

import { MASSIVE_CHART_COLORS } from '@/styles/colorsets';


type Data = ListResponse<{
    [key: string]: string|number;
}>;
const props = defineProps<WidgetProps>();
const emit = defineEmits<WidgetEmit>();

const chartContext = ref<HTMLElement|null>(null);
const state = reactive({
    loading: false,
    errorMessage: undefined as string|undefined,
    data: null as Data | null,
    chart: null as EChartsType | null,
    xAxisData: [],
    chartData: [],
    unit: computed<string|undefined>(() => widgetFrameProps.value.unitMap?.[state.dataField]),
    chartOptions: computed<LineSeriesOption>(() => ({
        color: MASSIVE_CHART_COLORS,
        grid: {
            left: 10,
            right: 10,
            containLabel: true,
        },
        legend: {
            type: 'scroll',
            show: state.showLegends,
            bottom: 0,
            left: 0,
            icon: 'circle',
            itemWidth: 10,
            itemHeight: 10,
            formatter: (val) => getReferenceLabel(props.allReferenceTypeInfo, state.lineByField, val),
        },
        tooltip: {
            trigger: 'axis',
            confine: true,
            formatter: (params) => {
                const _params = params as any[];
                let _axisValue = getReferenceLabel(props.allReferenceTypeInfo, state.xAxisField, _params[0].axisValue);
                if (state.xAxisField === DATE_FIELD.DATE) {
                    _axisValue = dayjs.utc(_axisValue).format(state.dateFormat);
                }
                if (state.unit) _axisValue += ` (${state.unit})`;
                const _values = _params.map((p) => {
                    const _seriesName = getReferenceLabel(props.allReferenceTypeInfo, state.lineByField, p.seriesName);
                    const _value = p.value ? numberFormatter(p.value) : undefined;
                    if (!_value) return undefined;
                    return `${p.marker} ${_seriesName}: <b>${_value}</b>`;
                });
                return [_axisValue, ..._values].filter((d) => !!d).join('<br/>');
            },
        },
        xAxis: {
            type: 'category',
            data: state.xAxisData,
            axisLabel: {
                formatter: (val) => {
                    if (state.xAxisField === DATE_FIELD.DATE) {
                        return dayjs.utc(val).format(state.dateFormat);
                    }
                    return getReferenceLabel(props.allReferenceTypeInfo, state.xAxisField, val);
                },
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: (val) => numberFormatter(val, { notation: 'compact' }),
            },
        },
        series: state.chartData,
    })),
    // required fields
    granularity: computed<string>(() => props.widgetOptions?.granularity as string),
    basedOnDate: computed(() => getWidgetBasedOnDate(state.granularity, props.dashboardOptions?.date_range?.end)),
    xAxisField: computed<string>(() => (props.widgetOptions?.xAxis as XAxisValue)?.value),
    xAxisCount: computed<number>(() => (props.widgetOptions?.xAxis as XAxisValue)?.count),
    dataField: computed<string|undefined>(() => props.widgetOptions?.dataField as string),
    lineByField: computed<string|undefined>(() => (props.widgetOptions?.lineBy as LineByValue)?.value),
    lineByCount: computed<number>(() => (props.widgetOptions?.lineBy as LineByValue)?.count),
    dateRange: computed<DateRange>(() => {
        let _start = state.basedOnDate;
        let _end = state.basedOnDate;
        if (Object.values(DATE_FIELD).includes(state.xAxisField)) {
            [_start, _end] = getWidgetDateRange(state.granularity, state.basedOnDate, state.xAxisCount);
        } else if (Object.values(DATE_FIELD).includes(state.lineByField)) {
            [_start, _end] = getWidgetDateRange(state.granularity, state.basedOnDate, state.lineByCount);
        }
        return { start: _start, end: _end };
    }),
    // optional fields
    showLegends: computed<boolean>(() => props.widgetOptions?.legend as boolean),
    dateFormat: computed<string|undefined>(() => {
        const _dateFormat = (props.widgetOptions?.dateFormat as DateFormatValue)?.value || 'MMM DD, YYYY';
        return DATE_FORMAT?.[_dateFormat]?.[state.granularity];
    }),
});
const { widgetFrameProps, widgetFrameEventHandlers } = useWidgetFrame(props, emit, {
    dateRange: computed(() => state.dateRange),
    errorMessage: computed(() => state.errorMessage),
    widgetLoading: computed(() => state.loading),
    noData: computed(() => (state.data ? !state.data.results?.length : false)),
});

/* Util */
const fetchWidget = async (): Promise<Data|APIErrorToast|undefined> => {
    if (props.widgetState === 'INACTIVE') return undefined;
    try {
        const _isPrivate = props.widgetId.startsWith('private');
        const _fetcher = _isPrivate
            ? SpaceConnector.clientV2.dashboard.privateWidget.load<PrivateWidgetLoadParameters, Data>
            : SpaceConnector.clientV2.dashboard.publicWidget.load<PublicWidgetLoadParameters, Data>;
        const _queryDateRange = getApiQueryDateRange(state.granularity, state.dateRange);
        const _query: any = {
            granularity: state.granularity,
            start: _queryDateRange.start,
            end: _queryDateRange.end,
            group_by: [state.xAxisField],
            fields: {
                [state.dataField]: {
                    key: state.dataField,
                    operator: 'sum',
                },
            },
            page: { start: 1, limit: state.xAxisCount },
        };
        if (state.lineByField) {
            _query.group_by = [state.xAxisField, state.lineByField];
            _query.field_group = [state.lineByField];
            _query.sort = [{ key: `_total_${state.dataField}`, desc: true }];
        }
        const res = await _fetcher({
            widget_id: props.widgetId,
            query: _query,
            vars: props.dashboardVars,
        });
        state.errorMessage = undefined;
        return res;
    } catch (e: any) {
        state.loading = false;
        state.errorMessage = e.message;
        ErrorHandler.handleError(e);
        return ErrorHandler.makeAPIErrorToast(e);
    }
};
const getLineByData = (rawData: Data) => {
    // slice lineByData by lineByCount
    const _slicedByLineBy: any[] = [];
    rawData.results?.forEach((d) => {
        const _slicedData = orderBy(d[state.dataField], 'value', 'desc').slice(0, state.lineByCount);
        const _etcData = d[state.dataField]?.slice(state.lineByCount).reduce((acc, v) => {
            acc[state.lineByField] = 'etc';
            acc.value += v.value || 0;
            return acc;
        }, { value: 0 });
        const _values = _etcData.value === 0 ? _slicedData : [..._slicedData, _etcData];
        _values.forEach((v) => {
            _slicedByLineBy.push({
                [state.xAxisField]: d[state.xAxisField],
                ...v,
            });
        });
    });

    // set chart data
    const _seriesData: any[] = [];
    Object.entries(groupBy(_slicedByLineBy, state.lineByField)).forEach(([key, value]) => {
        _seriesData.push({
            name: key,
            type: 'line',
            data: state.xAxisData.map((date) => {
                const _data = value.find((v) => v[state.xAxisField] === date);
                return _data ? _data.value : 0;
            }),
        });
    });
    return _seriesData;
};
const getTotalData = (rawData: Data) => ({
    name: state.dataField,
    type: 'line',
    data: state.xAxisData.map((d) => {
        const _data = rawData.results?.find((v) => v[state.xAxisField] === d);
        return _data ? _data[state.dataField] : 0;
    }),
});
const drawChart = (rawData: Data|null) => {
    if (isEmpty(rawData)) return;

    // set xAxis data
    if (state.xAxisField === DATE_FIELD.DATE) {
        state.xAxisData = getWidgetDateFields(state.granularity, state.dateRange.start, state.dateRange.end);
    } else {
        state.xAxisData = rawData.results?.map((d) => d[state.xAxisField] as string) ?? [];
    }

    // get converted chart data
    if (state.lineByField) {
        state.chartData = getLineByData(rawData);
    } else {
        state.chartData = getTotalData(rawData);
    }
};

const loadWidget = async (): Promise<Data|APIErrorToast> => {
    state.loading = true;
    const res = await fetchWidget();
    if (typeof res === 'function') return res;
    state.data = res;
    drawChart(state.data);
    state.loading = false;
    return state.data;
};

/* Watcher */
watch([() => state.chartData, () => chartContext.value], ([, chartCtx]) => {
    if (chartCtx) {
        state.chart = init(chartContext.value);
        state.chart.setOption(state.chartOptions, true);
    }
});

useResizeObserver(chartContext, throttle(() => {
    state.chart?.resize();
}, 500));
useWidgetInitAndRefresh({ props, emit, loadWidget });
defineExpose<WidgetExpose<Data>>({
    loadWidget,
});
</script>

<template>
    <widget-frame v-bind="widgetFrameProps"
                  v-on="widgetFrameEventHandlers"
    >
        <!--Do not delete div element below. It's defense code for redraw-->
        <div class="h-full">
            <div ref="chartContext"
                 class="h-full"
            />
        </div>
    </widget-frame>
</template>
