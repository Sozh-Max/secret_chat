import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { AppState, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { useUser } from '@/src/contexts/UserContext';
import { getNotifications, IMessageTemplate } from '@/src/utils/global';
import { ROLES } from '@/src/api/constants';
import { IDialogs } from '@/src/contexts/GlobalContext';
import { useApi } from '@/src/contexts/ApiContext';

const CHANEL_NAME = 'motivational_channel';

const getDelayToNotificationWindow = (secondsOffset: number): number => {
  const now = new Date();

  const targetDate = new Date(now.getTime() + secondsOffset * 1000);

  const hours = targetDate.getHours();

  let notificationDate = new Date(targetDate);

  // Если время уже в окне 10:00 – 19:59:59 → оставляем как есть
  if (hours >= 10 && hours < 20) {
    return secondsOffset;
  }

  // Если до 10:00 → переносим на сегодня 10:00
  if (hours < 10) {
    notificationDate.setHours(10, 0, 0, 0);
  }
  // Если 20:00 и позже → переносим на завтра 10:00
  else {
    // Переходим на следующий день
    notificationDate.setDate(notificationDate.getDate() + 1);
    notificationDate.setHours(10, 0, 0, 0);
  }

  // Разница в миллисекундах
  const delayMs = notificationDate.getTime() - now.getTime();

  // Защита от отрицательного значения (на всякий случай)
  return Math.max(0, delayMs / 1000);
};

// 1. Настройка поведения уведомлений, когда приложение открыто
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});


export const useInactivityNotification = ({
  setDialogs,
  dialogs,
  setLastMsgGlobalId,
}: {
  setDialogs: Dispatch<SetStateAction<IDialogs>>;
  dialogs: IDialogs;
  setLastMsgGlobalId: Dispatch<SetStateAction<number>>;
}) => {
  const appState = useRef(AppState.currentState);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const { userId } = useUser();
  const { messageService } = useApi();

  const currentMessageRef = useRef<IMessageTemplate | null>(null);
  const currentMessageTimeRef = useRef<number>(0);

  const setNewBotMessage = async () => {
    const messageData = currentMessageRef.current;
    if (!messageData) return;
    currentMessageRef.current = null;

    const dialog = dialogs[messageData.agent];
    await messageService.sendMessage({
      id: messageData.agent,
      userId: userId,
      message: messageData.body,
      setDialogs,
      assistantDialog: dialog?.dialog || [],
      setLoading: () => {},
      setLastMsgGlobalId,
      role: ROLES.APP,
    });

    // setDialogs((dialogs) => {
    //   const currentDialog = dialogs[messageData.agent];
    //   if (currentDialog) {
    //     currentDialog.isNotification = true;
    //     currentDialog.dialog.push({
    //       createTime: Date.now() / 1000,
    //       replic: {
    //         role: ROLES.ASSISTANT,
    //         content: messageData.body,
    //       }
    //     });
    //
    //     return {
    //       ...dialogs,
    //     }
    //   }
    //
    //   return dialogs;
    // });
  }

  // Функция запроса прав (Критично для Android 13+)
  const registerForPushNotificationsAsync = async () => {
    if (Platform.OS === 'android') {
      // Создаем канал с МАКСИМАЛЬНОЙ важностью для пробива
      await Notifications.setNotificationChannelAsync(CHANEL_NAME, {
        name: 'Мотивация и Напоминания',
        importance: Notifications.AndroidImportance.MAX, // Важно: MAX вызывает heads-up уведомление
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
        lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC, // Показывает на заблокированном экране
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      setPermissionGranted(finalStatus === 'granted');
      return finalStatus === 'granted';
    }
    return false;
  };

  const scheduleNotification = async () => {
    if (!permissionGranted || !userId) return;

    try {
      await Notifications.cancelAllScheduledNotificationsAsync();

      const notifications = await getNotifications(dialogs);
      const message = notifications.find((m) => !m.done && !m.active);
      if (!message?.title && !message?.body) return;

      currentMessageRef.current = message;


      const secondsDelay = getDelayToNotificationWindow(message.seconds);
      // const secondsDelay = message.seconds;
      currentMessageTimeRef.current = Date.now() + secondsDelay * 1000;

      const identifier = await Notifications.scheduleNotificationAsync({
        content: {
          title: message.title,
          body: message.body,
          sound: true,
        } as Notifications.NotificationContentInput,
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: secondsDelay,
          repeats: false,
          channelId: CHANEL_NAME,
        } as Notifications.SchedulableNotificationTriggerInput,
      });

      console.log('Запланировано уведомление id=', identifier, 'через (сек):', secondsDelay);

      const scheduled = await Notifications.getAllScheduledNotificationsAsync();
      // console.log('Запланированные уведомления (после schedule):', scheduled);
    } catch (e) {
      console.log('Ошибка при scheduleNotification:', e);
    }
  };

  // Функция отмены (когда юзер вернулся)
  const cancelNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.setBadgeCountAsync(0); // Сбрасываем бейдж на иконке
    // console.log("Плановые уведомления отменены - юзер онлайн");
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      registerForPushNotificationsAsync();

      const responseListener = Notifications.addNotificationResponseReceivedListener(() => {
        // console.log('Пользователь взаимодействовал с уведомлением!', {
        //   notificationId: response.notification.request.identifier,
        //   actionId: response.actionIdentifier,
        //   userText: response.userText,
        //   date: new Date(response.notification.date).toISOString(),
        // });
        if (currentMessageTimeRef.current < Date.now()) {
          setNewBotMessage();
          currentMessageTimeRef.current = 0;
        }
      });

      // // 2. Этот слушатель иногда срабатывает (но не всегда)
      // const receivedListener = Notifications.addNotificationReceivedListener(notification => {
      //   // console.log('Уведомление ОТОБРАЖЕНО (received):', {
      //   //   title: notification.request.content.title,
      //   //   body: notification.request.content.body,
      //   //   identifier: notification.request.identifier,
      //   //   date: new Date(notification.date).toISOString(),
      //   // });
      //   setNewBotMessage();
      // });

      const subscription = AppState.addEventListener('change', async (nextAppState) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          // Приложение вышло на передний план (Active)
          await cancelNotifications();
        } else if (nextAppState === 'background') {
          // Приложение свернуто (Background)
          await scheduleNotification();
        }

        appState.current = nextAppState;
      });

      // Также запускаем отмену при первом маунте (на случай если открыли с холодного старта)
      cancelNotifications();

      if (!userId) {
        cancelNotifications();
      }
      return () => {
        subscription.remove();
        // receivedListener.remove();
        responseListener.remove();
      };
    }
  }, [permissionGranted, userId]);
};