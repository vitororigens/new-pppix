import { useState, useEffect } from "react";
import axios from "axios";
import { OneSignal } from 'react-native-onesignal';

interface NotificationData {
  title: string;
  message: string;
  subscriptionsIds: string[];
}

const useSendNotifications = () => {
  const ONE_SIGNAL_APP_ID = "4952e39a-7818-41e7-b4c8-45164fe19b73";
  const ONE_SIGNAL_REST_API_KEY = "os_v2_app_jfjohgtydba6pngiiule7ym3ooqsxp2h4wbe354cggxhmn32r77takn77pn4s7zipnzv5svetsluip7zsv6exvifg7gwvfrdgkggaii";
  const [load, setLoad] = useState(false);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null); 
  const [notificationId, setNotificationId] = useState<string | null>(null);

  const api = axios.create({
    baseURL: "https://api.onesignal.com/",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${ONE_SIGNAL_REST_API_KEY}`,
    },
  });

  useEffect(() => {
    OneSignal.Notifications.requestPermission(true);
    OneSignal.initialize(ONE_SIGNAL_APP_ID);

    OneSignal.User.pushSubscription.getIdAsync().then(id => {
      if (id) {
        console.log("Push Subscription ID:", id);
        setSubscriptionId(id);
      } else {
        console.log("Usuário não está inscrito para notificações push.");
      }
    }).catch(error => {
      console.error("Erro ao obter Push Subscription ID:", error);
    });

    OneSignal.User.getOnesignalId().then(id => {
      console.log("OneSignal ID:", id);
      setPlayerId(id); 
    }).catch(error => {
      console.error("Erro ao obter OneSignal ID:", error);
    });
  }, []);

  const sendNotification = async (data: NotificationData) => {
    const notificationData = {
      app_id: ONE_SIGNAL_APP_ID,
      include_player_ids: data.subscriptionsIds,
      headings: { en: data.title },
      contents: { en: data.message },
    };

    try {
      setLoad(true);
      const response = await api.post("notifications", notificationData);
      console.log("Notificação enviada com sucesso:", response.data);
      setNotificationId(response.data.id);
    } catch (error) {
      console.error("Erro ao enviar notificação:", error);
    } finally {
      setLoad(false);
    }
  };

  return {
    api,
    sendNotification,
    load,
    playerId,
    subscriptionId,
    notificationId
  };
};

export default useSendNotifications;
