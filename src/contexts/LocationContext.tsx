import React, { createContext, useEffect, useState, useContext } from "react";
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import { AxiosContext } from "./AxiosContext";

interface LocationInterface {
  location: Location.LocationObject | null;
  lastUpdate: number;
}

interface LocationProviderInterface {
  children: React.ReactNode;
}

const LOCATION_TASK_NAME = 'location-task';

export const LocationContext = createContext<LocationInterface>(
  {} as LocationInterface
);

function LocationProvider({ children }: LocationProviderInterface) {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [lastUpdate, setLastUpdate] = useState(0);
  const Axios = useContext(AxiosContext);

  useEffect(() => {
    // Verifique se o Axios está carregado
    if (!Axios.load) return;

    // Definindo a tarefa que será executada em segundo plano
    TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }: { data: { locations: Location.LocationObject[] }, error: any }) => {
      if (error) {
        console.log('Erro na atualização da localização em segundo plano:', error);
        return;
      }

      const { locations } = data;

      if (locations && locations.length > 0) {
        const latestLocation = locations[0];
        setLocation(latestLocation);
        console.log('Localização atual:', latestLocation);
        console.log('Última atualização:', lastUpdate);

        // Enviar a localização para o servidor
        try {
          await Axios.api.post('position/update', {
            log: latestLocation.coords.longitude,
            lat: latestLocation.coords.latitude,
          });
          console.log('Localização enviada com sucesso');
          setLastUpdate(Date.now());
        } catch (error) {
          console.log('Erro ao enviar localização:', error);
        }
      } else {
        console.log('Nenhuma localização recebida');
      }
    });

    // Função para iniciar a coleta de localização
    const startLocationUpdates = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permissão para acessar a localização foi negada');
        return;
      }

      const backgroundStatus = await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus.status !== 'granted') {
        console.log('Permissão para acessar a localização em segundo plano foi negada');
        return;
      }

      // Iniciar as atualizações de localização em segundo plano
      try {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.High,
          timeInterval: 60000, // Intervalo de 1 minuto
          distanceInterval: 100, // Atualiza a localização a cada 100 metros
        });
        console.log('Atualizações de localização iniciadas');
      } catch (err) {
        console.log('Erro ao iniciar as atualizações de localização:', err);
      }
    };

    // Verifica se o Axios está carregado e inicia a coleta de localização
    startLocationUpdates();

    // Cleanup - Para garantir que a tarefa de segundo plano seja parada quando o componente for desmontado
    return () => {
      Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
      console.log('Tarefa de localização parada');
    };
  }, [Axios.load]);

  return (
    <LocationContext.Provider value={{ location, lastUpdate }}>
      {children}
    </LocationContext.Provider>
  );
}

export default LocationProvider;
