import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Notification from "../components/Notification";
import EStyleSheet from "react-native-extended-stylesheet";
import IconFont from "react-native-vector-icons/Feather";
import NofityCars from "./NotifyCars";

interface AlertData {
    email: string;
    car?: {
        brand: string;
        licensePlate: string;
        color: string;
        model: string;
    };
    lat?: string;
    log?: string;
    finished_lat?: string;
    finished_log?: string;
    buttonSOSPolicia?: () => void;
    buttonEncerra?: () => void;
    buttonFecha?: () => void;
}

export function AlertSos({
    email,
    car,
    lat,
    log,
    buttonEncerra,
    buttonFecha,
    buttonSOSPolicia,
}: AlertData) {
    const [showMap, setShowMap] = useState(false);
    const viewRef = useRef<typeof Marker>(null);
    const mapViewRef = useRef<MapView>(null);

    return (
        <View style={styles.notifyContent}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                marginRight: 20
            }}>
                <Notification icon="" name={email.substring(0, 5) + '....'} />
                <TouchableOpacity onPress={buttonFecha}>
                    <IconFont name={"x"} size={25} color={"black"} />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    paddingHorizontal: 25,
                    marginTop: 10,
                }}
            >
                <Text
                    style={{
                        fontSize: 18,
                    }}
                >
                    Dados:
                </Text>
            </View>

            {car && (
                <NofityCars icon="car" name={car.brand} subTitle={car.licensePlate} marca={car.model} cor={car.color} />
            )}

            <View
                style={{
                    paddingHorizontal: 25,
                    flexDirection: "column",
                }}
            >
                <Text
                    style={{
                        fontSize: 18,
                        marginTop: 10,
                    }}
                >
                    Localização:
                </Text>

                <View style={{ marginTop: 3, height: 350, width: '100%' }}>
                    {(showMap) ? (
                        <Text>Carregando....</Text>
                    ) : (
                        <MapView.Animated
                            provider={PROVIDER_GOOGLE}
                            style={{ flex: 1 }}
                            ref={mapViewRef}
                            initialRegion={{
                                latitude: Number(lat),
                                longitude: Number(log),
                                latitudeDelta: 0.006,
                                longitudeDelta: 0.006,
                            }}
                        >
                            <Marker.Animated
                                ref={viewRef}
                                coordinate={{ latitude: Number(lat), longitude: Number(log) }}
                            />
                        </MapView.Animated>
                    )}
                </View>
            </View>

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <TouchableOpacity onPress={buttonSOSPolicia}>
                    <View style={styles.notifyButton}>
                        <Text
                            style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                        >
                            SOS Policia
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={buttonEncerra}>
                    <View style={styles.notifyButton}>
                        <Text
                            style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                        >
                            Encerrar alerta
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#5372ef",
    },
    iconContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: "2rem",
        marginTop: "1.5rem",
        marginRight: "1rem",
    },
    notifyBox: {
        alignItems: "center",
    },
    notifyContent: {
        flex: 1,
        paddingTop: 60,
        width: "100%",
        backgroundColor: "#fff",
        paddingVertical: "1.4rem",
        fontSize: "1rem",

    },
    notifyButton: {
        backgroundColor: "#aa271b",
        width: "8rem",
        height: "2rem",
        borderRadius: "1rem",
        alignItems: "center",
        justifyContent: "center",
        marginRight: "1rem",
        marginTop: "1rem",
    }
})