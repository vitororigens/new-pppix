/**
 * Componente Notifications com melhorias aplicadas:
 * 1. Validação de dados para date e hour.
 * 2. Filtro por tipo de notificação baseado em `select`.
 * 3. Estado de carregamento (loading) adicionado.
 * 4. Funcionalidade de pesquisa.
 */

import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Input } from "../../components/Input";
import { ItemNotification } from "../../components/ItemNotification";
import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";
import { Container, Content, ContentImage, Text } from "./styles";
import { Toast } from "react-native-toast-notifications";
import { PickerSelect } from "../../components/PickerSelect";
import { FlatList, ActivityIndicator, Image } from "react-native";

interface AlertData {
    id: string;
    name: string;
    email: string;
    status: number;
    car: {
        brand: string;
        licensePlate: string;
        color: string;
        model: string;
    };
    date: string;
    lat: string;
    log: string;
    finished_lat: string;
    finished_log: string;
}

export function Notifications() {
    const { api } = useAxios();
    const { authData } = useAuth();

    const [alerts, setAlerts] = useState<AlertData[]>([]);
    console.log(alerts);

    const [select, setSelect] = useState("alert");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);

    function handleFinishSos(alert_id: string) {
        api.post("alert/finish", { alert_id }).then(() => {
            Toast.show("Alerta encerrado com sucesso!!", {
                placement: "top",
                duration: 3000,
                type: "success",
            });
            updateAlerts();
        });
    }

    function handleFinishAll() {
        const payload = {
            tipo: select === "myAlert" ? "enviado" : "recebido",
        };
    
        api.post("alert/finish/all", payload).then((response) => {
            Toast.show("Alertas encerrados com sucesso!!", {
                placement: "top",
                duration: 3000,
                type: "success",
            });
            updateAlerts();
        }).catch((error) => {
            console.error("Erro ao encerrar alertas:", error);
        });
    }

    function updateAlerts() {
        setLoading(true);
        api.get("alert").then((response) => {
            setAlerts(response.data.alerts);
        }).finally(() => setLoading(false));
    }

    function handleSelectChange(value: string) {
        setSelect(value);
    }

    useEffect(() => {
        updateAlerts();
        const intervalId = setInterval(() => {
            updateAlerts();
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    const filteredAlerts = alerts
    .filter((alert) => {
        if (select === "myAlert") {
            return alert.email === authData?.email;
        } else if (select === "alert") {
            return alert.email !== authData?.email
        }
        return true;
    })
    .filter((alert) =>
        alert.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <DefaultContainer title="Notificações" showMenu showButtonBack>
            <Container>
                <PickerSelect
                    items={[
                        { label: "Alertas enviados", value: "myAlert" },
                        { label: "Alertas recebidos", value: "alert" },
                    ]}
                    onValueChange={handleSelectChange}
                    selectedValue={select}
                    type="PRIMARY"
                />
                <Input
                    placeholder="Pesquisar"
                    showSearch
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <Content>
                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <FlatList
                            data={filteredAlerts}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <ItemNotification
                                    date={item.date ? new Date(item.date).toLocaleDateString("pt-BR") : "01/01/2000"}
                                    name={item.name}
                                    onPress={() => handleFinishSos(item.id)}
                                    status={item.status}
                                />
                            )}
                            contentContainerStyle={{ paddingBottom: 20 }}
                            ListEmptyComponent={
                            <ContentImage>
                                <Image source={require("../../assets/emergencia.png")} width={300} height={300} />
                                <Text>Você não possui nenhum alerta!</Text>
                            </ContentImage>
                            }
                        />
                    )}
                </Content>
                <Button title="Limpar todos" onPress={handleFinishAll} />
            </Container>
        </DefaultContainer>
    );
}
