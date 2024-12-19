import { registerRootComponent } from 'expo';
import { Linking } from 'react-native';
import App from './App';
import notifee, { EventType } from '@notifee/react-native';


// Helper to request notification permissions
async function requestPermissions() {
  try {
    const authStatus = await messaging.requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Notification permissions granted:', authStatus);
    } else {
      console.warn('Notification permissions not granted.');
    }
  } catch (error) {
    console.error('Error requesting notification permissions:', error);
  }
}

// Create notification channel
async function createNotificationChannel() {
  try {
    await notifee.createChannel({
      id: 'som',
      name: 'Alerta de Emergência',
      sound: 'alerta',
    });
    console.log('Notification channel created');
  } catch (error) {
    console.error('Error creating notification channel:', error);
  }
}

// Handle background notification events
async function handleBackgroundNotification(remoteMessage) {
  try {
    await notifee.displayNotification({
      title: `Atenção ${remoteMessage.data.email}`,
      body: 'Novo alerta de emergência',
      android: {
        channelId: 'som',
        sound: 'alerta',
        pressAction: {
          launchActivity: 'app.ppix.io.mobile.MainActivity',
          id: 'default',
        },
        actions: [
          {
            title: 'Ligar para polícia',
            pressAction: {
              id: 'call_police',
            },
          },
        ],
      },
    });
  } catch (error) {
    console.error('Error displaying background notification:', error);
  }
}

// Handle background Notifee events
async function handleBackgroundNotifeeEvent({ type, detail }) {
  const { notification, pressAction } = detail;
  try {
    if (type === EventType.ACTION_PRESS && pressAction.id === 'call_police') {
      notifee.hideNotificationDrawer();
      Linking.openURL('tel:190');
    }
  } catch (error) {
    console.error('Error handling Notifee event:', error);
  }
}

// Register background message handlers
function registerBackgroundHandlers() {
  messaging.setBackgroundMessageHandler(handleBackgroundNotification);
  notifee.onBackgroundEvent(handleBackgroundNotifeeEvent);
}

// Main setup function
async function setupNotifications() {
  await requestPermissions();
  await createNotificationChannel();
  registerBackgroundHandlers();
}

// Initialize notifications
setupNotifications();

// Register the root component
registerRootComponent(App);
