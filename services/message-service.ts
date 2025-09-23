import { AGENT_KEYS } from '@/constants/agents-data';
import { Dispatch, SetStateAction } from 'react';
import { Dialogs, IDialog, IDialogItem } from '@/contexts/GlobalContext';
import { api } from '@/api/api';
import { ROLES } from '@/api/constants';
import { IMessage } from '@/api/interfaces';

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getHoursAndMinutesFromMs = (timestamp: number) => {
  const date = new Date(timestamp);

  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
}

const setData = ({
  replic,
  id,
  setDialogs,
  timestamp,
  isBlocked,
}: {
  replic: IMessage;
  id: AGENT_KEYS;
  setDialogs: Dispatch<SetStateAction<Dialogs>>;
  timestamp: number;
  isBlocked: boolean;
}): void => {
  setDialogs((d: Dialogs) => {
    const current = {...d[id]};
    if (isBlocked) {
      current.isBlocked = isBlocked;
    }

    current.dialog = [...(current.dialog || [])];

    if (!isBlocked) {
      current.dialog.push({
        replic,
        isFWord: 0,
        create: getHoursAndMinutesFromMs(timestamp ?? Date.now()),
        createTime: timestamp ?? Date.now(),
      })
    }

    return {
      ...d,
      [id]: current,
    }
  });
}

class MessageService {
  async sendMessage({
    id,
    userId,
    message,
    setDialogs,
    assistantDialog,
    setLoading,
    setShowTyping,
  }: {
    id: AGENT_KEYS;
    userId: string;
    message: string;
    setDialogs: Dispatch<SetStateAction<Dialogs>>;
    assistantDialog: IDialogItem[];
    setLoading: (state: boolean) => void;
    setShowTyping: (state: boolean) => void;
  }): Promise<void> {
    const replic: IMessage = {
      content: message,
      role: ROLES.USER,
    };
    setLoading(true);
    setData({
      replic,
      id,
      setDialogs,
      timestamp: Date.now(),
      isBlocked: false,
    });

    const timeout = getRandomInt(500, 1500);

    const startTime = Date.now();

    setTimeout(() => {
      setShowTyping(true);
      api.sendMessages({
        userId,
        assistantId: id,
        messages: [
          ...assistantDialog?.map((dialog) => dialog.replic),
          replic,
        ]
      }).then(async (data) => {
        if (data.ok) {
          const response = await data.json();
          const replic = response.choices[0].message;

          const match = replic.content.match(/{{2,3}(photo|video)_(\d+)}{2,3}/);

          if (match?.[0]) {
            replic.content = match[0];
          }

          const intervalId = setInterval(() => {
            if (startTime + 600 < Date.now()) {
              clearInterval(intervalId);
              setShowTyping(false);

              if (response) {
                setData({
                  replic,
                  id,
                  setDialogs,
                  timestamp: response.created * 1000,
                  isBlocked: replic.content.includes('*blacklist*'),
                });
              }
            }
          }, 100);
        }
      }).finally(() => {
        setLoading(false);

        setTimeout(() => {
          setShowTyping(false);
        }, 600)
      });
    }, timeout);
  }

  removeHistoryById({
    id,
    setDialogs
  }:  {
    id: AGENT_KEYS;
    setDialogs: Dispatch<SetStateAction<Dialogs>>;
  }): void {
    setDialogs((d: Dialogs) => {
      const current = {...d[id]};
      current.dialog = [];
      return {
        ...d,
        [id]: current,
      }
    });
  }

  sendComplaint({
    dialog,
    id,
  }:  {
    dialog: IDialog;
    id: string;
  }) {
    return api.sendComplaint({ dialog, id });
  }

  complaintUserById({
    id,
    setDialogs,
  }: {
    setDialogs: Dispatch<SetStateAction<Dialogs>>,
    id: AGENT_KEYS,
  }) {
    setDialogs((d: Dialogs) => {
      const current = {...d[id]};
      current.isComplaint = true;

      return {
        ...d,
        [id]: current,
      }
    });
  }
}

export const messageService = new MessageService();