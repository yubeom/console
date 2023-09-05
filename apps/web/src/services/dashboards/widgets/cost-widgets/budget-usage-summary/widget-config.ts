import { defineAsyncComponent } from 'vue';

import type { WidgetConfig } from '@/services/dashboards/widgets/_configs/config';
import { GRANULARITY } from '@/services/dashboards/widgets/_configs/config';
import {
    getWidgetFilterOptionsSchema,
    getWidgetFilterSchemaPropertyNames,
} from '@/services/dashboards/widgets/_helpers/widget-schema-helper';

const budgetUsageSummaryConfig: WidgetConfig = {
    widget_config_id: 'budgetUsageSummary',
    widget_component: defineAsyncComponent(() => import('@/services/dashboards/widgets/cost-widgets/budget-usage-summary/BudgetUsageSummaryWidget.vue')),
    title: 'Budget Usage Summary',
    labels: ['Cost'],
    description: {
        translation_id: 'DASHBOARDS.WIDGET.BUDGET_USAGE_SUMMARY.DESC',
        preview_image: 'widget-img_budgetUsageSummary--thumbnail.png',
    },
    scopes: ['PROJECT', 'WORKSPACE'],
    theme: {
        inherit: true,
        inherit_count: 1,
    },
    sizes: ['sm', 'full'],
    options: {
        granularity: GRANULARITY.YEARLY,
    },
    options_schema: {
        default_properties: getWidgetFilterSchemaPropertyNames('provider', 'project', 'region', 'cost_product'),
        schema: {
            type: 'object',
            properties: getWidgetFilterOptionsSchema('provider', 'project', 'service_account', 'cost_product', 'region'),
            order: getWidgetFilterSchemaPropertyNames('provider', 'project', 'service_account', 'cost_product', 'region'),
        },
    },
};

export default budgetUsageSummaryConfig;
