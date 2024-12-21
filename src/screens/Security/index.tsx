import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { SecurityCard } from '../../components/SecurityCard';
import { getInstalledApps, InstalledApp } from '../../native/AppList';

export function Security() {
    const [apps, setApps] = useState<InstalledApp[]>([]); // Tipagem para o estado

    useEffect(() => {
        const fetchApps = async () => {
            const installedApps = await getInstalledApps();
            setApps(installedApps);
        };

        fetchApps();
    }, []);

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <FlatList
                data={apps}
                keyExtractor={(item) => item.packageName}
                renderItem={({ item }) => (
                    <SecurityCard 
                        icon={item.icon} // Use o ícone base64 diretamente
                        title={item.name} 
                        subTitle={`${item.size.toFixed(2)} MB`} // Exibindo o tamanho formatado com 2 casas decimais
                    />
                )}
            />
        </View>
    );
}
