import type { Meta, StoryObj } from '@storybook/vue';
import type { ComponentProps } from 'vue-component-type-helpers';


import mock from '@/data-display/dynamic/dynamic-layout/mock';
import PDynamicLayout from '@/data-display/dynamic/dynamic-layout/PDynamicLayout.vue';
import { getDynamicLayoutRawTableArgTypes } from '@/data-display/dynamic/dynamic-layout/templates/raw-table/story-helper';
import { I18nConnector } from '@/translations';

type PDynamicLayoutPropsAndCustomArgs = ComponentProps<typeof PDynamicLayout>;

const meta : Meta<PDynamicLayoutPropsAndCustomArgs> = {
    title: 'Data Display/Dynamic/Dynamic Layout/- [Table] Raw Table',
    component: PDynamicLayout,
    argTypes: {
        ...getDynamicLayoutRawTableArgTypes(),
        slot: { table: { disable: true } },
        type: { table: { disable: true } },
        fetchOptions: { table: { disable: true } },
        typeOptions: { table: { disable: true } },
        fieldHandler: { table: { disable: true } },
    },
    args: {
        name: 'Base Information',
        options: mock.rawTable.options,
        data: mock.rawTable.data,
        loading: false,
        totalCount: 0,
        timezone: 'UTC',
        selectIndex: [],
        selectable: false,
        multiSelect: true,
        invalid: false,
        colCopy: false,
        excelVisible: false,
        settingsVisible: false,
        sortBy: undefined,
        sortDesc: undefined,
        pageStart: undefined,
        pageLimit: undefined,
        searchText: '',
    },
};

export default meta;
type Story = StoryObj<typeof PDynamicLayout>;

const Template: Story = {
    render: (args, { argTypes }) => ({
        props: Object.keys(argTypes),
        components: { PDynamicLayout },
        i18n: I18nConnector.i18n,
        template: `
            <p-dynamic-layout :name="name" type="raw-table"
                                :options="options"
                                :data="data"
                                :type-options="{
                                    loading,
                                    totalCount,
                                    timezone,
                                    selectIndex,
                                    selectable,
                                    multiSelect,
                                    invalid,
                                    colCopy,
                                    excelVisible,
                                    settingsVisible
                                }"
                                :fetch-options="{
                                    sortBy,
                                    sortDesc,
                                    pageStart,
                                    pageLimit,
                                    searchText
                                }"
                                class="w-full"
                                @fetch="onFetch"
                                @select="onSelect"
                                @export="onExport"
                                @click-settings="onClickSettings"
                >
            </p-dynamic-layout>
        `,
    }),
};

export const DisableSearch: Story = {
    render: () => ({
        components: { PDynamicLayout },
        template: `
            <p-dynamic-layout
                  name="Disable Search Raw Table"
                  type="raw-table"
                  :options="options"
                  :data="data"
                   class="w-full"
            ></p-dynamic-layout>
        `,
        setup() {
            return {
                data: mock.rawTable.data,
                options: {
                    disable_search: true,
                },
            };
        },
    }),
};

export const Headers: Story = {
    render: () => ({
        components: { PDynamicLayout },
        template: `
            <p-dynamic-layout
                  name="Disable Search Raw Table"
                  type="raw-table"
                  :options="options"
                  :data="data"
                   class="w-full"
            ></p-dynamic-layout>
        `,
        setup() {
            return {
                data: mock.rawTable.data,
                options: {
                    headers: ['information', 'age', 'name', 'job'],
                },
            };
        },
    }),
};

export const Playground: Story = {
    ...Template,
};
