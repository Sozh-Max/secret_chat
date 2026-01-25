import { AGENT_KEYS } from '@/src/constants/agents-data';
import { IDialogs, IDialogItem, IDialog } from '@/src/contexts/GlobalContext';
import { ROLES } from '@/src/api/constants';

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

export const getNotifications = async (dialogs: IDialogs): Promise<IMessageTemplate[]> => {
  try {
    const NEW_MESSAGE_TEMPLATES: IMessageTemplate[] = [];

    for (const message of MESSAGE_TEMPLATES) {
      const dialog = dialogs[message.agent] as IDialog;

      if (dialog && !dialog.isNotificationSend) {
        NEW_MESSAGE_TEMPLATES.push(message);
      }
    }

    return NEW_MESSAGE_TEMPLATES;
  } catch (e) {
    console.log(`Error in getNotificationsByUserId: ${e}`);
    return MESSAGE_TEMPLATES;
  }
}

export const checkTypingMessage = (message: IDialogItem) =>
  message.replic.role === ROLES.TYPING;

export const formatNumberWithCommas = (n: string | number): string => {
  const num = typeof n === "string" ? Number(n) : n;
  if (!Number.isFinite(num)) return String(n);

  return num.toLocaleString("en-US");
}

