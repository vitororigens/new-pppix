import { NativeModules } from 'react-native';

// Tipagem do aplicativo instalado
export type InstalledApp = {
    packageName: string;
    name: string;
    icon: string;
    size: number; // Em megabytes
};

// Tipagem do NativeModule
type AppListModuleType = {
    getInstalledApps: () => Promise<InstalledApp[]>; // Atualizando para o tipo InstalledApp
};

const { AppList } = NativeModules as { AppList: AppListModuleType };
console.log('AppList:', AppList);

/**
 * Função para obter a lista de aplicativos instalados.
 * @returns Lista de aplicativos instalados no dispositivo.
 */
export const getInstalledApps = async (): Promise<InstalledApp[]> => {
    try {
        const apps = await AppList.getInstalledApps();
        console.log('Aplicativos instalados:', apps);
        return apps;
    } catch (error) {
        console.error('Erro ao obter aplicativos instalados:', error);
        return [];
    }
};
