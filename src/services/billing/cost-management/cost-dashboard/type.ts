import { Tags, TimeStamp } from '@/models';
import { Period } from '@/services/billing/cost-management/type';

const DASHBOARD_SCOPE = {
    PRIVATE: 'PRIVATE',
    PUBLIC: 'PUBLIC',
} as const;

export type DASHBOARD_SCOPE = typeof DASHBOARD_SCOPE[keyof typeof DASHBOARD_SCOPE];

interface DefaultFilter {
    projects?: string[];
    project_groups?: string[];
    service_accounts?: string[];
    provider?: string[];
}
export interface DashboardInfo {
    created_at: TimeStamp;
    updated_at: TimeStamp;
    custom_layouts: string[];
    dashboard_id: string;
    default_filter: DefaultFilter;
    default_layout_id: string;
    domain_id?: string;
    name: string;
    scope: DASHBOARD_SCOPE;
    tags: Tags;
    user_id: string;
    period_type: string;
    period?: Period;
}

export interface DashboardItem extends DashboardInfo {
    label: string;
    routeName: string;
}

export interface WidgetInfo {
    name?: string;
    options?: object;
    type?: string;
    widget_id: string;
}

export interface DefaultLayout {
    name: string;
    widgetList: any;
}

export type CustomLayout = WidgetInfo[];

const periodTypes = ['AUTO', 'FIXED'] as const;
type PeriodType = typeof periodTypes[number];

export interface DashboardCreateParam {
    name: string;
    default_layout_id?: string;
    custom_layouts?: CustomLayout[];
    default_filter?: DefaultFilter;
    period_type: PeriodType;
    period?: Period;
    tags?: Tags;
    domain_id?: string;
}
