import { View } from 'react-native';
import { styles } from '@/pages/ChatPage/content/typing-component/styles';
import { TypingDots } from '@/pages/ChatPage/content/typing-component/ThreeDots';

export const TypingComponent = () => {

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TypingDots />
      </View>
    </View>
  )
}