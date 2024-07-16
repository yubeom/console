export const getDefinitionDefaultArgs = () => ({
    name: 'name',
    label: 'label',
    data: 'data',
    disableCopy: false,
    formatter: undefined,
    block: false,
    copyValue: undefined,
    copyValueFormatter: undefined,
    autoKeyWidth: false,
    customKeyWidth: undefined,
    defaultSlot: undefined,
    keySlot: undefined,
    extraSlot: undefined,

});

export const getDefinitionArgTypes = () => ({
    name: {
        name: 'name',
        type: 'string',
        description: 'Name of key.',
        table: {
            type: {
                summary: 'string',
            },
            category: 'props',
            defaultValue: {
                summary: '""',
            },
        },
        control: 'text',
    },
    label: {
        name: 'label',
        type: 'string',
        description: 'Label of key.',
        table: {
            type: {
                summary: 'string',
            },
            category: 'props',
            defaultValue: {
                summary: '""',
            },
        },
        control: 'text',
    },
    data: {
        name: 'data',
        type: 'any',
        description: 'Data for value.',
        table: {
            type: {
                summary: 'any',
            },
            category: 'props',
            defaultValue: {
                summary: '""',
            },
        },
        control: 'text',
    },
    disableCopy: {
        name: 'disableCopy',
        type: 'boolean',
        description: 'Whether to disable copy button or not.',
        table: {
            type: {
                summary: 'boolean',
            },
            category: 'props',
            defaultValue: {
                summary: false,
            },
        },
        control: 'boolean',
    },
    formatter: {
        name: 'formatter',
        type: 'function',
        description: 'A function that receives `data` props and all props as arguments, and returns display data for value.',
        table: {
            type: {
                summary: 'function',
            },
            category: 'props',
            defaultValue: {
                summary: 'undefined',
            },
        },
    },
    block: {
        name: 'block',
        type: 'boolean',
        description: 'Whether to show value with full width or not.',
        table: {
            type: {
                summary: 'boolean',
            },
            category: 'props',
            defaultValue: {
                summary: 'false',
            },
        },
    },
    copyValue: {
        name: 'copyValue',
        type: 'string, number',
        description: 'If the displayed data and the value to be copied are different, give the value to be copied.',
        table: {
            type: {
                summary: 'string, number',
            },
            category: 'props',
            defaultValue: {
                summary: 'undefined',
            },
        },
    },
    copyValueFormatter: {
        name: 'copyValueFormatter',
        type: 'function',
        description: 'Use it with the same purpose of `copyValue` props. Arguments are the same with the `formatter` props.',
        table: {
            type: {
                summary: 'function',
            },
            category: 'props',
            defaultValue: {
                summary: 'undefined',
            },
        },
    },
    autoKeyWidth: {
        name: 'autoKeyWidth',
        type: 'boolean',
        description: 'Make key width auto',
        table: {
            type: {
                summary: 'string',
            },
            category: 'props',
            defaultValue: {
                summary: 'undefined',
            },
        },
    },
    customKeyWidth: {
        name: 'customKeyWidth',
        type: 'string',
        description: 'Custom Width of key',
        table: {
            type: {
                summary: 'string',
            },
            category: 'props',
            defaultValue: {
                summary: 'undefined',
            },
        },
    },
    /* slots */
    defaultSlot: {
        name: 'default',
        description: 'Slot for value.',
        table: {
            type: {
                summary: null,
            },
            defaultValue: {
                summary: null,
            },
            category: 'slots',
        },
    },
    keySlot: {
        name: 'copy',
        description: 'Slot for key.',
        table: {
            type: {
                summary: null,
            },
            defaultValue: {
                summary: null,
            },
            category: 'slots',
        },
    },
    extraSlot: {
        name: 'extra',
        description: 'Slot for right space of value.',
        table: {
            type: {
                summary: null,
            },
            defaultValue: {
                summary: null,
            },
            category: 'slots',
        },
    },
});
