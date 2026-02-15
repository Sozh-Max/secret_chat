import { AGENT_KEYS } from '@/src/constants/agents-data';
import { Dispatch, SetStateAction } from 'react';
import { IDialogs, IDialog, IDialogItem } from '@/src/contexts/GlobalContext';
import { ROLES } from '@/src/api/constants';
import { IMessage } from '@/src/api/interfaces';
import { Api } from '@/src/api/api';

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
  role,
}: {
  replic: IMessage | null;
  id: AGENT_KEYS;
  setDialogs: Dispatch<SetStateAction<IDialogs>>;
  timestamp: number;
  isBlocked: boolean;
  lastMsgId: number;
  role?: ROLES;
}): void => {
  setDialogs((d: IDialogs) => {
    const current = {...d[id]};
    current.lastMsgId = lastMsgId;
    if (isBlocked) {
      current.isBlocked = isBlocked;
    }

    current.dialog = [...(current.dialog || [])];

    current.isNotification = role === ROLES.APP;

    if (!isBlocked && replic) {
      if (replic?.role === ROLES.ASSISTANT) {
        const typingElement = current.dialog.find(elem => elem.replic.role === ROLES.TYPING);
        if (typingElement) {
          typingElement.replic = replic;
          typingElement.createTime = timestamp ?? (Date.now() / 1000);
        } else {
          current.dialog.push({
            replic,
            createTime: timestamp ?? (Date.now() / 1000),
          });
        }
      } else if (replic?.role === ROLES.USER) {
        current.dialog.push({
          replic,
          createTime: timestamp ?? (Date.now() / 1000),
        });
        current.dialog.push({
          replic: {
            content: '',
            role: ROLES.TYPING,
          },
          createTime: timestamp ?? (Date.now() / 1000),
        });
      } else {
        current.dialog.push({
          replic,
          createTime: timestamp ?? (Date.now() / 1000),
        });
      }
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
    setLastMsgGlobalId,
    role = ROLES.USER,
    imageUrl = null,
  }: {
    id: AGENT_KEYS;
    userId: string;
    message: string;
    setDialogs: Dispatch<SetStateAction<IDialogs>>;
    assistantDialog: IDialogItem[];
    setLoading: (state: boolean) => void;
    setLastMsgGlobalId: Dispatch<SetStateAction<number>>;
    role?: ROLES;
    imageUrl?: string | null;
  }): Promise<void> {
    const replic: IMessage = {
      content: message,
      role: role,
      imageUrl,
    };
    if (role !== ROLES.APP) {
      setLoading(true);
      setData({
        replic,
        id,
        setDialogs,
        timestamp: Date.now() / 1000,
        isBlocked: false,
        lastMsgId: 0,
      });
    }

    const timeout = getRandomInt(500, 1500);

    const startTime = Date.now();

    setTimeout(async () => {
      this.api.sendMessages({
        userId,
        assistantId: id,
        messages: [
          ...assistantDialog?.map((dialog) => dialog.replic),
          replic,
        ],
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
            if (startTime + 3600 < Date.now()) {
              clearInterval(intervalId);

              if (responseData) {
                setLastMsgGlobalId(responseData.lastMsgGlobalId);
                setLoading(false);
                setData({
                  replic: replic ?? null,
                  id,
                  setDialogs,
                  timestamp: responseData.created,
                  isBlocked: responseData.isBlocked,
                  lastMsgId: responseData.lastMsgId,
                  role,
                });
              }
            }
          }, 100);
        }
      }).catch(() => {
        setLoading(false);
      });
    }, timeout);
  }

  removeHistoryById({
    id,
    setDialogs,
    lastMsgId,
  }:  {
    id: AGENT_KEYS;
    setDialogs: Dispatch<SetStateAction<IDialogs>>;
    lastMsgId: number;
  }): void {
    setDialogs((d: IDialogs) => {
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
    setDialogs: Dispatch<SetStateAction<IDialogs>>,
    id: AGENT_KEYS,
  }) {
    setDialogs((d: IDialogs) => {
      const current = {...d[id]};
      current.isComplaint = true;

      return {
        ...d,
        [id]: current,
      }
    });
  }
}
