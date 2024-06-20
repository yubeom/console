// Configurations
import type { KeyItemSet } from '@spaceone/design-system/types/inputs/search/query-search/type';

import { makeDistinctValueHandler } from '@cloudforet/core-lib/component-util/query-search';

export const DETECTION_CONFIGURATION_HANDLERS = {
    keyItemSets: [
        {
            title: 'Properties',
            items: [
                { name: 'name', label: 'Name' },
                { name: 'policy', label: 'Policy' },
                { name: 'data_source', label: 'Data Source' },
                { name: 'recipients', label: 'Recipients' },
                { name: 'is_use', label: 'Use' },
                {
                    name: 'lasted_at',
                    label: 'Last Detected',
                    dataType: 'datetime',
                },
            ],
        }] as KeyItemSet[],
    // TODO: temp code
    valueHandlerMap: {
        name: makeDistinctValueHandler('cost_analysis.AnomalyDetectionConfiguration', 'name', 'string', [{ k: 'name', v: '', o: 'not' }]),
        policy: makeDistinctValueHandler('cost_analysis.AnomalyDetectionConfiguration', 'policy'),
        data_source: makeDistinctValueHandler('cost_analysis.AnomalyDetectionConfiguration', 'data_source'),
        recipients: makeDistinctValueHandler('cost_analysis.AnomalyDetectionConfiguration', 'recipients'),
        is_use: makeDistinctValueHandler('cost_analysis.AnomalyDetectionConfiguration', 'is_use', 'boolean'),
        lasted_at: makeDistinctValueHandler('cost_analysis.AnomalyDetectionConfiguration', 'lasted_at', 'datetime'),
    },
};
export const CONFIGURATION_CATEGORY_MENU = [
    {
        name: 'project_group',
        label: 'Project Group',
    },
    {
        name: 'project',
        label: 'Project',
    },
    {
        name: 'provider',
        label: 'Provider',
    },
    {
        name: 'service_account',
        label: 'Service Account',
    },
    {
        name: 'product',
        label: 'Product',
    },
    {
        name: 'region',
        label: 'Region',
    },
    {
        name: 'tags',
        label: 'Tags',
    },
];
export const MANAGED_POLICY_MENU = [
    {
        label: '급격한 변화 탐지',
        rules: [
            '15% 이상 증가 Warning', '30% 이상 증가 Critical', '15% 이상 감소 Warning', '30% 이상 감소 Critical',
        ],
        id: 'rule1',
    },
    {
        label: '허용한 필드 외 비용 발생 탐지',
        rules: [
            '30% 이상 증가 Critical',
        ],
        id: 'rule2',
    },
    {
        label: '제외된 필드의 비용 발생 탐지',
        rules: [],
        id: 'rule3',
    },
];

// History
export const DETECTION_HISTORY_HANDLERS = {
    keyItemSets: [
        {
            title: 'Properties',
            items: [
                { name: 'name', label: 'Name' },
                { name: 'config_id', label: 'Detection Configuration' },
                { name: 'policy', label: 'Policy' },
                { name: 'data_source', label: 'Data Source' },
                { name: 'level', label: 'Notice Level' },
                {
                    name: 'detected_at',
                    label: 'Detected',
                    dataType: 'datetime',
                },
            ],
        }] as KeyItemSet[],
    // TODO: temp code
    valueHandlerMap: {
        name: makeDistinctValueHandler('cost_analysis.AnomalyDetectionConfiguration', 'name', 'string', [{ k: 'name', v: '', o: 'not' }]),
        config_id: makeDistinctValueHandler('cost_analysis.AnomalyDetectionConfiguration', 'config_id'),
        policy: makeDistinctValueHandler('cost_analysis.AnomalyDetectionConfiguration', 'policy'),
        data_source: makeDistinctValueHandler('cost_analysis.AnomalyDetectionConfiguration', 'data_source'),
        level: makeDistinctValueHandler('cost_analysis.AnomalyDetectionConfiguration', 'level'),
        detected_at: makeDistinctValueHandler('cost_analysis.AnomalyDetectionConfiguration', 'detected_at', 'datetime'),
    },
};
export const ANOMALY_DETECTION_MENU = {
    ALL: 'ALL',
    THIS_MONTH: 'THIS_MONTH',
    LAST_MONTH: 'LAST_MONTH',
    CUSTOM: 'CUSTOM',
    LAST_MONTHS: 'LAST_MONTHS',
} as const;

export const ANOMALY_DETECTION_MENU_ITEM_MAP = {
    [ANOMALY_DETECTION_MENU.ALL]: {
        name: ANOMALY_DETECTION_MENU.ALL,
    },
    [ANOMALY_DETECTION_MENU.THIS_MONTH]: {
        name: ANOMALY_DETECTION_MENU.THIS_MONTH,
        include_today: true,
    },
    [ANOMALY_DETECTION_MENU.LAST_MONTH]: {
        name: ANOMALY_DETECTION_MENU.LAST_MONTH,
        include_today: false,
    },
} as const;

// TEMP DATA
export const CONFIG_TEMP_DATA = [
    {
        config_id: 'id1',
        name: '나영의 detection config1나영의 detection config1',
        policy: '급격한 변화 탐지',
        data_source: 'aws',
        recipients: [
            '나는 롤네임이야123123123', '나도 롤네임이야', '나돈데?',
        ],
        is_use: true,
        lasted_at: '2021-09-01 12:00:00',
    },
    {
        config_id: 'id2',
        name: '나영의 detection config2',
        policy: '급격한 변화 탐지',
        data_source: 'google_cloud',
        recipients: [
            '나는 롤네임이야',
        ],
        is_use: false,
        lasted_at: '2021-09-01 12:00:00',
    },
    {
        config_id: 'id3',
        name: '나영의 detection config3',
        policy: '급격한 변화 탐지',
        data_source: 'aws',
        recipients: [
            '나는 롤네임이야', '나도 롤네임이야',
        ],
        is_use: true,
        lasted_at: '--',
    },
];

export const HISTORY_TEMP_DATA = [
    {
        history_id: 'id1',
        name: '[Product] AmazonGrafana에서 비용 발생함AmazonGrafana에서 비용 발생함AmazonGrafana에서 비용 발생함',
        config_id: 'Configuration 14Configuration 14Configuration 14',
        policy: '급격한 변화 탐지',
        data_source: 'aws',
        level: 'critical',
        detected_at: '2021-09-01 12:00:00',
    },
    {
        history_id: 'id2',
        name: '[Product] AmazonGrafana에서 비용 발생함',
        config_id: 'Configuration 14',
        policy: '급격한 변화 탐지',
        data_source: 'google_cloud',
        level: 'info',
        detected_at: '2021-09-01 12:00:00',
    },
    {
        history_id: 'id3',
        name: '[Product] AmazonGrafana에서 비용 발생함',
        config_id: 'Configuration 14',
        policy: '급격한 변화 탐지',
        data_source: 'google_cloud',
        level: 'warning',
        detected_at: '2021-09-01 12:00:00',
    },
];