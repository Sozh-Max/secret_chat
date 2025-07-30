import { Platform, Pressable, StyleSheet, TextInput, View, Text } from 'react-native';
import IconSend from '@/components/icons/IconSend';
import IconSmile from '@/components/icons/IconSmile';
import { useState } from 'react';
import { MAIN_COLOR } from '@/constants/Colors';
import { EMOJI_LIST } from '@/pages/ChatPage/content/chat-input/constants';
import { AnimatedPressBtn } from '@/components/AnimatedPressBtn/AnimatedPressBtn';
import { IdTypeProps } from '@/interfaces/global';

const ChatInput = ({
  id,
}: IdTypeProps) => {
  const [text, setText] = useState<string>('');
  const [isVisiblePicker, setIsVisiblePicker] = useState<boolean>(false);

  const handlePressEmoji = (emoji: string) => {
    setText(text => text + emoji);
  }

  const handleToggleEmojiPicker = () => setIsVisiblePicker(val => !val);

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
      />
      <Pressable style={styles.button}>
        <IconSend />
      </Pressable>
      {isVisiblePicker && (
        <View style={styles.emoji_picker}>
          {EMOJI_LIST.map((emoji) => (
            <AnimatedPressBtn style={styles.emoji_btn} onPress={() => handlePressEmoji(emoji)}>
              <Text style={styles.emoji}>{emoji}</Text>
            </AnimatedPressBtn>
          ))}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 50,
    color: '#fff',
    fontSize: 14,
    flexGrow: 1,
    fontFamily: 'NotoSans_400Regular',
    ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as any) : {}),
  },
  emoji_picker: {
    position: 'absolute',
    height: 36,
    bottom: '100%',
    left: 0,
    width: '100%',
    paddingLeft: 8,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  emoji_btn: {
    marginLeft: 5,
    marginRight: 5,
  },
  emoji: {
    fontSize: 18,
    lineHeight: 36,
  }
});

export default ChatInput;
