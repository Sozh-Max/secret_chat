import { AsyncStorageService } from '@/services/AsyncStorageService';
import { LOCAL_STORAGE_KEYS } from '@/services/constants';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export type RoleType = 'assistant' | 'user';

export interface IReplic {
  role: RoleType;
  content: string;
}

export interface IDialogItem {
  replic: IReplic,
  isFWord: number;
  create: string;
  createTime: number;
}

export interface IDialog {
  createTime: number;
  dialog: IDialogItem[];
  id: string;
  lastReplyTime: number;
  name: string;
}

type GlobalContextType = {
  tokens: number;
  dialogs: IDialog[];
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [tokens, setTokens] = useState(0);
  const [dialogs, setDialogs] = useState([]);

  useEffect(() => {
    const getInitData = async () => {
      const userData = await AsyncStorageService.getData(LOCAL_STORAGE_KEYS.USER_DATA);
      
      if (userData) {
        const parsedData = JSON.parse(userData);
        setTokens(parsedData.tokens || 0);
        setDialogs(parsedData.setDialogs || []);
      }
    }

    getInitData();
  }, [])

  return (
    <GlobalContext.Provider value={{ tokens, dialogs }}>
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