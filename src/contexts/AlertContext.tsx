import React, { createContext, useEffect, useState, useContext, useRef } from "react";
import { AxiosContext } from "./AxiosContext";
import { Center, Modal} from 'native-base'
import { AxiosResponse } from "axios";
import SoundPlayer from 'react-native-sound-player'
import { useNavigation } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import { Linking} from 'react-native'

import { AlertSos } from "../components/AlertSos";

interface AlertInterface {
}

interface LocationProviderInterface {
    children: React.ReactNode
}

export const AlertContext = createContext<AlertInterface>(
    {} as AlertInterface
);

function alertProvider({ children }: LocationProviderInterface) {
    const [alertData, setAlertData] = useState({
        email: '',
        lat: '',
        log: '',
        id:'',
        car: {
            brand: '',
            licensePlate: '',
            color: '',
            model:'',
        }
    });
    const [showModal, setShowModal] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [active, setActive] = useState(true);
    const Axios = useContext(AxiosContext)
    const navigation = useNavigation();
    const viewRef = useRef();
    const mapViewRef = useRef();

    function handleSendPushToken(token: any) {
        Axios.api.post('alert/update/token', { fcmToken: token })
    }

    function handleSosPolice() {
        Axios.api.post('alert/stop', { alert_id: alertData.id })
            .then(() => {
                setShowModal(false)
                setActive(true)
                Linking.openURL('tel:190')
                SoundPlayer.stop()
            })
    }

    function handleFinishSos() {
        Axios.api.post('alert/stop', { alert_id: alertData.id })
            .then(() => {
                SoundPlayer.stop()
                setShowModal(false)
                setActive(true)
            })
    }

    useEffect(() => {
        function updateNotification() {
            Axios.api.get('alert/wait')
                .then((response: AxiosResponse) => {
                    if (response.data.alerts.length > 0) {
                        if (active) {
                            SoundPlayer.playSoundFile('alerta', 'mp3')
                        }
                        setActive(false)
                        setAlertData(response.data.alerts[0])
                        setShowModal(true)
                        if (response.data.alerts[0].lat != '' && response.data.alerts[0].log != '') {
                            setShowMap(true)
                        } else {
                            setShowMap(false)
                        }
                        viewRef.current?.animateMarkerToCoordinate({
                            latitude: Number(response.data.alerts[0].lat),
                            longitude: Number(response.data.alerts[0].log),
                        }, 0)
                        mapViewRef.current?.animateCamera(
                            {
                                center: {
                                    latitude: Number(response.data.alerts[0].lat),
                                    longitude: Number(response.data.alerts[0].log),
                                    latitudeDelta: 0.006,
                                    longitudeDelta: 0.006,
                                },
                            },
                            {
                                duration: 0,
                            }
                        )

                    }
                })
        }

        if (Axios.load) {
            console.log('alerta procurando');
            messaging().requestPermission().then(() => {
                messaging().getToken().then(handleSendPushToken)
            })

            updateNotification();
            const intervalId = setInterval(updateNotification, 10000);

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [Axios.load])

    return (
        <AlertContext.Provider
            value={{
            }}
        >
            <Center>
                <Modal isOpen={showModal} onClose={() => setShowModal(false)} style={{ backgroundColor: 'red' }}>
                    <AlertSos
                        email={alertData.email}
                        lat={alertData.lat}
                        log={alertData.log}
                        buttonEncerra={handleFinishSos}  
                        buttonFecha={() => setShowModal(false)}  
                        buttonSOSPolicia={handleSosPolice}  
                        car={alertData.car}
                        
                    />
                </Modal>
            </Center>
            {children}
        </AlertContext.Provider>
    )
}

export default alertProvider;