import { View, Text } from 'react-native';
import { IdTypeProps } from '@/interfaces/global';
import { styles } from '@/pages/ChatPage/content/typing-component/styles';
import { RotatingIco } from '@/pages/ChatPage/content/typing-component/RotatingIco';

export const TypingComponent = ({
  id
}: IdTypeProps) => {

  return (
    <View style={styles.wrapper}>
      <RotatingIco />
      <Text style={styles.assistant}>{id} </Text>
      <Text style={styles.typing}>Typing...</Text>
    </View>
  )
}