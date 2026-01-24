import { AGENT_KEYS, INIT_AGENT_LIST } from '@/src/constants/agents-data';
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { IMessage } from '@/src/api/interfaces';
import { mainUtils } from '@/src/services/main-utils';
import { useGooglePlayInstallReferrer } from '@/src/hooks/useGooglePlayInstallReferrer';
import { useUser } from '@/src/contexts/UserContext';
import * as NavigationBar from 'expo-navigation-bar';
import { useInactivityNotification } from '@/src/hooks/useInactivityNotification';
import { getNotificationsByUserId, setNotificationsByUserId } from '@/src/utils/global';
import { ROLES } from '@/src/api/constants';
import { Platform, Vibration } from 'react-native';
import { PLATFORM } from '@/src/services/constants';
import { useApi } from '@/src/contexts/ApiContext';

export interface IDialogItem {
  replic: IMessage;
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
  lastMsgId: number;
  isNotification?: boolean;
  isNotificationSend?: boolean;
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
  lastMsgGlobalId: number;
  setLastMsgGlobalId: Dispatch<SetStateAction<number>>;
}

export interface IDialogPreview {
  id: AGENT_KEYS;
  description: string;
  message: string;
  lastMessageTime: number;
  cost: number;
  isBlocked: boolean;
  isComplaint?: boolean;
  hasVideo: boolean;
  isNotification?: boolean;
  isNotificationSend?: boolean;
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
      isNotification: dialog.isNotification || false,
      isNotificationSend: dialog.isNotificationSend || false,
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
  const [lastMsgGlobalId, setLastMsgGlobalId] = useState<number>(0);

  const { userId, bootId, isCheckAuthorized } = useUser();
  const { api, messageService } = useApi();

  useGooglePlayInstallReferrer(api, bootId);

  useInactivityNotification({
    setDialogs,
    dialogs,
    setLastMsgGlobalId,
  });

  useEffect(() => {
    const getInitData = async () => {
      try {
        const dialogsData: Partial<Record<AGENT_KEYS, IDialog>> = {};

        const requestInitData = await api.getInitData(userId);

        for (const key in requestInitData?.assistantsData) {
          const obj = requestInitData.assistantsData[key];

          dialogsData[key as AGENT_KEYS] = {
            dialog: [],
            id: key as AGENT_KEYS,
            cost: obj.cost ?? 10,
            isBlocked: false,
            isComplaint: false,
            hasVideo: Boolean(obj.vid_count),
            description: obj.description ?? '',
            lastMsgId: 0,
          }
        }

        const requestDialogsData = await api.getDialogs(userId);

        if (requestDialogsData?.dialogs?.length) {
          for (let dialog of requestDialogsData.dialogs) {
            const item: IDialog | undefined = dialogsData[dialog.id as AGENT_KEYS];
            if (item) {
              item.dialog = dialog.dialog as IDialogItem[];
              item.isBlocked = dialog.isBlocked || false;
              item.isComplaint = dialog.isComplaint || false;
              item.lastMsgId = dialog.lastMsgId || 0;
              item.isNotification = dialog.isNotification ?? false;
              item.isNotificationSend = dialog.isNotificationSend ?? false;
            }
          }
        }
        if (requestDialogsData?.lastMsgGlobalId) {
          setLastMsgGlobalId(requestDialogsData.lastMsgGlobalId);
        }

        const requestBalanceData = await api.getBalance(userId);

        setTokens(Number(requestBalanceData?.balance || 0));

        setDialogs(dialogsData)

        refreshChats({
          dialogs: dialogsData,
          setDialogPreview,
        });
      } catch (e) {
        console.log(e);
      }
    };

    const intervalId = setInterval(async () => {
      if (isCheckAuthorized && userId) {
        clearInterval(intervalId);
        getInitData();
      }
    }, 100);
  }, [userId, isCheckAuthorized]);

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync('#000000');
    NavigationBar.setButtonStyleAsync('light');
  }, []);

  const clearDialogs = useCallback(() => {
    setDialogs((dialogs: Dialogs) => {
      const newDialogs: Dialogs = {};

      for (const key in dialogs) {
        const value = dialogs[key as AGENT_KEYS];
        if (value) {
          newDialogs[key as AGENT_KEYS] = {
            ...value,
            dialog: [],
            isBlocked: false,
            isComplaint: false,
            lastMsgId: 0,
          }
        }
      }

      return newDialogs;
    });
  }, [setDialogs]);

  useEffect(() => {
    if (!userId) {
      clearDialogs();
    }
  }, [userId]);

  useEffect(() => {
    if (dialogs[AGENT_KEYS.wendy] && dialogs[AGENT_KEYS.ashley]) {
      refreshChats({
        dialogs,
        setDialogPreview,
      });
    }
  }, [dialogs, setDialogPreview]);

  useEffect(() => {
    const id = setInterval(async () => {
      try {
        if (userId) {
          const dialogsData = [];
          for (const key in dialogs) {
            // @ts-ignore
            const dialog: IDialog = dialogs[key];
            dialogsData.push({
              assistantId: dialog.id,
              lastMsgId: dialog.lastMsgId,
            });
          }
          const data = await api.syncDialogs({
            userId,
            lastMsgGlobalId,
            data: dialogsData,
          });

          if (data?.balance) {
            setTokens(data.balance);
          }

          setDialogs(((dialogs) => {
            // @ts-ignore
            data.dialogs?.forEach((d) => {
              // @ts-ignore
              const dialog = dialogs[d.id];
              if (dialog) {
                dialog.dialog = d.dialog;
                dialog.isBlocked = d.isBlocked;
                dialog.isComplaint = d.isComplaint;
                dialog.lastMsgId = d.lastMsgId;
                dialog.isNotification = d.isNotification ?? false;
                dialog.isNotificationSend = d.isNotificationSend ?? false;
              }
            });

            return {
              ...dialogs,
            }
          }));
          setLastMsgGlobalId(data.lastMsgGlobalId);
        }
      } catch (e) {
        console.log(e);
      }

    }, 5000);

    return () => {
      clearInterval(id);
    }
  }, [userId, lastMsgGlobalId, dialogs, setDialogs]);

  useEffect(() => {
    const checkFirstMessage = async () => {
      try {
        const notifications = await getNotificationsByUserId(userId);

        const currentNotice =  notifications.find((note) => note.active && !note.done);

        if (currentNotice) {
          setTimeout(async () => {
            await setNotificationsByUserId(userId, notifications.map((data) => ({
              ...data,
              done: data.id === currentNotice?.id ? true: data.done,
            })));

            const currentDialog = dialogs[currentNotice.agent];
            if (!currentDialog) return;

            const dialog = dialogs[currentNotice.agent];
            await messageService.sendMessage({
              id: currentNotice.agent,
              userId: userId,
              message: currentNotice.body,
              setDialogs,
              assistantDialog: dialog?.dialog || [],
              setLoading: () => {},
              setLastMsgGlobalId,
              role: ROLES.APP,
            });

            Vibration.vibrate([500, 200, 500, 200, 500]);

          }, currentNotice.seconds * 1000);
        }
      } catch (e) {
        console.log(`Error in checkFirstMessage: ${e}`);
      }
    }

    if (userId && dialogs?.elise && Platform.OS === PLATFORM.ANDROID) {
      checkFirstMessage();
    }
  }, [userId, dialogs?.elise, setDialogs]);

  const updateBalance = async (amount: number) => {
    const requestData = await api.addBalance(amount, userId);
    setTokens(Number(requestData.balance));
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
      lastMsgGlobalId,
      setLastMsgGlobalId,
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