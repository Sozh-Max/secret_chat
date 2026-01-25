import { FlatList } from 'react-native';
import { ImageBackground } from 'expo-image';
import { useMemo, useEffect, useRef, useState } from 'react';

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

import { checkTypingMessage } from '@/src/utils/global';

export const ChatWrapper = ({
  id,
}: IdTypeProps) => {
  const { dialogs, setDialogs } = useGlobal();
  const { showComplaintChat } = useComplaint();
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 8;

  const dialog = dialogs[id];
  const isKeyboardVisible = useKeyboardStatus();

  const currentDialog = [...(dialog?.dialog || [])].reverse();

  const messagesToRender = useMemo(() => {
    return currentDialog.slice(0, page * PAGE_SIZE);
  }, [currentDialog, page]);

  const listRef = useRef<FlatList<any>>(null);

  useEffect(() => {
    if (dialog?.isNotification) {
      setDialogs((dialogs) => {
        const currentDialog = dialogs[dialog.id];

        if (currentDialog) {
          currentDialog.isNotification = false;
        }

        return { ...dialogs };
      });
    }
  }, [dialog?.isNotification]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  }, [
    currentDialog.length,
    dialog?.isBlocked,
    dialog?.isComplaint,
  ]);

  useEffect(() => {
    if (isKeyboardVisible) {
      setTimeout(() => {
        listRef.current?.scrollToOffset({ offset: 0, animated: true });
      }, 100);
    }
  }, [isKeyboardVisible]);

  const loadMore = () => {
    if (messagesToRender.length < currentDialog.length) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <ImageBackground
      source={IMG_POSTER_MAP[id]}
      style={styles.image_background}
    >
      <FlatList
        ref={listRef}
        data={messagesToRender}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          // <>
          //   {(checkTypingMessage(item))
          //     ? <TypingComponent />
          //     : <CombinerMessage dialog={item} id={id} />
          //   }
          // </>
          <CombinerMessage dialog={item} id={id} />
        )}
        ListHeaderComponent={
          <>
            {dialog?.isBlocked && (
              <SystemMessage
                id={id}
                message={BLOCKED_TEXT}
              />
            )}
            {(id === showComplaintChat) && (
              <SystemMessage
                id={id}
                message={COMPLAINT_FAILED_TEXT}
              />
            )}
            {dialog?.isComplaint && (
              <SystemMessage
                id={id}
                message={COMPLAINT_SUCCEED_TEXT}
              />
            )}
          </>
        }
        style={styles.wrapper}
        ListFooterComponent={<SystemMessage
          id={id}
          isImage
          message={dialog?.description}
        />}
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