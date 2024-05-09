import {
    useGetAvailablePluginsQuery,
    useGetInstalledPluginsQuery
} from '@/redux/features/api/agentPlugins/agentPluginEndpoints';
import { filterOutInstalledPlugins } from '@/app/(protected)/plugins/_lib/filters/InstalledPluginFilter';
import { useMemo } from 'react';

function useInstallablePlugins() {
    const { data: availablePlugins, isLoading: isLoadingAvailablePlugins } =
        useGetAvailablePluginsQuery();
    const { data: installedPlugins, isLoading: isLoadingInstalledPlugins } =
        useGetInstalledPluginsQuery();

    const installablePlugins = useMemo(() => {
        if (isLoadingAvailablePlugins || isLoadingInstalledPlugins) {
            return;
        }
        return filterOutInstalledPlugins(availablePlugins, installedPlugins);
    }, [availablePlugins, installedPlugins]);

    return installablePlugins;
}

export default useInstallablePlugins;
