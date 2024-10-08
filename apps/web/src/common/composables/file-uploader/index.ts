import { computed } from 'vue';

import type { ResourceGroupType } from '@/schema/_common/type';

import { useAppContextStore } from '@/store/app-context/app-context-store';
import { useUserWorkspaceStore } from '@/store/app-context/workspace/user-workspace-store';
import { useDomainStore } from '@/store/domain/domain-store';

import { uploadFileAndGetFileInfo } from '@/lib/file-manager';


export const useFileUploader = () => {
    const appContextStore = useAppContextStore();
    const appContextGetters = appContextStore.getters;
    const userWorkspaceStore = useUserWorkspaceStore();
    const workspaceGetters = userWorkspaceStore.getters;
    const domainStore = useDomainStore();
    const resourceGroup = computed<Extract<ResourceGroupType, 'DOMAIN'|'WORKSPACE'>>(() => {
        if (appContextGetters.isAdminMode) return 'DOMAIN';
        return 'WORKSPACE';
    });
    const domainIdOrWorkspaceId = computed<string>(() => {
        if (appContextGetters.isAdminMode) return domainStore.state.domainId;
        return workspaceGetters.currentWorkspaceId as string;
    });
    return {
        fileUploader(file: File) {
            return uploadFileAndGetFileInfo(file, resourceGroup.value, domainIdOrWorkspaceId.value);
        },
    };
};
