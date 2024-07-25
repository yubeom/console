// Menu Ids' Rule: All menu ids are dot-delimited in depth, up to two depths.
import type { HighlightTagType } from '@/store/modules/display/type';

export const MENU_ID = Object.freeze({
    WORKSPACE_HOME: 'workspace-home',
    DASHBOARDS: 'dashboards',
    PROJECT: 'project',
    ASSET_INVENTORY: 'asset_inventory',
    CLOUD_SERVICE: 'cloud_service',
    SERVER: 'server',
    SECURITY: 'security',
    COLLECTOR: 'collector',
    SERVICE_ACCOUNT: 'service_account',
    COST_EXPLORER: 'cost_explorer',
    COST_ANALYSIS: 'cost_analysis',
    ANOMALY_DETECTION: 'anomaly_detection',
    // ANOMALY_DETECTION_CONFIGURATION: 'anomaly_detection_configuration',
    // ANOMALY_DETECTION_POLICY: 'anomaly_detection_policy',
    // ANOMALY_DETECTION_HISTORY: 'anomaly_detection_history',
    BUDGET: 'budget',
    COST_REPORT: 'cost_report',
    DATA_SOURCES: 'data_sources',
    ALERT_MANAGER: 'alert_manager',
    ALERT: 'alert',
    ESCALATION_POLICY: 'escalation_policy',
    IAM: 'iam',
    USER: 'user',
    ROLE: 'role',
    APP: 'app',
    PREFERENCE: 'preference',
    DOMAIN_SETTINGS: 'domain_settings',
    DOMAIN_INFORMATION: 'domain_information',
    APPEARANCE: 'appearance',
    AUTO_DORMANCY_CONFIGURATION: 'auto_dormancy_configuration',
    ANOMALY_DETECTION_DOMAIN_CONFIGURATION: 'anomaly_detection_domain_configuration',
    WORKSPACES: 'workspaces',
    BOOKMARK: 'bookmark',
    MY_PAGE: 'my_page',
    ACCOUNT_PROFILE: 'account_profile',
    NOTIFICATIONS: 'notifications',
    INFO: 'info',
    NOTICE: 'notice',
    METRIC_EXPLORER: 'metric_explorer',
} as const);

export type MenuId = typeof MENU_ID[keyof typeof MENU_ID];

export interface Menu {
    id: MenuId;
    needPermissionByRole?: boolean;
    subMenuList?: Menu[];
    hideOnGNB?: boolean;
    hideOnSiteMap?: boolean;
}

export interface MenuInfo {
    menuId: MenuId;
    routeName: string;
    translationId: string;
    icon?: string;
    highlightTag?: HighlightTagType;
}
