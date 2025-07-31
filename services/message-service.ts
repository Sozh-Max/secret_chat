import { AGENT_KEYS } from '@/constants/agents-data';
import { Dispatch, SetStateAction } from 'react';
import { Dialogs, IDialogItem } from '@/contexts/GlobalContext';
import { api } from '@/api/api';
import { ROLES } from '@/api/constants';
import { IMessage } from '@/api/interfaces';

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
}: {
  replic: IMessage;
  id: AGENT_KEYS;
  setDialogs: Dispatch<SetStateAction<Dialogs>>;
  timestamp: number;
}): void => {
  setDialogs((d: Dialogs) => {
    const current = {...d[id]};
    current.dialog = [
      ...(current.dialog || []),
      {
        replic,
        isFWord: 0,
        create: getHoursAndMinutesFromMs(timestamp ?? Date.now()),
        createTime: timestamp ?? Date.now(),
      }
    ];
    return {
      ...d,
      [id]: current,
    }
  });
}

class MessageService {
  async sendMessage({
    id,
    message,
    setDialogs,
    assistantDialog,
    setLoading,
  }: {
    id: AGENT_KEYS;
    message: string;
    setDialogs: Dispatch<SetStateAction<Dialogs>>;
    assistantDialog: IDialogItem[];
    setLoading: (state: boolean) => void;
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
    });
    await api.sendMessages({
      assistantId: id,
      messages: [
        ...assistantDialog?.map((dialog) => dialog.replic),
        replic,
      ]
    }).then(async (data) => {
      if (data.ok) {
        const response = await data.json();

        if (response) {
          setData({
            replic: response.choices[0].message,
            id,
            setDialogs,
            timestamp: response.created * 1000,
          });
        }
      }
    }).finally(() => setLoading(false));
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
}

export const messageService = new MessageService();