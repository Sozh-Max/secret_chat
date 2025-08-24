import { AGENT_KEYS, AGENTS_DATA, INIT_AGENT_LIST } from '@/constants/agents-data';
import { AsyncStorageService } from '@/services/async-storage-service';
import { LOCAL_STORAGE_KEYS } from '@/services/constants';
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { IMessage } from '@/api/interfaces';
import { mainUtils } from '@/services/main-utils';
import { useGooglePlayInstallReferrer } from '@/hooks/useGooglePlayInstallReferrer';

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
  isBlocked: boolean;
  hasVideo: boolean;
}

export type Dialogs = { [key in AGENT_KEYS]?: IDialog }

type GlobalContextType = {
  tokens: number;
  dialogs: Dialogs;
  dialogPreview: IDialogPreview[];
  setDialogs: Dispatch<SetStateAction<Dialogs>>;
  setTokens: Dispatch<SetStateAction<number>>;
  deviceRegion: string;
}

export interface IDialogPreview {
  id: AGENT_KEYS;
  description: string;
  message: string;
  lastMessageTime: number | null;
  cost: number;
  isBlocked: boolean;
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
      description: AGENTS_DATA[key],
      message: (lastMessage?.replic?.content || '')
        .replace(/{{2,3}(photo)_(\d+)}{2,3}/, '📸')
        .replace(/{{2,3}(video)_(\d+)}{2,3}/, '🎥'),
      lastMessageTime: lastMessage?.createTime ?? null,
      cost: dialog.cost,
      isBlocked: dialog.isBlocked ?? false,
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
  const [uniqueId, setUniqueId] = useState<string>('');

  useGooglePlayInstallReferrer(deviceRegion, uniqueId);

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
    //AsyncStorageService.storeData(LOCAL_STORAGE_KEYS.IS_INIT, '');
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
    AsyncStorageService.storeDataBySubKey(
      LOCAL_STORAGE_KEYS.USER_DATA,
      LOCAL_STORAGE_KEYS.TOKENS,
      tokens,
    );
  }, [tokens]);

  useEffect(() => {
    mainUtils.getUniqueId().then((id) => setUniqueId(id));
  }, []);

  return (
    <GlobalContext.Provider value={{
      tokens,
      dialogs,
      setDialogs,
      dialogPreview,
      setTokens,
      deviceRegion,
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