import React, { createContext, useEffect, useState, useContext, useRef } from "react";
import { AxiosContext } from "./AxiosContext";
import { AxiosResponse } from "axios";
import { Audio } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import messaging from "@react-native-firebase/messaging";
import { Linking } from "react-native";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { AlerModal } from "../components/AlertModal";

interface AlertInterface {}

interface LocationProviderInterface {
    children: React.ReactNode;
}

export const AlertContext = createContext<AlertInterface>({} as AlertInterface);

function AlertProvider({ children }: LocationProviderInterface) {
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
    const [showModal, setShowModal] = useState(true);
    const [showMap, setShowMap] = useState(false);
    const [active, setActive] = useState(true);
    const Axios = useContext(AxiosContext);
    const navigation = useNavigation();
    const viewRef = useRef();
    const mapViewRef = useRef();

    async function loadAudio() {
        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                staysActiveInBackground: true,
                playsInSilentModeIOS: true,
                shouldDuckAndroid: true,
            });

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

    async function handleSosPolice() {
        try {
            await Axios.api.post("alert/stop", { alert_id: alertData.id });
            setShowModal(false);
            setActive(true);
            Linking.openURL("tel:190");
            if (sound) await sound.stopAsync(); // Para o áudio
        } catch (error) {
            console.error("Erro ao finalizar SOS Polícia:", error);
        }
    }

    async function handleFinishSos() {
        try {
            await Axios.api.post("alert/stop", { alert_id: alertData.id });
            if (sound) await sound.stopAsync(); // Para o áudio
            setShowModal(false);
            setActive(true);
        } catch (error) {
            console.error("Erro ao finalizar SOS:", error);
        }
    }

    useEffect(() => {
        loadAudio();

        async function updateNotification() {
            try {
                const response: AxiosResponse = await Axios.api.get("alert/wait");
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

                    // Atualiza o mapa se houver coordenadas
                    if (viewRef.current && mapViewRef.current) {
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
                }
            } catch (error) {
                console.error("Erro ao atualizar notificações:", error);
            }
        }

        if (Axios.load) {
            console.log("alerta procurando");
            messaging()
                .requestPermission()
                .then(() => messaging().getToken())
                .then(handleSendPushToken);

            // Primeira atualização imediata
            updateNotification();

            // Atualização periódica
            const intervalId = setInterval(updateNotification, 10000);

            return () => {
                clearInterval(intervalId);
                if (sound) sound.unloadAsync(); // Libera recursos de áudio
            };
        }
    }, [Axios.load, active]);

    return (
        <AlertContext.Provider
            value={{
                // Adicione valores para compartilhar, se necessário
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

export default AlertProvider;
