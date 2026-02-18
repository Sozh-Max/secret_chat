import React, { useMemo, useEffect, useRef, useState, useCallback } from 'react';
import { FlatList } from 'react-native';
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
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 8;

  const dialog = dialogs[id];
  const isKeyboardVisible = useKeyboardStatus();

  const currentDialog: IDialogItem[] = useMemo(() => {
    return (dialog?.dialog ?? []).slice().reverse();
  }, [dialog?.dialog]);

  const messagesToRender: IDialogItem[] = useMemo(() => {
    return currentDialog.slice(0, page * PAGE_SIZE);
  }, [currentDialog, page]);

  const listRef = useRef<FlatList<IDialogItem>>(null);

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

  useEffect(() => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, [currentDialog.length, dialog?.isBlocked, dialog?.isComplaint]);

  useEffect(() => {
    if (!isKeyboardVisible) return;

    const t = setTimeout(() => {
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
    }, 100);

    return () => clearTimeout(t);
  }, [isKeyboardVisible]);

  const loadMore = useCallback(() => {
    if (messagesToRender.length < currentDialog.length) {
      setPage((prev) => prev + 1);
    }
  }, [messagesToRender.length, currentDialog.length]);


  const keyExtractor = useCallback((item: IDialogItem) => String(item.msgId), []);

  const renderItem = useCallback(
    ({ item }: { item: IDialogItem }) => <CombinerMessage dialog={item} id={id} />,
    [id]
  );

  const header = useMemo(() => {
    return (
      <>
        {dialog?.isBlocked && <SystemMessage id={id} message={BLOCKED_TEXT} />}

        {id === showComplaintChat && (
          <SystemMessage id={id} message={COMPLAINT_FAILED_TEXT} />
        )}

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
        onEndReached={loadMore}
        onEndReachedThreshold={0.2}
      />
    </ImageBackground>
  );
};
