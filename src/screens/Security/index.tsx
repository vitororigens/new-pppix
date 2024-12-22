import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { SecurityCard } from '../../components/SecurityCard';
import { getInstalledApps, InstalledApp } from '../../native/AppList';
import { DefaultContainer } from '../../components/DefaultContainer';
import { Container } from './styles';

export function Security() {
    const [apps, setApps] = useState<InstalledApp[]>([]);

    useEffect(() => {
        const fetchApps = async () => {
            const installedApps = await getInstalledApps();
            setApps(installedApps);
        };

        fetchApps();
    }, []);

    return (
         <DefaultContainer showMenu showButtonGears title="Aplicativos">
          <Container>
          <FlatList
                data={apps}
                keyExtractor={(item) => item.packageName}
                renderItem={({ item }) => (
                    <SecurityCard 
                        icon={item.icon} 
                        title={item.name} 
                        subTitle={`${item.size.toFixed(2)} MB`} 
                    />
                )}
            />
          </Container>
        </DefaultContainer>
    );
}
