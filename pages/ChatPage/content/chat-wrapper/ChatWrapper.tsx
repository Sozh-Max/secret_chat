import { IMG_POSTER_MAP } from '@/constants/agents-data';
import { View } from 'react-native';
import { ImageBackground } from 'expo-image';
import { styles } from '@/pages/ChatPage/content/chat-wrapper/styles';
import { SystemMessage } from '@/pages/ChatPage/content/system-message/SystemMessage';
import { IdTypeProps } from '@/interfaces/global';

export const ChatWrapper = ({
  id
}: IdTypeProps) => {
  return (
    <ImageBackground
      source={IMG_POSTER_MAP[id]}
      style={styles.image_background}
    >
      <View
        style={styles.wrapper}
      >
        <View style={styles.inner}>
          <SystemMessage id={id} />
        </View>
      </View>
    </ImageBackground>
  )
}