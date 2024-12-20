import React, { createContext, useEffect, useState, useContext, useRef } from "react";
import { AxiosContext } from "./AxiosContext";
import { AxiosResponse } from "axios";
import { Audio } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import messaging from "@react-native-firebase/messaging";
import { Linking } from "react-native";
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { AlerModal } from "../components/AlertModal";

interface AlertInterface { }

interface LocationProviderInterface {
    children: React.ReactNode;
}

export const AlertContext = createContext<AlertInterface>({} as AlertInterface);

function alertProvider({ children }: LocationProviderInterface) {
    const [alertData, setAlertData] = useState({
        email: "",
        lat: "",
        log: "",
        id: "",
        car: {
            brand: "",
            licensePlate: "",
            color: "",
            model: "",
        },
    });
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [active, setActive] = useState(true);
    const Axios = useContext(AxiosContext);
    const navigation = useNavigation();
    const viewRef = useRef();
    const mapViewRef = useRef();

    async function loadAudio() {
        try {
            const { sound } = await Audio.Sound.createAsync(
                require("../assets/alerta.mp3")
            );
            setSound(sound);
        } catch (error) {
            console.error("Erro ao carregar o áudio:", error);
        }
    }

    async function playAudio() {
        try {
            if (sound) {
                await sound.playAsync();
            }
        } catch (error) {
            console.error("Erro ao reproduzir o áudio:", error);
        }
    }

    function handleSendPushToken(token: any) {
        Axios.api.post("alert/update/token", { fcmToken: token });
    }

    function handleSosPolice() {
        Axios.api.post("alert/stop", { alert_id: alertData.id }).then(() => {
            setShowModal(false);
            setActive(true);
            Linking.openURL("tel:190");
            playAudio();
        });
    }

    function handleFinishSos() {
        Axios.api.post("alert/stop", { alert_id: alertData.id }).then(() => {
            playAudio();
            setShowModal(false);
            setActive(true);
        });
    }

    useEffect(() => {
        loadAudio();

        function updateNotification() {
            Axios.api.get("alert/wait").then((response: AxiosResponse) => {
                if (response.data.alerts.length > 0) {
                    if (active) {
                        playAudio();
                    }
                    setActive(false);
                    setAlertData(response.data.alerts[0]);
                    setShowModal(true);
                    if (
                        response.data.alerts[0].lat !== "" &&
                        response.data.alerts[0].log !== ""
                    ) {
                        setShowMap(true);
                    } else {
                        setShowMap(false);
                    }
                    viewRef.current?.animateMarkerToCoordinate(
                        {
                            latitude: Number(response.data.alerts[0].lat),
                            longitude: Number(response.data.alerts[0].log),
                        },
                        0
                    );
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
                    );
                }
            });
        }

        if (Axios.load) {
            console.log("alerta procurando");
            messaging()
                .requestPermission()
                .then(() => {
                    messaging().getToken().then(handleSendPushToken);
                });

            updateNotification();
            const intervalId = setInterval(updateNotification, 10000);

            return () => {
                clearInterval(intervalId);
                sound?.unloadAsync();
            };
        }
    }, [Axios.load]);

    return (
        <AlertContext.Provider
            value={{
                // Adicione qualquer valor para compartilhar aqui
            }}
        >
            <AlerModal
                name={alertData.email}
                email={alertData.email}
                phone="(61) 9 9996-3955"
                car={alertData.car}
                buttonEncerra={handleFinishSos}
                buttonFecha={() => setShowModal(false)}
                buttonSOSPolicia={handleSosPolice}
                lat={alertData.lat}
                log={alertData.log}
                visible={showModal}
                onClose={() => setShowModal(false)}
            />
            {children}
        </AlertContext.Provider>
    );
}

export default alertProvider;
