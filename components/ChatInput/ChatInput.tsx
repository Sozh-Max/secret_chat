import { Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { AGENT_KEYS } from '@/constants/AgentsData';
import IconSend from '@/components/icons/IconSend';
import IconSmile from '@/components/icons/IconSmile';
import { useState } from 'react';
import { MAIN_COLOR } from '@/constants/Colors';

const ChatInput = ({
  id,
}: {
  id: AGENT_KEYS
}) => {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <Pressable style={styles.button}>
        <IconSmile />
      </Pressable>
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
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
});

export default ChatInput;
