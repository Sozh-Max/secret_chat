import { AsyncStorageService } from '@/services/async-storage-service';
import { LOCAL_STORAGE_KEYS } from '@/services/constants';
import { AGENT_KEYS } from '@/constants/agents-data';
import { IDialogItem } from '@/contexts/GlobalContext';
import { ROLES } from '@/api/constants';

export interface IMessageTemplate {
  id: number;
  done: boolean;
  title: string;
  body: string;
  agent: AGENT_KEYS;
  active: boolean;
  seconds: number;
}

const MESSAGE_TEMPLATES: IMessageTemplate[] = [
  {
    id: 1,
    done: false,
    title: 'Message from Elise',
    body: 'Bored out of my mind here 😩 Save me? 🥂',
    agent: AGENT_KEYS.elise,
    active: true,
    seconds: 3,
  },
  {
    id: 2,
    done: false,
    title: 'Message from Lola',
    body: 'Just took a super cute selfie 📸 Want to see? 😇',
    agent: AGENT_KEYS.lola,
    active: false,
    seconds: 60 * 60 * 24,
  },
  {
    id: 3,
    done: false,
    title: 'Message from Jane',
    body: 'Are you always this quiet? 👻 It’s making me curious...',
    agent: AGENT_KEYS.jane,
    active: false,
    seconds: 60 * 60 * 24 * 3,
  },
];

export const checkIsDigit = (str: string): boolean => {
  return /^\d+$/.test(str);
}

export const getNotificationsByUserId = async (userId: string): Promise<IMessageTemplate[]> => {
  try {
    const notificationsString = await AsyncStorageService.getData(LOCAL_STORAGE_KEYS.NOTIFICATIONS);
    const notifications = JSON.parse(notificationsString || '{}');
    const NEW_MESSAGE_TEMPLATES = [...MESSAGE_TEMPLATES];

    if (!notifications) {
      const newNotifications = {
        [userId]: NEW_MESSAGE_TEMPLATES,
      }
      await AsyncStorageService.storeData(LOCAL_STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(newNotifications));

      return NEW_MESSAGE_TEMPLATES;
    }
    // @ts-ignore
    const userNotifications = notifications[userId];

    if (userNotifications) {
      return userNotifications as IMessageTemplate[];
    }

    // @ts-ignore
    notifications[userId] = NEW_MESSAGE_TEMPLATES;

    await AsyncStorageService.storeData(LOCAL_STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));

    return NEW_MESSAGE_TEMPLATES;
  } catch (e) {
    console.log(`Error in getNotificationsByUserId: ${e}`);
    return MESSAGE_TEMPLATES;
  }
}

export const setNotificationsByUserId = async (
  userId: string,
  data: IMessageTemplate[],
): Promise<void> => {
  try {
    const notificationsString = await AsyncStorageService.getData(LOCAL_STORAGE_KEYS.NOTIFICATIONS);
    const notifications = JSON.parse(notificationsString || '{}');
    if (notifications) {
      // @ts-ignore
      notifications[userId] = data;
      await AsyncStorageService.storeData(LOCAL_STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    } else {
      const newNotifications = {
        [userId]: data,
      }
      await AsyncStorageService.storeData(LOCAL_STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(newNotifications));
    }
  } catch (e) {
    console.log(`Error in setNotificationsByUserId: ${e}`);
  }
}

export const checkTypingMessage = (message: IDialogItem) =>
  message.replic.role === ROLES.TYPING;

