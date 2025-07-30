import { AGENT_KEYS, AGENTS_DATA, INIT_AGENT_LIST } from '@/constants/agents-data';
import { AsyncStorageService } from '@/services/AsyncStorageService';
import { LOCAL_STORAGE_KEYS } from '@/services/constants';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export type RoleType = 'assistant' | 'user';

export interface IReplic {
  role: RoleType;
  content: string;
}

export interface IDialogItem {
  replic: IReplic;
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
}

type Dialogs = { [key in AGENT_KEYS]?: IDialog }

type GlobalContextType = {
  tokens: number;
  dialogs: Dialogs;
  dialogPreview: IDialogPreview[];
};

export interface IDialogPreview {
  id: AGENT_KEYS;
  description: string;
}


const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [tokens, setTokens] = useState<number>(0);
  const [dialogs, setDialogs] = useState<Dialogs>({});
  const [dialogPreview, setDialogPreview] = useState<IDialogPreview[]>([]);

  useEffect(() => {
    const getInitData = async () => {
      const userData = await AsyncStorageService.getData(LOCAL_STORAGE_KEYS.USER_DATA);
      
      if (userData) {
        const parsedData = JSON.parse(userData);
        setTokens(parsedData.tokens || 0);
        setDialogs(parsedData.setDialogs || {});
      }

      setDialogPreview(INIT_AGENT_LIST.map((key: AGENT_KEYS) => ({
        id: key,
        description: AGENTS_DATA[key]
      })));
    }

    getInitData();
  }, [])

  return (
    <GlobalContext.Provider value={{ tokens, dialogs, dialogPreview }}>
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