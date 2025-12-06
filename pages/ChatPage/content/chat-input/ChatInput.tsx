import { Pressable, TextInput, View, Text } from 'react-native';
import IconSend from '@/components/icons/IconSend';
import IconSmile from '@/components/icons/IconSmile';
import { useEffect, useState } from 'react';
import { MAIN_ICON_COLOR, DISMISS_ICON_COLOR, SUB_MAIN_ICON_COLOR } from '@/constants/Colors';
import { EMOJI_LIST } from '@/pages/ChatPage/content/chat-input/constants';
import { AnimatedPressBtn } from '@/components/AnimatedPressBtn/AnimatedPressBtn';
import { IdTypeProps } from '@/interfaces/global';
import { messageService } from '@/services/message-service';
import { useGlobal } from '@/contexts/GlobalContext';
import { styles } from '@/pages/ChatPage/content/chat-input/styles';
import { useUser } from '@/contexts/UserContext';
import { CLEAR_HISTORY_SYMBOLS } from '@/constants/global';

interface ChatInputProps extends IdTypeProps {
  setLoading: (loading: boolean) => void;
  setShowTyping: (show: boolean) => void;
  loading: boolean;
}

const ChatInput = ({
  id,
  setLoading,
  setShowTyping,
  loading,
}: ChatInputProps) => {
  const [text, setText] = useState<string>('');
  const [isVisiblePicker, setIsVisiblePicker] = useState<boolean>(false);
  const { dialogs, setDialogs, tokens, updateBalance, setLastMsgGlobalId } = useGlobal();
  const { userId, logout } = useUser();
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  const dialog = dialogs[id];

  const isBlocked = dialog?.isBlocked || dialog?.isComplaint;

  const handlePressEmoji = (emoji: string) => {
    if (!isBlocked) {
      setText(text => text + emoji);
    }
  };

  const handleToggleEmojiPicker = () => {
    if (!isBlocked) {
      setIsVisiblePicker(val => !val);
    }
  };

  const sendMessage = async () => {
    if (tokens - (dialog?.cost || 0) < 0) {
      alert('You haven\'t tokens!');
      return;
    }

    if (!isBlocked && !loading && text.trim()) {
      setText('');
      updateBalance(-(dialog?.cost || 0));

      await messageService.sendMessage({
        id,
        userId,
        message: text.trim(),
        setDialogs,
        assistantDialog: dialog?.dialog || [],
        setLoading,
        setShowTyping,
        setLastMsgGlobalId,
      });
    }

    if (text.trim() === CLEAR_HISTORY_SYMBOLS) {
      logout();
    }
  };

  useEffect(() => {
    if (isBlocked || loading) {
      setIsVisiblePicker(false);
      setText('');
    }
  }, [isBlocked, loading, setIsVisiblePicker]);

  return (
    <View style={styles.container}>
      <AnimatedPressBtn style={[styles.button, styles.button_start]} onPress={handleToggleEmojiPicker}>
        <IconSmile color={isBlocked ? DISMISS_ICON_COLOR : MAIN_ICON_COLOR}/>
      </AnimatedPressBtn>

      <TextInput
        style={styles.input}
        placeholder="Type your message here..."
        placeholderTextColor={isBlocked ? DISMISS_ICON_COLOR : MAIN_ICON_COLOR}
        selectionColor={MAIN_ICON_COLOR}
        underlineColorAndroid="transparent"
        value={text}
        onChangeText={setText}
        onSubmitEditing={sendMessage}
        returnKeyType="send"
        blurOnSubmit={false}
        cursorColor={MAIN_ICON_COLOR}
        editable={!isBlocked}
        onBlur={() => setIsInputFocused(false)}
        onFocus={() => setIsInputFocused(true)}
      />

      <Pressable style={[styles.button, styles.button_finish]} onPress={sendMessage}>
        <IconSend
          color={(isBlocked || loading) ? DISMISS_ICON_COLOR : isInputFocused ? SUB_MAIN_ICON_COLOR : MAIN_ICON_COLOR}
        />
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
  );
};

export default ChatInput;