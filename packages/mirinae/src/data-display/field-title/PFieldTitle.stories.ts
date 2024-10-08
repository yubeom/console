import type { Meta, StoryObj } from '@storybook/vue';
import type { ComponentProps } from 'vue-component-type-helpers';

import { getLabelArgTypes, getLabelParameters, getLabelArgs } from '@/data-display/field-title/story-helper';

import PFieldTitle from './PFieldTitle.vue';

type PFieldTitlePropsAndCustomArgs = ComponentProps<typeof PFieldTitle>;

const meta : Meta<PFieldTitlePropsAndCustomArgs> = {
    title: 'Data Display/Field Title',
    component: PFieldTitle,
    argTypes: {
        ...getLabelArgTypes(),
    },
    parameters: {
        ...getLabelParameters(),
    },
    args: {
        ...getLabelArgs(),
    },
};

export default meta;
type Story = StoryObj<typeof PFieldTitle>;

const Template: Story = {
    render: (args, { argTypes }) => ({
        props: Object.keys(argTypes),
        components: { PFieldTitle },
        template: `
        <div class="h-full w-full overflow p-8">
            <p-field-title
                :label="label"
                :description="description"
                :size="size"
                :font-weight="fontWeight"
                :color="color"
                :inline="inline"
            >
                <template v-if="defaultSlot"><span v-html="defaultSlot"/></template>
            </p-field-title>
        </div>
        `,
    }),
};

export const Basic: Story = {
    render: () => ({
        components: { PFieldTitle },
        template: `
            <div class="h-full w-full overflow p-8">
                <p-field-title>Field Title</p-field-title>
            </div>
        `,
    }),
};

export const WithDescription: Story = {
    render: () => ({
        components: { PFieldTitle },
        template: `
            <div class="h-full w-full overflow p-8">
                <p-field-title description="This is description for field title.🤓">Field Title</p-field-title>
            </div>
        `,
    }),
};

export const Size: Story = {
    render: () => ({
        components: { PFieldTitle },
        template: `
            <div class="h-full w-full overflow p-8">
                <p-field-title size="sm">Field Title</p-field-title>
                <p-field-title>Field Title</p-field-title>
                <p-field-title size="lg">Field Title</p-field-title>
            </div>
        `,
    }),
};

export const FontWeight: Story = {
    render: () => ({
        components: { PFieldTitle },
        template: `
            <div class="h-full w-full overflow p-8">
                <p-field-title font-weight="regular">Field Title</p-field-title>
                <p-field-title>Field Title</p-field-title>
            </div>
        `,
    }),
};

export const Color: Story = {
    render: () => ({
        components: { PFieldTitle },
        template: `
            <div class="h-full w-full overflow p-8">
                <p-field-title>Field Title</p-field-title>
                <p-field-title color="gray">Field Title</p-field-title>
                <p-field-title font-weight="regular">Field Title</p-field-title>
                <p-field-title font-weight="regular" color="gray">Field Title</p-field-title>
            </div>
        `,
    }),
};

export const Inline: Story = {
    render: () => ({
        components: { PFieldTitle },
        template: `
            <div class="h-full w-full overflow p-8">
                <p-field-title>This is block. (default)</p-field-title>
                <span>This is contents.</span>
                <br/><br/>
                <p-field-title inline>This is inline.</p-field-title>
                <span>This is contents.</span>
            </div>
        `,
    }),
};

export const LeftSlot: Story = {
    render: () => ({
        components: { PFieldTitle },
        template: `
            <div class="h-full w-full overflow p-8">
                <p-field-title description="This is description for field title.🤓">
                    Field Title
                    <template #left>
                        <span class="flex items-center justify-center w-4 h-4 bg-gray-500 text-sm" >L</span>
                    </template>
                </p-field-title>
            </div>
        `,
    }),
};

export const RightSlot: Story = {
    render: () => ({
        components: { PFieldTitle },
        template: `
            <div class="h-full w-full overflow p-8">
                <p-field-title description="This is description for field title.🤓">
                    Field Title
                    <template #right>
                        <span class="flex items-center justify-center w-4 h-4 bg-gray-500 text-sm" >R</span>
                    </template>
                </p-field-title>
            </div>
        `,
    }),
};

export const BottomSlot: Story = {
    render: () => ({
        components: { PFieldTitle },
        template: `
            <div class="h-full overflow p-8">
                <p-field-title class="w-40">
                    Field Title
                    <template #bottom>
                        <button class="flex items-center justify-center w-20 bg-gray-500 text-sm" >
                            button
                        </button>
                    </template>
                </p-field-title>
            </div>
        `,
    }),
};

export const Playground: Story = {
    ...Template,
};
