import { AGENT_KEYS } from '@/constants/agents-data';
import { Dispatch, SetStateAction } from 'react';
import { Dialogs, IDialog, IDialogItem } from '@/contexts/GlobalContext';
import { ROLES } from '@/api/constants';
import { IMessage } from '@/api/interfaces';
import { Api } from '@/api/api';

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getHoursAndMinutesFromMs = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
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
  lastMsgId,
}: {
  replic: IMessage | null;
  id: AGENT_KEYS;
  setDialogs: Dispatch<SetStateAction<Dialogs>>;
  timestamp: number;
  isBlocked: boolean;
  lastMsgId: number;
}): void => {
  setDialogs((d: Dialogs) => {
    const current = {...d[id]};
    current.lastMsgId = lastMsgId;
    if (isBlocked) {
      current.isBlocked = isBlocked;
    }

    current.dialog = [...(current.dialog || [])];

    if (!isBlocked && replic) {
      current.dialog.push({
        replic,
        createTime: timestamp ?? (Date.now() / 1000),
      })
    }

    return {
      ...d,
      [id]: current,
    }
  });
}

export class MessageService {
  constructor(private api: Api) {}

  async sendMessage({
    id,
    userId,
    message,
    setDialogs,
    assistantDialog,
    setLoading,
    setShowTyping,
    setLastMsgGlobalId,
  }: {
    id: AGENT_KEYS;
    userId: string;
    message: string;
    setDialogs: Dispatch<SetStateAction<Dialogs>>;
    assistantDialog: IDialogItem[];
    setLoading: (state: boolean) => void;
    setShowTyping: (state: boolean) => void;
    setLastMsgGlobalId: Dispatch<SetStateAction<number>>;
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
      timestamp: Date.now() / 1000,
      isBlocked: false,
      lastMsgId: 0,
    });

    const timeout = getRandomInt(500, 1500);

    const startTime = Date.now();

    setTimeout(async () => {
      setShowTyping(true);
      this.api.sendMessages({
        userId,
        assistantId: id,
        messages: [
          ...assistantDialog?.map((dialog) => dialog.replic),
          replic,
        ]
      }).then(async (data) => {
        if (data.ok) {
          // @ts-ignore
          const response = await data.json();
          const responseData = response.data;

          const replic = responseData.choices[0].message;

          const match = replic?.content?.match(/{{2,3}(photo|video)_(\d+)}{2,3}/);

          if (match?.[0]) {
            replic.content = match[0];
          }

          const intervalId = setInterval(() => {
            if (startTime + 600 < Date.now()) {
              clearInterval(intervalId);
              setShowTyping(false);

              if (responseData) {
                setLastMsgGlobalId(responseData.lastMsgGlobalId)
                setData({
                  replic: replic ?? null,
                  id,
                  setDialogs,
                  timestamp: responseData.created,
                  isBlocked: responseData.isBlocked,
                  lastMsgId: responseData.lastMsgId,
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
    setDialogs,
    lastMsgId,
  }:  {
    id: AGENT_KEYS;
    setDialogs: Dispatch<SetStateAction<Dialogs>>;
    lastMsgId: number;
  }): void {
    setDialogs((d: Dialogs) => {
      const current = {...d[id]};
      current.dialog = [];
      current.lastMsgId = lastMsgId;
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
    return this.api.sendComplaint({ dialog, id });
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
