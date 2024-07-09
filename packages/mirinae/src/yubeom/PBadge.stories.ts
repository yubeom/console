import type { Meta, StoryObj } from '@storybook/vue';
import type { ComponentProps } from 'vue-component-type-helpers';


import { getBadgesArgTypes } from '@/data-display/badge/story-helper';
import { SOLID_STYLE_TYPE, SOLID_OUTLINE_STYLE_TYPE, SUBTLE_STYLE_TYPE } from '@/data-display/badge/type';

import PBadge from './PBadge.vue';

type PBadgePropsAndCustomArgs = ComponentProps<typeof PBadge>;

const meta : Meta<PBadgePropsAndCustomArgs> = {
    title: 'Data Display/Badge',
    component: PBadge,
    argTypes: getBadgesArgTypes(),
    // render: (args) => ({
    //     components: { PBadge },
    //     setup() {
    //         return { args };
    //     },
    //     template: `
    //         <div style="display:flex; align-items:center; justify-content:center; height:100px;">
    //             <p-badge
    //                 :badge-type="badgeType"
    //                 :style-type="styleType"
    //                 :text-color="textColor"
    //                 :background-color="backgroundColor"
    //                 :outline-color="outlineColor"
    //                 :shape="shape"
    //                 :font-weight="fontWeight"
    //             >{{$props.defaultSlot}}</p-badge>
    //         </div>`
    // })
};

export default meta;
type Story = StoryObj<typeof PBadge>;

export const BadgeTypes: Story = {
    render: (args) => ({
        components: { PBadge },
        setup() {
            return {
                args,
                solidStyleTypes: Object.values(SOLID_STYLE_TYPE),
                solidOutlineStyleTypes: Object.values(SOLID_OUTLINE_STYLE_TYPE),
                subtleStyleTypes: Object.values(SUBTLE_STYLE_TYPE),
            };
        },
        template: `
            <div class="w-full h-full">
                <p style="font-weight: bold">Solid</p>
                <p-badge
                    v-for="styleType in solidStyleTypes"
                    :badge-type="'solid'"
                    :style-type="styleType"
                    :key="styleType"
                    class="m-2"
                >
                    {{ styleType }}
                </p-badge>
                <br/><br/>
                <p style="font-weight: bold">Solid-Outline</p>
                <p-badge
                    v-for="styleType in solidOutlineStyleTypes"
                    :badge-type="'solid-outline'"
                    :style-type="styleType"
                    :key="styleType"
                    class="m-2"
                >
                    {{ styleType }}
                </p-badge>
                <br/><br/>
                <p style="font-weight: bold">Subtle</p>
                <p-badge
                    v-for="styleType in subtleStyleTypes"
                    :badge-type="'subtle'"
                    :style-type="styleType"
                    :key="styleType"
                    class="m-2"
                >
                    {{ styleType }}
                </p-badge>
            </div>`,
    }),
};

// import {Meta, Canvas, Story, ArgsTable} from '@storybook/addon-docs/blocks';
// import PBadge from "@/data-display/badge/PBadge";

// import type { ComponentProps } from "vue-compo"
// import { component } from 'vue/types/umd';
// import { template } from 'lodash';

// <Meta title='Data Display/Badge' parameters={{
//     design: {
//         type: 'figma',
//         url: 'https://www.figma.com/file/wq4wSowBcADBuUrMEZLz6i/SpaceONE-Console-Design?node-id=6132%3A124077',
//     }
// }} argTypes={getBadgesArgTypes()}/>

// export const Template = (args,{argTypes})=>({
//     props: Object.keys(argTypes),
//     components: { PBadge },
//     template: `
//         <div style="display:flex; align-items:center; justify-content:center; height:100px;">
//             <p-badge
//                 :badge-type="badgeType"
//                 :style-type="styleType"
//                 :text-color="textColor"
//                 :background-color="backgroundColor"
//                 :outline-color="outlineColor"
//                 :shape="shape"
//                 :font-weight="fontWeight"
//             >{{$props.defaultSlot}}</p-badge>
//         </div>`,
// })

// # Badge

// <br/>
// <br/>
// <br/>

// ## Badge Types

// <Canvas>
//     <Story name='Badge Types'>
//         {{
//             components:{ PBadge },
//             template: `
//                 <div class="w-full h-full">
//                     <p style="font-weight: bold">Solid</p>
//                     <p-badge v-for="styleType in solidStyleTypes" badge-type="solid" :style-type="styleType" :key="Math.random().toString()" class="m-2">
//                         {{styleType}}
//                     </p-badge><br/><br/>
//                     <p style="font-weight: bold">Solid-Outline</p>
//                     <p-badge v-for="styleType in solidOutlineStyleTypes" badge-type="solid-outline" :style-type="styleType" :key="styleType" class="m-2">
//                         {{styleType}}
//                     </p-badge><br/><br/>
//                     <p style="font-weight: bold">Subtle</p>
//                     <p-badge v-for="styleType in subtleStyleTypes" badge-type="subtle" :style-type="styleType" :key="Math.random().toString()" class="m-2">
//                         {{styleType}}
//                     </p-badge>
//                 </div>`,
//             setup() {
//                 return {
//                     solidStyleTypes: Object.values(SOLID_STYLE_TYPE),
//                     solidOutlineStyleTypes: Object.values(SOLID_OUTLINE_STYLE_TYPE),
//                     subtleStyleTypes: Object.values(SUBTLE_STYLE_TYPE),
//                 }
//             }
//         }}
//     </Story>
// </Canvas>

// <br/>
// <br/>

// ## Shapes

// <Canvas>
//     <Story name="Shapes" height="100px">
//         {{
//             components: {PBadge},
//             template: `
//                 <div style="display: flex; align-items: center; justify-content: center; height: 100px">
//                     <p-badge shape="round">
//                         <div>round</div>
//                     </p-badge>
//                     <p-badge shape="square" style="margin-left: 20px">
//                         <div>square</div>
//                     </p-badge>
//                 </div>`
//         }}
//     </Story>
// </Canvas>

// ## Font Weight

// <Canvas>
//     <Story name="Font Weight" height="100px">
//         {{
//             components: {PBadge},
//             template: `
//                 <div style="display: flex; align-items: center; justify-content: center; height: 100px">
//                     <p-badge shape="round">
//                         <div>Regular</div>
//                     </p-badge>
//                     <p-badge shape="round" style="margin-left: 20px" font-weight="medium">
//                         <div>Medium</div>
//                     </p-badge>
//                 </div>`
//         }}
//     </Story>
// </Canvas>

// ## Playground

// <Canvas>
//     <Story name="Playground" height="100px">
//         {Template.bind({})}
//     </Story>
// </Canvas>

// <ArgsTable story="Playground" />
