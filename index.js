import { registerRootComponent } from 'expo';
import App from './App';
import notifee, { EventType } from '@notifee/react-native';
import { Linking, useEffect } from 'react-native';
import OneSignal from 'react-native-onesignal'; // Corrigido import

// Inicialização do OneSignal e configuração do handler
useEffect(() => {
  // Inicializa o OneSignal com a App ID
  OneSignal.setAppId("4952e39a-7818-41e7-b4c8-45164fe19b73");

  // Solicita permissão para notificações
  OneSignal.promptForPushNotificationsWithUserResponse();

  // Handler para interceptar notificações em primeiro plano
  OneSignal.setNotificationWillShowInForegroundHandler(async (notificationReceivedEvent) => {
    const notification = notificationReceivedEvent.getNotification();

    // Cancela a exibição padrão da notificação do OneSignal
    notificationReceivedEvent.complete(null);

    // Exibe a notificação com o Notifee
    await notifee.displayNotification({
      title: notification.title,
      body: notification.body,
      android: {
        channelId: 'som', // Certifique-se de que o canal existe
        pressAction: {
          id: 'default',
        },
      },
    });
  });
}, []);

// Função para criar canal de notificação no Notifee
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

// Chama a criação do canal no início
createChannel();

// Handler para eventos em segundo plano do Notifee
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

// Registra o componente principal
registerRootComponent(App);
