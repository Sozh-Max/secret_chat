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

  const currentDialog = useMemo(() => {
    const array = dialogs[id]?.dialog || [];
    return [...array].reverse();
  }, [dialogs[id]?.dialog?.length]);

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
    >
      <View style={styles.inner}>
        {loading && <TypingComponent id={id} />}
        {currentDialog.map((dialog, i) => (
          <CombinerMessage key={i} dialog={dialog} id={id} />
        ))}
        <SystemMessage id={id} />
      </View>
    </ScrollView>
    </ImageBackground>
  );
};