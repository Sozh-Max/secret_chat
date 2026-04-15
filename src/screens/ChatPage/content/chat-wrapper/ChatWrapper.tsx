import React, { useMemo, useEffect, useRef, useState, useCallback } from 'react';
import { FlatList, NativeSyntheticEvent, NativeScrollEvent, Platform, ActivityIndicator, View } from 'react-native';
import { ImageBackground } from 'expo-image';

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
import { collectDialogImageUrls, prefetchChatImages } from '@/src/utils/chat-image-cache';
import type { IDialogItem } from '@/src/contexts/GlobalContext';
import Constants from 'expo-constants';
import { MAIN_ICON_COLOR } from '@/src/constants/Colors';

const STORAGE_URL = Constants.expoConfig?.extra?.STORAGE_URL;
const PAGE_SIZE = 8;

export const ChatWrapper = ({ id }: IdTypeProps) => {
  const { dialogs, setDialogs } = useGlobal();
  const { showComplaintChat } = useComplaint();

  const [page, setPage] = useState(1);
  const [initialMessageIds, setInitialMessageIds] = useState<Set<string | number>>(new Set());
  const [snapshotReady, setSnapshotReady] = useState(false);

  const dialog = dialogs[id];
  const isKeyboardVisible = useKeyboardStatus();

  const listRef = useRef<FlatList<IDialogItem>>(null);

  const isAtBottomRef = useRef(true);
  const onEndReachedDuringMomentum = useRef(false);

  const snapshotInitializedForChatRef = useRef<string | null>(null);

  useEffect(() => {
    setPage(1);
    isAtBottomRef.current = true;
    onEndReachedDuringMomentum.current = false;

    snapshotInitializedForChatRef.current = null;
    setInitialMessageIds(new Set());
    setSnapshotReady(false);
  }, [id]);

  useEffect(() => {
    if (snapshotInitializedForChatRef.current === id) return;

    const ids = new Set((dialogs[id]?.dialog ?? []).map((item) => item.msgId));

    setInitialMessageIds(ids);
    setSnapshotReady(true);
    snapshotInitializedForChatRef.current = id;

    requestAnimationFrame(() => {
      listRef.current?.scrollToOffset({ offset: 0, animated: false });
    });
  }, [id, dialogs]);

  const currentDialog: IDialogItem[] = useMemo(() => {
    return (dialog?.dialog ?? []).slice().reverse();
  }, [dialog?.dialog]);

  const messagesToRender: IDialogItem[] = useMemo(() => {
    return currentDialog.slice(0, page * PAGE_SIZE);
  }, [currentDialog, page]);

  useEffect(() => {
    const urls = collectDialogImageUrls(dialog?.dialog ?? [], id);
    void prefetchChatImages(urls);
  }, [dialog?.dialog, id]);

  useEffect(() => {
    if (!dialog?.isNotification) return;

    setDialogs((prev) => {
      const d = prev[id];
      if (!d || !d.isNotification) return prev;

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
    isAtBottomRef.current = y < 40;
  }, []);

  useEffect(() => {
    if (!snapshotReady) return;

    const shouldAutoScroll = isAtBottomRef.current || isKeyboardVisible;
    if (!shouldAutoScroll) return;

    requestAnimationFrame(() => {
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
    });
  }, [snapshotReady, currentDialog.length, dialog?.isBlocked, dialog?.isComplaint, isKeyboardVisible]);

  useEffect(() => {
    if (!snapshotReady || !isKeyboardVisible) return;

    const t = setTimeout(() => {
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
    }, 80);

    return () => clearTimeout(t);
  }, [snapshotReady, isKeyboardVisible]);

  const [loadingMore, setLoadingMore] = useState(false);

  const loadMore = useCallback(() => {
    if (messagesToRender.length < currentDialog.length) {
      setLoadingMore(true);
      setPage((prev) => prev + 1);
    }
  }, [messagesToRender.length, currentDialog.length]);

  useEffect(() => {
    if (loadingMore) {
      setLoadingMore(false);
    }
  }, [messagesToRender.length]);

  const keyExtractor = useCallback((item: IDialogItem) => String(item.msgId), []);

  const renderItem = useCallback(
    ({ item }: { item: IDialogItem }) => {
      const shouldAnimateContent = !initialMessageIds.has(item.msgId);
      return (
        <CombinerMessage
          dialog={item}
          id={id}
          shouldAnimateContent={shouldAnimateContent}
        />
      );
    },
    [id, initialMessageIds]
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
    return (
      <>
        <SystemMessage id={id} isImage message={dialog?.description} />

        {loadingMore && (
          <View style={{ paddingVertical: 12, alignItems: 'center' }}>
            <ActivityIndicator size={30} color={MAIN_ICON_COLOR} />
          </View>
        )}
      </>
    );
  }, [dialog?.description, id, loadingMore]);

  if (!snapshotReady) {
    return (
      <ImageBackground
        source={`${STORAGE_URL}/${id}/poster.webp`}
        style={styles.image_background}
      />
    );
  }

  return (
    <ImageBackground
      source={`${STORAGE_URL}/${id}/poster.webp`}
      style={styles.image_background}
    >
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
        onScroll={onScroll}
        scrollEventThrottle={16}
        initialNumToRender={PAGE_SIZE}
        maxToRenderPerBatch={PAGE_SIZE}
        updateCellsBatchingPeriod={50}
        windowSize={7}
        removeClippedSubviews={Platform.OS === 'android'}
        decelerationRate={Platform.OS === 'ios' ? 'fast' : 0.98}
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