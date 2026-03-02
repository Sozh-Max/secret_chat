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
import { getNotifications } from '@/src/utils/global';
import { ROLES } from '@/src/api/constants';
import { Platform, Vibration } from 'react-native';
import { PLATFORM } from '@/src/services/constants';

// ❗️ВАЖНО: LOCAL_STORAGE_KEYS должен содержать GLOBAL_* ключи.
// Лучше импортировать из async-storage-service/constants, а не из services/constants.
// Если у тебя они реально в services/constants — оставь как есть.
import { LOCAL_STORAGE_KEYS } from '@/src/services/constants';

import { useApi } from '@/src/contexts/ApiContext';
import { AsyncStorageService } from '@/src/services/async-storage-service';

export interface IDialogItem {
  msgId: number;
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
  verified: boolean;
}

export type IDialogs = { [key in AGENT_KEYS]?: IDialog };

export interface IDialogPreview {
  id: AGENT_KEYS;
  description: string;
  message: string;
  lastMessageTime: number | null;
  cost: number;
  isBlocked: boolean;
  isComplaint?: boolean;
  hasVideo: boolean;
  isNotification?: boolean;
  isNotificationSend?: boolean;
  verified: boolean;
}

type GlobalContextType = {
  tokens: number | null;
  isTokensReady: boolean;

  dialogs: IDialogs;
  dialogPreview: IDialogPreview[];
  setDialogs: Dispatch<SetStateAction<IDialogs>>;

  updateBalance: (amount: number) => void;
  deviceRegion: string;

  activeChatVideoId: number;
  setActiveChatVideoId: Dispatch<SetStateAction<number>>;

  lastMsgGlobalId: number;
  setLastMsgGlobalId: Dispatch<SetStateAction<number>>;

  // init flags
  isGlobalHydrated: boolean; // кеш проверили (есть/нет)
  isInitReady: boolean;      // API init завершён (успех/ошибка)
  hadCache: boolean;         // кеш был найден
};

const refreshChats = ({
  dialogs,
  setDialogPreview,
}: {
  dialogs: IDialogs;
  setDialogPreview: Dispatch<SetStateAction<IDialogPreview[]>>;
}) => {
  setDialogPreview(
    INIT_AGENT_LIST.map((key: AGENT_KEYS) => {
      const dialog: IDialog | undefined = dialogs[key];

      const lastMessage: IDialogItem | undefined =
        dialog?.dialog?.[dialog.dialog.length - 1];

      return {
        id: key,
        description: dialog?.description ?? '',
        message: (lastMessage?.replic?.content || '')
          .replace(/{{2,3}(photo)_(\d+)}{2,3}/, '📸')
          .replace(/{{2,3}(video)_(\d+)}{2,3}/, '🎥'),
        lastMessageTime: lastMessage?.createTime ?? null,
        cost: dialog?.cost ?? 0,
        isBlocked: dialog?.isBlocked ?? false,
        isComplaint: dialog?.isComplaint ?? false,
        hasVideo: dialog?.hasVideo ?? false,
        isNotification: dialog?.isNotification ?? false,
        isNotificationSend: dialog?.isNotificationSend ?? false,
        verified: dialog?.verified ?? false,
      };
    }).sort((a, b) => (b.lastMessageTime ?? 0) - (a.lastMessageTime ?? 0))
  );
};

const safeParse = <T,>(str?: string, fallback?: T): T => {
  try {
    return str ? (JSON.parse(str) as T) : (fallback as T);
  } catch {
    return fallback as T;
  }
};

const loadCache = async (userId: string) => {
  const cachedUserId = await AsyncStorageService.getData(
    LOCAL_STORAGE_KEYS.GLOBAL_CACHE_USER_ID
  );
  if (!cachedUserId || cachedUserId !== String(userId)) return null;

  const tokensStr = await AsyncStorageService.getData(LOCAL_STORAGE_KEYS.TOKENS);
  const dialogsStr = await AsyncStorageService.getData(LOCAL_STORAGE_KEYS.GLOBAL_DIALOGS);
  const previewStr = await AsyncStorageService.getData(LOCAL_STORAGE_KEYS.GLOBAL_DIALOG_PREVIEW);
  const lastIdStr = await AsyncStorageService.getData(LOCAL_STORAGE_KEYS.GLOBAL_LAST_MSG_GLOBAL_ID);

  // ✅ если токенов в кеше нет — возвращаем null, чтобы UI не показывал "0"
  const tokens =
    tokensStr == null || tokensStr === '' ? null : Number(tokensStr);

  return {
    tokens,
    dialogs: safeParse<IDialogs>(dialogsStr, {}),
    dialogPreview: safeParse<IDialogPreview[]>(previewStr, []),
    lastMsgGlobalId: Number(lastIdStr ?? 0),
  };
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [tokens, setTokens] = useState<number | null>(null);
  const isTokensReady = tokens !== null;

  const [dialogs, setDialogs] = useState<IDialogs>({});
  const [dialogPreview, setDialogPreview] = useState<IDialogPreview[]>([]);
  const [deviceRegion] = useState<string>(mainUtils.getDeviceRegion());
  const [activeChatVideoId, setActiveChatVideoId] = useState<number>(0);
  const [lastMsgGlobalId, setLastMsgGlobalId] = useState<number>(0);
  const [isFirstCheck, setIsFirstCheck] = useState<boolean>(false);

  const [isGlobalHydrated, setIsGlobalHydrated] = useState(false);
  const [isInitReady, setIsInitReady] = useState(false);
  const [hadCache, setHadCache] = useState(false);

  const { userId, bootId, isCheckAuthorized } = useUser();
  const { api, messageService } = useApi();

  useGooglePlayInstallReferrer(api, bootId);

  useInactivityNotification({
    setDialogs,
    dialogs,
    setLastMsgGlobalId,
  });

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync('#000000');
    NavigationBar.setButtonStyleAsync('light');
  }, []);

  const clearDialogs = useCallback(() => {
    setDialogs((prev: IDialogs) => {
      const next: IDialogs = {};
      for (const key in prev) {
        const value = prev[key as AGENT_KEYS];
        if (value) {
          next[key as AGENT_KEYS] = {
            ...value,
            dialog: [],
            isBlocked: false,
            isComplaint: false,
            lastMsgId: 0,
          };
        }
      }
      return next;
    });
  }, []);

  // ✅ Init: cache -> api
  useEffect(() => {
    let isMounted = true;

    const getInitData = async () => {
      if (!isCheckAuthorized || !userId) return;

      try {
        // 1) cache
        const cached = await loadCache(String(userId));

        if (isMounted) {
          setHadCache(Boolean(cached));
          if (cached) {
            setTokens(cached.tokens); // может быть null
            setDialogs(cached.dialogs);
            setDialogPreview(cached.dialogPreview);
            setLastMsgGlobalId(cached.lastMsgGlobalId);
          } else {
            // ✅ если кеша нет — tokens остаётся null (не показываем "0")
            setTokens(null);
          }
          setIsGlobalHydrated(true);
        }

        // 2) api
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
            verified: obj.verified ?? false,
            lastMsgId: 0,
          };
        }

        const requestDialogsData = await api.getDialogs(userId);
        if (requestDialogsData?.dialogs?.length) {
          for (let dialog of requestDialogsData.dialogs) {
            const item = dialogsData[dialog.id as AGENT_KEYS];
            if (item) {
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
        }

        const requestBalanceData = await api.getBalance(userId);

        if (!isMounted) return;

        // ✅ тут tokens становится числом (в т.ч. 0 — если реально 0)
        setTokens(Number(requestBalanceData?.balance ?? 0));

        setDialogs(dialogsData);
        if (requestDialogsData?.lastMsgGlobalId) {
          setLastMsgGlobalId(requestDialogsData.lastMsgGlobalId);
        }

        refreshChats({ dialogs: dialogsData, setDialogPreview });

        setIsInitReady(true);
      } catch (e) {
        console.log(e);
        if (isMounted) {
          setIsGlobalHydrated(true);
          setIsInitReady(true);
        }
      }
    };

    getInitData();

    return () => {
      isMounted = false;
    };
  }, [userId, isCheckAuthorized, api]);

  // ✅ Persist cache (debounced)
  useEffect(() => {
    if (!userId) return;
    if (!isCheckAuthorized) return;
    if (!isGlobalHydrated) return;

    const t = setTimeout(async () => {
      // ✅ не пишем TOKENS, пока tokens не загружены
      if (tokens !== null) {
        await AsyncStorageService.storeData(LOCAL_STORAGE_KEYS.TOKENS, String(tokens));
      }

      await AsyncStorageService.storeData(
        LOCAL_STORAGE_KEYS.GLOBAL_CACHE_USER_ID,
        String(userId)
      );
      await AsyncStorageService.storeData(
        LOCAL_STORAGE_KEYS.GLOBAL_CACHE_UPDATED_AT,
        String(Date.now())
      );

      await AsyncStorageService.storeData(
        LOCAL_STORAGE_KEYS.GLOBAL_DIALOGS,
        JSON.stringify(dialogs ?? {})
      );
      await AsyncStorageService.storeData(
        LOCAL_STORAGE_KEYS.GLOBAL_DIALOG_PREVIEW,
        JSON.stringify(dialogPreview ?? [])
      );
      await AsyncStorageService.storeData(
        LOCAL_STORAGE_KEYS.GLOBAL_LAST_MSG_GLOBAL_ID,
        String(lastMsgGlobalId ?? 0)
      );
    }, 250);

    return () => clearTimeout(t);
  }, [
    userId,
    isCheckAuthorized,
    isGlobalHydrated,
    tokens,
    dialogs,
    dialogPreview,
    lastMsgGlobalId,
  ]);

  // ✅ Logout cleanup: only after auth check is done
  useEffect(() => {
    if (!isCheckAuthorized) return;

    if (!userId) {
      clearDialogs();
      setTokens(null);
      setDialogPreview([]);
      setLastMsgGlobalId(0);

      setIsGlobalHydrated(false);
      setIsInitReady(false);
      setHadCache(false);

      AsyncStorageService.removeData(LOCAL_STORAGE_KEYS.TOKENS);
      AsyncStorageService.removeData(LOCAL_STORAGE_KEYS.GLOBAL_CACHE_USER_ID);
      AsyncStorageService.removeData(LOCAL_STORAGE_KEYS.GLOBAL_CACHE_UPDATED_AT);
      AsyncStorageService.removeData(LOCAL_STORAGE_KEYS.GLOBAL_DIALOGS);
      AsyncStorageService.removeData(LOCAL_STORAGE_KEYS.GLOBAL_DIALOG_PREVIEW);
      AsyncStorageService.removeData(LOCAL_STORAGE_KEYS.GLOBAL_LAST_MSG_GLOBAL_ID);
    }
  }, [userId, isCheckAuthorized, clearDialogs]);

  // refresh preview when dialogs update (оставил твоё условие, но лучше потом ослабить)
  useEffect(() => {
    if (dialogs[AGENT_KEYS.wendy] && dialogs[AGENT_KEYS.ashley]) {
      refreshChats({ dialogs, setDialogPreview });
    }
  }, [dialogs]);

  // notifications logic (как было)
  useEffect(() => {
    const checkFirstMessage = async () => {
      try {
        const notifications = await getNotifications(dialogs);
        const currentNotice = notifications.find((note) => note.active && !note.done);

        if (currentNotice) {
          setIsFirstCheck(true);

          setTimeout(async () => {
            const currentDialog = dialogs[currentNotice.agent];
            if (!currentDialog) return;

            await messageService.sendMessage({
              id: currentNotice.agent,
              userId: userId,
              message: currentNotice.body,
              setDialogs,
              assistantDialog: currentDialog?.dialog || [],
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
    };

    if (!isFirstCheck && userId && dialogs?.elise && Platform.OS === PLATFORM.ANDROID) {
      checkFirstMessage();
    }
  }, [userId, dialogs?.elise, setDialogs, isFirstCheck, dialogs, messageService]);

  useEffect(() => {
    if (!userId) setIsFirstCheck(false);
  }, [userId]);

  const updateBalance = async (amount: number) => {
    const requestData = await api.addBalance(amount, userId);
    setTokens(Number(requestData.balance ?? 0));
  };

  return (
    <GlobalContext.Provider
      value={{
        tokens,
        isTokensReady,

        dialogs,
        setDialogs,
        dialogPreview,

        updateBalance,
        deviceRegion,

        activeChatVideoId,
        setActiveChatVideoId,

        lastMsgGlobalId,
        setLastMsgGlobalId,

        isGlobalHydrated,
        isInitReady,
        hadCache,
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