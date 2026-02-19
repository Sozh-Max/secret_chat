import React, { useMemo, useEffect, useRef, useState, useCallback } from 'react';
import { FlatList, NativeSyntheticEvent, NativeScrollEvent, Platform } from 'react-native';
import { ImageBackground } from 'expo-image';

import { IMG_POSTER_MAP } from '@/src/constants/agents-data';
import { styles } from '@/src/screens/ChatPage/content/chat-wrapper/styles';
import { SystemMessage } from '@/src/screens/ChatPage/content/system-message/SystemMessage';
import { IdTypeProps } from '@/src/interfaces/global';
import { useGlobal } from '@/src/contexts/GlobalContext';
import { CombinerMessage } from '@/src/screens/ChatPage/content/combiner-message/CombinerMessage';
import { useKeyboardStatus } from '@/src/hooks/useKeyboardStatus';
import { useComplaint } from '@/src/contexts/ComplaintContext';
import {
  BLOCKED_TEXT,
  COMPLAINT_FAILED_TEXT,
  COMPLAINT_SUCCEED_TEXT,
} from '@/src/screens/ChatPage/content/chat-wrapper/constants';

import type { IDialogItem } from '@/src/contexts/GlobalContext';

export const ChatWrapper = ({ id }: IdTypeProps) => {
  const { dialogs, setDialogs } = useGlobal();
  const { showComplaintChat } = useComplaint();

  const PAGE_SIZE = 8;

  const [page, setPage] = useState(1);

  const dialog = dialogs[id];
  const isKeyboardVisible = useKeyboardStatus();

  const listRef = useRef<FlatList<IDialogItem>>(null);

  // --- "умный" автоскролл ---
  // inverted: "низ" списка = offset ~ 0
  const isAtBottomRef = useRef(true);
  const onEndReachedDuringMomentum = useRef(false);

  // если меняем чат — начинаем с первой страницы, чтобы не рендерить гигантский список
  useEffect(() => {
    setPage(1);
    // при смене диалога логично считать, что мы "внизу"
    isAtBottomRef.current = true;
    onEndReachedDuringMomentum.current = false;

    // скролл к низу после смены чата
    requestAnimationFrame(() => {
      listRef.current?.scrollToOffset({ offset: 0, animated: false });
    });
  }, [id]);

  // ✅ reverse один раз
  const currentDialog: IDialogItem[] = useMemo(() => {
    return (dialog?.dialog ?? []).slice().reverse();
  }, [dialog?.dialog]);

  const messagesToRender: IDialogItem[] = useMemo(() => {
    return currentDialog.slice(0, page * PAGE_SIZE);
  }, [currentDialog, page]);

  // ✅ убрать нотификацию без мутаций
  useEffect(() => {
    if (!dialog?.isNotification) return;

    setDialogs((prev) => {
      const d = prev[id];
      if (!d) return prev;
      if (!d.isNotification) return prev;

      return {
        ...prev,
        [id]: {
          ...d,
          isNotification: false,
        },
      };
    });
  }, [dialog?.isNotification, id, setDialogs]);

  const onScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    // порог можно подстроить: чем больше, тем чаще будем считать, что пользователь "внизу"
    isAtBottomRef.current = y < 40;
  }, []);

  // автоскролл при новых сообщениях/системках:
  // - если пользователь "внизу" ИЛИ
  // - если открылась клавиатура (обычно пользователь пишет)
  useEffect(() => {
    const shouldAutoScroll = isAtBottomRef.current || isKeyboardVisible;
    if (!shouldAutoScroll) return;

    requestAnimationFrame(() => {
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
    });
  }, [currentDialog.length, dialog?.isBlocked, dialog?.isComplaint, isKeyboardVisible]);

  // при открытии клавиатуры чуть подталкиваем вниз (иногда layout не успевает)
  useEffect(() => {
    if (!isKeyboardVisible) return;

    const t = setTimeout(() => {
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
    }, 80);

    return () => clearTimeout(t);
  }, [isKeyboardVisible]);

  // loadMore: в inverted это подгрузка "сверху" (когда дошли до старых сообщений)
  const loadMore = useCallback(() => {
    if (messagesToRender.length < currentDialog.length) {
      setPage((prev) => prev + 1);
    }
  }, [messagesToRender.length, currentDialog.length]);

  // ✅ ключ строго из msgId
  const keyExtractor = useCallback((item: IDialogItem) => String(item.msgId), []);

  const renderItem = useCallback(
    ({ item }: { item: IDialogItem }) => <CombinerMessage dialog={item} id={id} />,
    [id]
  );

  const header = useMemo(() => {
    return (
      <>
        {dialog?.isBlocked && <SystemMessage id={id} message={BLOCKED_TEXT} />}

        {id === showComplaintChat && <SystemMessage id={id} message={COMPLAINT_FAILED_TEXT} />}

        {dialog?.isComplaint && <SystemMessage id={id} message={COMPLAINT_SUCCEED_TEXT} />}
      </>
    );
  }, [dialog?.isBlocked, dialog?.isComplaint, id, showComplaintChat]);

  const footer = useMemo(() => {
    return <SystemMessage id={id} isImage message={dialog?.description} />;
  }, [dialog?.description, id]);

  return (
    <ImageBackground source={IMG_POSTER_MAP[id]} style={styles.image_background}>
      <FlatList
        ref={listRef}
        data={messagesToRender}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={header}
        ListFooterComponent={footer}
        style={styles.wrapper}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        inverted

        // --- плавность / производительность ---
        onScroll={onScroll}
        scrollEventThrottle={16}
        initialNumToRender={PAGE_SIZE}
        maxToRenderPerBatch={PAGE_SIZE}
        updateCellsBatchingPeriod={50}
        windowSize={7}
        removeClippedSubviews={Platform.OS === 'android'} // безопаснее так
        decelerationRate={Platform.OS === 'ios' ? 'fast' : 0.98}

        // --- защита от дребезга onEndReached ---
        onMomentumScrollBegin={() => {
          onEndReachedDuringMomentum.current = false;
        }}
        onEndReached={() => {
          if (onEndReachedDuringMomentum.current) return;
          onEndReachedDuringMomentum.current = true;
          loadMore();
        }}
        onEndReachedThreshold={0.1}
      />
    </ImageBackground>
  );
};
