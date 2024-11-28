import React, { createContext, useEffect, useState, useContext  } from "react";
import Geolocation from '@react-native-community/geolocation';
import BackgroundTimer from 'react-native-background-timer';
import { AxiosContext } from "./AxiosContext";
import { AuthContext } from "./AuthContext";

interface LocationInterface {
}

interface LocationProviderInterface {
    children: React.ReactNode
}

export const LocationContext = createContext<LocationInterface>(
    {} as LocationInterface
);

function locationProvider({ children }: LocationProviderInterface) {
    const [location, setLocation] = useState(null);
    const [lastUpdate, setLastUpdate] = useState(0)
    const Axios = useContext(AxiosContext) 
    const Auth = useContext(AuthContext) 

    useEffect(() => {
        var backgroundtime = null
        if (Axios.load) {
            function setTimeOut() {
                backgroundtime = BackgroundTimer.setTimeout(async () => {    
                    Geolocation.getCurrentPosition((info) => {
                        Axios.api.post('position/update', {
                            'log': info.coords.longitude,
                            'lat': info.coords.latitude
                        })
                        .then(() => {
                            console.log('new time')
                            setTimeOut()
                        })
                        .catch(() => {
                            setTimeOut(); 
                            console.log('axios error') 
                        })
                    } , () => { setTimeOut(); });
                }, 4000);
            }
            setTimeOut()
        }
        
        return () => {
            BackgroundTimer.clearTimeout(backgroundtime)
        }
        
    }, [Axios.load])
    return (
        <LocationContext.Provider
          value={{
          }}
        >
          {children}
        </LocationContext.Provider>
      )
}

export default locationProvider;