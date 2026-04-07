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
import { getNotifications } from '@/src/utils/global';
import { ROLES } from '@/src/api/constants';
import { Platform, Vibration } from 'react-native';
import { PLATFORM } from '@/src/services/constants';
import { useApi } from '@/src/contexts/ApiContext';
import { AgentId } from '@/src/interfaces/global';

export interface IDialogItem {
  msgId: number;
  replic: IMessage;
  createTime: number;
}

export interface IDialog {
  dialog: IDialogItem[];
  id: AgentId;
  cost: number;
  isBlocked: boolean;
  isComplaint?: boolean;
  hasVideo: boolean;
  description: string;
  lastMsgId: number;
  isNotification?: boolean;
  isNotificationSend?: boolean;
  verified: boolean;
}

export type IDialogs = { [key in AgentId]?: IDialog }

type GlobalContextType = {
  tokens: number | null;
  dialogs: IDialogs;
  dialogPreview: IDialogPreview[];
  setDialogs: Dispatch<SetStateAction<IDialogs>>;
  updateBalance: (amount: number) => void;
  deviceRegion: string;
  activeChatVideoId: number;
  setActiveChatVideoId: Dispatch<SetStateAction<number>>;
  lastMsgGlobalId: number;
  setLastMsgGlobalId: Dispatch<SetStateAction<number>>;
  isAppReady: boolean;
  showGlobalLoader: boolean;
  setShowGlobalLoader: Dispatch<SetStateAction<boolean>>;
}

export interface IDialogPreview {
  id: AgentId;
  description: string;
  message: string;
  lastMessageTime: number;
  cost: number;
  isBlocked: boolean;
  isComplaint?: boolean;
  hasVideo: boolean;
  isNotification?: boolean;
  isNotificationSend?: boolean;
  verified: boolean;
}

const refreshChats = ({
  dialogs,
  setDialogPreview,
}: {
  dialogs: IDialogs;
  setDialogPreview: Dispatch<SetStateAction<IDialogPreview[]>>;
}) => {
  const INIT_AGENT_LIST: AgentId[] = Object.keys(dialogs);

  setDialogPreview(INIT_AGENT_LIST.map((key: AgentId) => {
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
      verified: dialog.verified || false,
    };
  }).sort((a, b) => b.lastMessageTime - a.lastMessageTime));
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = (
  { children }:
  { children: ReactNode }
) => {
  const [tokens, setTokens] = useState<number | null>(null);
  const [dialogs, setDialogs] = useState<IDialogs>({});
  const [dialogPreview, setDialogPreview] = useState<IDialogPreview[]>([]);
  const [deviceRegion] = useState<string>(mainUtils.getDeviceRegion());
  const [activeChatVideoId, setActiveChatVideoId] = useState<number>(0);
  const [lastMsgGlobalId, setLastMsgGlobalId] = useState<number>(0);
  const [isFirstCheck, setIsFirstCheck] = useState<boolean>(false);
  const [isAppReady, setIsAppReady] = useState<boolean>(false);
  const [showGlobalLoader, setShowGlobalLoader] = useState<boolean>(false);

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
        const dialogsData: Partial<Record<AgentId, IDialog>> = {};

        const requestInitData = await api.getInitData(userId);

        for (const key in requestInitData?.assistantsData) {
          const obj = requestInitData.assistantsData[key];

          dialogsData[key as AgentId] = {
            dialog: [],
            id: key as AgentId,
            cost: obj.cost ?? 10,
            isBlocked: false,
            isComplaint: false,
            hasVideo: Boolean(obj.vid_count),
            description: obj.description ?? '',
            verified: obj.verified ?? false,
            lastMsgId: 0,
          };
        }

        const requestDialogsData = await api.getDialogs(userId);

        if (requestDialogsData?.dialogs?.length) {
          for (const dialog of requestDialogsData.dialogs) {
            const item = dialogsData[dialog.id as AgentId];
            if (!item) continue;

            item.dialog = dialog.dialog.map((d: IDialogItem, index: number) => ({
              ...d,
              msgId: index + 1,
            })) as IDialogItem[];

            item.isBlocked = dialog.isBlocked || false;
            item.isComplaint = dialog.isComplaint || false;
            item.lastMsgId = dialog.lastMsgId || 0;
            item.isNotification = dialog.isNotification ?? false;
            item.isNotificationSend = dialog.isNotificationSend ?? false;
          }
        }

        if (requestDialogsData?.lastMsgGlobalId) {
          setLastMsgGlobalId(requestDialogsData.lastMsgGlobalId);
        }

        const requestBalanceData = await api.getBalance(userId);
        setTokens(Number(requestBalanceData?.balance || 0));

        setDialogs(dialogsData);
        refreshChats({
          dialogs: dialogsData,
          setDialogPreview,
        });

        setIsAppReady(true);
        setShowGlobalLoader(false);
      } catch (e) {
        console.log(e);
      }
    };

    if (!isCheckAuthorized) return;
    if (!userId) return;

    getInitData();
  }, [userId, isCheckAuthorized, api]);

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync('#000000');
    NavigationBar.setButtonStyleAsync('light');
  }, []);

  const clearDialogs = useCallback(() => {
    setDialogs((dialogs: IDialogs) => {
      const newDialogs: IDialogs = {};

      for (const key in dialogs) {
        const value = dialogs[key as AgentId];
        if (value) {
          newDialogs[key as AgentId] = {
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
      setDialogPreview([]);
      setLastMsgGlobalId(0);
    }
  }, [userId]);

  useEffect(() => {
    if (Object.keys(dialogs).length > 0) {
      refreshChats({
        dialogs,
        setDialogPreview,
      });
    }
  }, [dialogs, setDialogPreview]);

  useEffect(() => {
    const checkFirstMessage = async () => {
      try {
        const notifications = await getNotifications(dialogs);

        const currentNotice =  notifications.find((note) => note.active && !note.done);

        if (currentNotice) {
          setIsFirstCheck(true);
          setTimeout(async () => {
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

    if (!isFirstCheck && userId && dialogs?.elise && Platform.OS === PLATFORM.ANDROID) {
      checkFirstMessage();
    }
  }, [userId, dialogs?.elise, setDialogs, isFirstCheck]);

  useEffect(() => {
    if (!userId) setIsFirstCheck(false);
  }, [userId]);

  const updateBalance = async (amount: number) => {
    const requestData = await api.addBalance(amount, userId);
    setTokens(Number(requestData.balance));
  }

  return (
    <GlobalContext.Provider
      value={{
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
        isAppReady,
        showGlobalLoader,
        setShowGlobalLoader,
      }}
    >
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