import { Pressable, TextInput, View, Text } from 'react-native';
import IconSend from '@/components/icons/IconSend';
import IconSmile from '@/components/icons/IconSmile';
import { useState } from 'react';
import { MAIN_COLOR } from '@/constants/Colors';
import { EMOJI_LIST } from '@/pages/ChatPage/content/chat-input/constants';
import { AnimatedPressBtn } from '@/components/AnimatedPressBtn/AnimatedPressBtn';
import { IdTypeProps } from '@/interfaces/global';
import { messageService } from '@/services/message-service';
import { useGlobal } from '@/contexts/GlobalContext';
import { styles } from '@/pages/ChatPage/content/chat-input/styles';

interface ChatInputProps extends IdTypeProps {
  setLoading: (loading: boolean) => void;
}

const ChatInput = ({
  id,
  setLoading,
}: ChatInputProps) => {
  const [text, setText] = useState<string>('');
  const [isVisiblePicker, setIsVisiblePicker] = useState<boolean>(false);
  const { dialogs, setDialogs, setTokens } = useGlobal()

  const handlePressEmoji = (emoji: string) => {
    setText(text => text + emoji);
  }

  const handleToggleEmojiPicker = () => setIsVisiblePicker(val => !val);

  const sendMessage = async () => {
    if (text.trim()) {
      setText('');
      setTokens(val => val -  10);

      await messageService.sendMessage({
        id,
        message: text.trim(),
        setDialogs,
        assistantDialog: dialogs[id]?.dialog || [],
        setLoading,
      });
    }
  };

  return (
    <View style={styles.container}>
      <AnimatedPressBtn style={styles.button} onPress={handleToggleEmojiPicker}>
        <IconSmile />
      </AnimatedPressBtn>

      <TextInput
        style={styles.input}
        placeholder="Type your message here..."
        placeholderTextColor={MAIN_COLOR}
        selectionColor={MAIN_COLOR}
        underlineColorAndroid="transparent"
        value={text}
        onChangeText={setText}
        onSubmitEditing={sendMessage}
        returnKeyType="send"
        blurOnSubmit={false}
      />

      <Pressable style={styles.button} onPress={sendMessage}>
        <IconSend />
      </Pressable>

      {isVisiblePicker && (
        <View style={styles.emoji_picker}>
          {EMOJI_LIST.map((emoji) => (
            <AnimatedPressBtn key={emoji} style={styles.emoji_btn} onPress={() => handlePressEmoji(emoji)}>
              <Text style={styles.emoji}>{emoji}</Text>
            </AnimatedPressBtn>
          ))}
        </View>
      )}
    </View>
  )
}

export default ChatInput;