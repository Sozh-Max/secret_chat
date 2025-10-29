import { AGENT_KEYS, INIT_AGENT_LIST } from '@/constants/agents-data';
import { AsyncStorageService } from '@/services/async-storage-service';
import { LOCAL_STORAGE_KEYS } from '@/services/constants';
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { IMessage } from '@/api/interfaces';
import { mainUtils } from '@/services/main-utils';
import { useGooglePlayInstallReferrer } from '@/hooks/useGooglePlayInstallReferrer';
import { InitDataService } from '@/services/init-data-service';
import { api } from '@/api/api';
import { useUser } from '@/contexts/UserContext';

export interface IDialogItem {
  replic: IMessage;
  isFWord: number;
  create: string;
  createTime: number;
}

export interface IDialog {
  dialog: IDialogItem[];
  id: AGENT_KEYS;
  cost: number;
  isBlocked: boolean;
  isComplaint?: boolean;
  hasVideo: boolean;
  description: string;
}

export type Dialogs = { [key in AGENT_KEYS]?: IDialog }

type GlobalContextType = {
  tokens: number;
  dialogs: Dialogs;
  dialogPreview: IDialogPreview[];
  setDialogs: Dispatch<SetStateAction<Dialogs>>;
  updateBalance: (amount: number) => void;
  deviceRegion: string;
  activeChatVideoId: number;
  setActiveChatVideoId: Dispatch<SetStateAction<number>>;
}

export interface IDialogPreview {
  id: AGENT_KEYS;
  description: string;
  message: string;
  lastMessageTime: number | null;
  cost: number;
  isBlocked: boolean;
  isComplaint?: boolean;
  hasVideo: boolean;
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
      description: dialog.description,
      message: (lastMessage?.replic?.content || '')
        .replace(/{{2,3}(photo)_(\d+)}{2,3}/, '📸')
        .replace(/{{2,3}(video)_(\d+)}{2,3}/, '🎥'),
      lastMessageTime: lastMessage?.createTime ?? null,
      cost: dialog.cost,
      isBlocked: dialog.isBlocked ?? false,
      isComplaint: dialog.isComplaint ?? false,
      hasVideo: dialog.hasVideo,
    };
  }).sort((a, b) => b.lastMessageTime - a.lastMessageTime));
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = (
  { children }:
  { children: ReactNode }
) => {
  const [tokens, setTokens] = useState<number>(0);
  const [dialogs, setDialogs] = useState<Dialogs>({});
  const [dialogPreview, setDialogPreview] = useState<IDialogPreview[]>([]);
  const [deviceRegion] = useState<string>(mainUtils.getDeviceRegion());
  const [activeChatVideoId, setActiveChatVideoId] = useState<number>(0);

  const { userId } = useUser();

  useGooglePlayInstallReferrer(deviceRegion, userId);

  useEffect(() => {
    if (userId) {
      new InitDataService({
        userId,
      });
    }
  }, [userId]);

  useEffect(() => {
    const getInitData = async () => {
      // const userData = await AsyncStorageService.getData(LOCAL_STORAGE_KEYS.USER_DATA);
      const request = await api.getBalance(userId);

      if (request.ok) {
        const requestData = await request.json();
        setTokens(Number(requestData.balance));
      }

      const userDialogs = await AsyncStorageService.getData(LOCAL_STORAGE_KEYS.DIALOGS);

      // if (userData) {
      //   const parsedData = JSON.parse(userData);
      //   setTokens(parsedData.tokens || 0);
      // }

      const dialogs = JSON.parse(userDialogs || '') || {};

      setDialogs(dialogs);

      refreshChats({
        dialogs,
        setDialogPreview,
      });
    };
    // AsyncStorageService.storeData(LOCAL_STORAGE_KEYS.IS_INIT, '');
    const intervalId = setInterval(async () => {
      const isInit = await AsyncStorageService.getData(LOCAL_STORAGE_KEYS.IS_INIT);
      if (isInit && userId) {
        clearInterval(intervalId);
        getInitData();
      }
    }, 100);
  }, [userId]);

  useEffect(() => {
    if (dialogs[AGENT_KEYS.wendy] && dialogs[AGENT_KEYS.ashley]) {
      AsyncStorageService.storeData(LOCAL_STORAGE_KEYS.DIALOGS, JSON.stringify(dialogs));

      refreshChats({
        dialogs,
        setDialogPreview,
      });
    }
  }, [dialogs, setDialogPreview]);

  // useEffect(() => {
  //   AsyncStorageService.storeDataBySubKey(
  //     LOCAL_STORAGE_KEYS.USER_DATA,
  //     LOCAL_STORAGE_KEYS.TOKENS,
  //     tokens,
  //   );
  // }, [tokens]);

  const updateBalance = async (amount: number) => {
    const request = await api.addBalance(amount, userId);
    if (request.ok) {
      const requestData = await request.json();
      setTokens(Number(requestData.balance));
    }
  }

  return (
    <GlobalContext.Provider value={{
      tokens,
      dialogs,
      setDialogs,
      dialogPreview,
      updateBalance,
      deviceRegion,
      activeChatVideoId,
      setActiveChatVideoId,
    }}>
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