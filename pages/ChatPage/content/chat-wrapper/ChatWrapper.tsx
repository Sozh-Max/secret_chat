import { FlatList } from 'react-native';
import { ImageBackground } from 'expo-image';
import { useMemo, useEffect, useRef, useState } from 'react';

import { AGENTS_DATA, IMG_POSTER_MAP } from '@/constants/agents-data';
import { styles } from '@/pages/ChatPage/content/chat-wrapper/styles';
import { SystemMessage } from '@/pages/ChatPage/content/system-message/SystemMessage';
import { IdTypeProps } from '@/interfaces/global';
import { useGlobal } from '@/contexts/GlobalContext';
import { CombinerMessage } from '@/pages/ChatPage/content/combiner-message/CombinerMessage';
import { TypingComponent } from '@/pages/ChatPage/content/typing-component/TypingComponent';
import { useKeyboardStatus } from '@/hooks/useKeyboardStatus';
import { useComplaint } from '@/contexts/ComplaintContext';
import {
  BLOCKED_TEXT,
  COMPLAINT_FAILED_TEXT,
  COMPLAINT_SUCCEED_TEXT,
} from '@/pages/ChatPage/content/chat-wrapper/constants';

interface IChatWrapperProps extends IdTypeProps {
  isShowTyping: boolean;
}

export const ChatWrapper = ({
  id,
  isShowTyping,
}: IChatWrapperProps) => {
  const { dialogs } = useGlobal();
  const { showComplaintChat } = useComplaint();
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 8;

  const dialog = dialogs[id];
  const isKeyboardVisible = useKeyboardStatus();

  const currentDialog = useMemo(() => {
    const array = dialog?.dialog || [];
    return [...array].reverse();
  }, [dialog?.dialog?.length]);

  const messagesToRender = useMemo(() => {
    return currentDialog.slice(0, page * PAGE_SIZE);
  }, [currentDialog, page]);

  const listRef = useRef<FlatList<any>>(null);
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
          <CombinerMessage dialog={item} id={id} />
        )}
        ListHeaderComponent={
          <>
            {isShowTyping && <TypingComponent id={id} />}
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
          message={AGENTS_DATA[id]}
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