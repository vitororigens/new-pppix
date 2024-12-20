import { registerRootComponent } from 'expo';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import { Linking } from 'react-native';

// Função para criar canal de notificação
async function createChannel() {
    try {
        await notifee.createChannel({
            id: 'som',
            name: 'Som de Alerta',
            sound: 'alerta',
            importance: notifee.AndroidImportance.HIGH,
        });
        console.log('Canal de notificação criado com sucesso');
    } catch (error) {
        console.error('Erro ao criar o canal de notificação:', error);
    }
}

// Handler para eventos em segundo plano
notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { pressAction } = detail;
    if (type === EventType.ACTION_PRESS && pressAction.id === 'snooze') {
        try {
            notifee.hideNotificationDrawer();
            Linking.openURL('tel:190'); // Liga para a polícia
            console.log('Ação de botão de notificação executada');
        } catch (error) {
            console.error('Erro ao processar evento em segundo plano:', error);
        }
    }
});

// Handler para mensagens de segundo plano
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    try {
        console.log('Mensagem recebida no background:', remoteMessage);
        if (remoteMessage?.data) {
            await notifee.displayNotification({
                title: `Atenção ${remoteMessage.data.name}`,
                body: 'Novo alerta de emergência',
                android: {
                    channelId: 'som',
                    sound: 'alerta',
                    pressAction: {
                        id: 'default',
                    },
                    actions: [
                        {
                            title: 'Ligar para polícia',
                            pressAction: { id: 'snooze' },
                        },
                    ],
                },
            });
        }
    } catch (error) {
        console.error('Erro ao exibir notificação no background:', error);
    }
});

// Inicializa as configurações e registra o app
(async () => {
    try {
        await createChannel();

        // Solicita permissões de notificação, se necessário
        const authStatus = await messaging().hasPermission();
        if (authStatus === messaging.AuthorizationStatus.NOT_DETERMINED) {
            await messaging().requestPermission();
            console.log('Permissões de notificação solicitadas');
        }

        const token = await messaging().getToken();
        console.log('Token de dispositivo FCM:', token);

    } catch (error) {
        console.error('Erro durante a inicialização:', error);
    }
})();

registerRootComponent(App);
