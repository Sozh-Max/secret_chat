import { IMG_POSTER_MAP } from '@/constants/agents-data';
import { View, ScrollView } from 'react-native';
import { ImageBackground } from 'expo-image';
import { styles } from '@/pages/ChatPage/content/chat-wrapper/styles';
import { SystemMessage } from '@/pages/ChatPage/content/system-message/SystemMessage';
import { IdTypeProps } from '@/interfaces/global';
import { useGlobal } from '@/contexts/GlobalContext';
import { CombinerMessage } from '@/pages/ChatPage/content/combiner-message/CombinerMessage';
import { useMemo, useEffect, useRef } from 'react';
import { TypingComponent } from '@/pages/ChatPage/content/typing-component/TypingComponent';

interface IChatWrapperProps extends IdTypeProps {
  loading: boolean;
}

export const ChatWrapper = ({
  id,
  loading,
}: IChatWrapperProps) => {
  const { dialogs } = useGlobal();
  const scrollRef = useRef<ScrollView>(null);

  const dialog = dialogs[id];

  const currentDialog = useMemo(() => {
    const array = dialog?.dialog || [];
    return [...array].reverse();
  }, [dialog?.dialog?.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current?.scrollToEnd({ animated: true });
    }
  }, [currentDialog.length]);

  return (
    <ImageBackground
      source={IMG_POSTER_MAP[id]}
      style={styles.image_background}
    >
      <ScrollView
        ref={scrollRef}
        style={styles.wrapper}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.inner}>
          {loading && <TypingComponent id={id}/>}
          {dialog?.isBlocked && (
            <SystemMessage id={id} isBlocked={true} />
          )}
          {currentDialog.map((currentDialog, i) => (
            <CombinerMessage
              key={i}
              dialog={currentDialog}
              id={id}
            />
          ))}
          <SystemMessage id={id} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};