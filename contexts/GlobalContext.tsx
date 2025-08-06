import { AGENT_KEYS, AGENTS_DATA, INIT_AGENT_LIST } from '@/constants/agents-data';
import { AsyncStorageService } from '@/services/AsyncStorageService';
import { LOCAL_STORAGE_KEYS } from '@/services/constants';
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { IMessage } from '@/api/interfaces';

export interface IDialogItem {
  replic: IMessage;
  isFWord: number;
  create: string;
  createTime: number;
}

export interface IDialog {
  createTime: number;
  dialog: IDialogItem[];
  id: AGENT_KEYS;
  lastReplyTime: number;
  name: string;
  cost: number;
}

export type Dialogs = { [key in AGENT_KEYS]?: IDialog }

type GlobalContextType = {
  tokens: number;
  dialogs: Dialogs;
  dialogPreview: IDialogPreview[];
  setDialogs: Dispatch<SetStateAction<Dialogs>>;
  setTokens: Dispatch<SetStateAction<number>>;
}

export interface IDialogPreview {
  id: AGENT_KEYS;
  description: string;
  message: string;
  lastMessageTime: number | null;
  cost: number;
}

const refreshChats = ({
  dialogs,
  setDialogPreview,
}: {
  dialogs: Dialogs;
  setDialogPreview: Dispatch<SetStateAction<IDialogPreview[]>>;
}) => {
  setDialogPreview(INIT_AGENT_LIST.map((key: AGENT_KEYS) => {
    const dialog: IDialog = dialogs[key] as IDialog;

    const lastMessage: IDialogItem | undefined = dialog?.dialog?.[dialog.dialog.length - 1];

    return {
      id: key,
      description: AGENTS_DATA[key],
      message: lastMessage?.replic?.content || '',
      lastMessageTime: lastMessage?.createTime ?? null,
      cost: dialog.cost,
    };
  }).sort((a, b) => b.lastMessageTime - a.lastMessageTime));
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [tokens, setTokens] = useState<number>(0);
  const [dialogs, setDialogs] = useState<Dialogs>({});
  const [dialogPreview, setDialogPreview] = useState<IDialogPreview[]>([]);

  useEffect(() => {
    const getInitData = async () => {
      const userData = await AsyncStorageService.getData(LOCAL_STORAGE_KEYS.USER_DATA);
      const userDialogs = await AsyncStorageService.getData(LOCAL_STORAGE_KEYS.DIALOGS);

      if (userData) {
        const parsedData = JSON.parse(userData);
        setTokens(parsedData.tokens || 0);
      }

      const dialogs = JSON.parse(userDialogs || '') || {};

      setDialogs(dialogs);

      refreshChats({
        dialogs,
        setDialogPreview,
      });
    };
    // AsyncStorageService.storeData(LOCAL_STORAGE_KEYS.IS_INIT, '');
    getInitData();
  }, []);

  useEffect(() => {
    if (dialogs[AGENT_KEYS.wendy] && dialogs[AGENT_KEYS.ashley]) {
      AsyncStorageService.storeData(LOCAL_STORAGE_KEYS.DIALOGS, JSON.stringify(dialogs));

      refreshChats({
        dialogs,
        setDialogPreview,
      });
    }
  }, [dialogs, setDialogPreview]);

  useEffect(() => {
    AsyncStorageService.storeDataBySubKey(LOCAL_STORAGE_KEYS.USER_DATA, LOCAL_STORAGE_KEYS.TOKENS, tokens);
  }, [tokens]);

  return (
    <GlobalContext.Provider value={{ tokens, dialogs, setDialogs, dialogPreview, setTokens }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
};