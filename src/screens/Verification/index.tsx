import Animated, { withSequence, withTiming, useAnimatedStyle } from 'react-native-reanimated'
import { BackHandler } from 'react-native';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useAxios } from '../../hooks/useAxios';
import { Toast } from 'react-native-toast-notifications';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Container } from './styles';
import { AuthData } from '../../contexts/AuthContext';
import useSendNotifications from '../../hooks/useSendNotifications';

export default function Verification() {
    const [password, setPassword] = useState("");
    const { setSecurityMode, authData } = useAuth();
    const { api } = useAxios();
    const { sendNotification } = useSendNotifications();

    const handleScheduleNotification = async (data: AuthData) => {
        const subscriptionId = "b6b72993-6391-49b7-bc52-067a8222a49d";

        sendNotification({
            title: data.email + " enviou um SOS",
            message: "Você tem um novo evento agendado!",
            subscriptionsIds: [subscriptionId],
        }).then(() => {
            console.log("Notificação enviada com sucesso!");
        }).catch(error => {
            console.error("Erro ao enviar notificação:", error);
        });
    };

    const handleContinue = async () => {
        setPassword(password.trim())

        if (password == '') {
            Toast.show("Preencha o campo senha", {
                type: "danger",
                duration: 3000,
                placement: "top",
            });
        }
        async function openBank() {
        }

        if (password == authData?.passwordBank) {
            openBank()
        } else if (password == authData?.passwordApp) {

            setSecurityMode(false);

            setPassword("");
        } else if (password == authData?.passwordEmergecy) {
            
            api.post('alert/create')
                .then(() => {
                    console.log('entrou')
                    setSecurityMode(false);
                })

        } else if (password == authData?.passwordDevice) {
            BackHandler.exitApp();
        } else if (password == authData?.passwordDeviceEmergency) {
            handleScheduleNotification(authData);
            api.post('alert/create')
            .then(() => {
                console.log('Alerta criado com sucesso');
                setSecurityMode(false);
            })
            .catch(error => {
                console.error('Erro ao criar alerta:', error);
                Toast.show("Erro ao criar alerta", {
                    type: "danger",
                    duration: 3000,
                    placement: "top",
                });
            });
        
        } else {

            Toast.show("Senha incorreta", {
                type: "danger",
                duration: 3000,
                placement: "top",
            });
        }
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: withSequence(withTiming(0), withTiming(1, { duration: 500 }))
        }
    })

    return (
        <Container>
            <Animated.View
                style={[{
                    flexDirection: 'column',
                    width: '100%'
                },
                    animatedStyle
                ]}
            >
                <Input
                    placeholder="Senha de segurança"
                    showIcon
                    passwordType
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                />
                <Button
                    title='Entrar'
                    onPress={handleContinue}
                />
            </Animated.View>
        </Container>
    );
}
