import { Pressable, TextInput, View, Text } from 'react-native';
import IconSend from '@/components/icons/IconSend';
import IconSmile from '@/components/icons/IconSmile';
import { useEffect, useState } from 'react';
import { LOW_COLOR, MAIN_COLOR, SUB_COLOR } from '@/constants/Colors';
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
  const { dialogs, setDialogs, tokens, setTokens } = useGlobal();

  const dialog = dialogs[id];

  const isBlocked = dialog?.isBlocked;

  const handlePressEmoji = (emoji: string) => {
    if (!isBlocked) {
      setText(text => text + emoji);
    }
  }

  const handleToggleEmojiPicker = () => {
    if (!isBlocked) {
      setIsVisiblePicker(val => !val);
    }
  }

  const sendMessage = async () => {
    if (tokens - (dialog?.cost || 0) < 0) {
      alert("You haven't tokens!");
      return;
    }

    if (!isBlocked && text.trim()) {
      setText('');
      setTokens(val => val -  (dialog?.cost || 0));

      await messageService.sendMessage({
        id,
        message: text.trim(),
        setDialogs,
        assistantDialog: dialog?.dialog || [],
        setLoading,
      });
    }
  };

  useEffect(() => {
    if (isBlocked) {
      setIsVisiblePicker(false);
      setText('');
    }
  }, [isBlocked, setIsVisiblePicker])

  return (
    <View style={styles.container}>
      <AnimatedPressBtn style={styles.button} onPress={handleToggleEmojiPicker}>
        <IconSmile color={isBlocked ? LOW_COLOR : SUB_COLOR} />
      </AnimatedPressBtn>

      <TextInput
        style={styles.input}
        placeholder="Type your message here..."
        placeholderTextColor={isBlocked ? LOW_COLOR : MAIN_COLOR}
        selectionColor={MAIN_COLOR}
        underlineColorAndroid="transparent"
        value={text}
        onChangeText={setText}
        onSubmitEditing={sendMessage}
        returnKeyType="send"
        blurOnSubmit={false}
        editable={!isBlocked}
      />

      <Pressable style={styles.button} onPress={sendMessage}>
        <IconSend color={isBlocked ? LOW_COLOR : MAIN_COLOR} />
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