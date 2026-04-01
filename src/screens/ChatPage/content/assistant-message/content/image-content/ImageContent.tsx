import { Image, Pressable } from 'react-native';
import { styles } from '@/src/screens/ChatPage/content/assistant-message/content/image-content/styles';
import { router } from 'expo-router';
import Constants from 'expo-constants';
import { AGENT_KEYS } from '@/src/constants/agents-data';

const STORAGE_URL = Constants.expoConfig?.extra?.STORAGE_URL;

export const ImageContent = ({
  id,
  num,
}: {
  id: AGENT_KEYS;
  num: string;
}) => {
  const url = `https://app.neuronautica.com/storage/${id}/photo/${num}.jpg`;
  const newUrl = `${STORAGE_URL}/${id}/photo/${num}.jpg`;

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: '/image-modal',
          params: { url },
        })
      }
      style={styles.imageWrapper}
    >
      <Image source={{ uri: AGENT_KEYS.wendy === id ? newUrl : url }} style={styles.image} resizeMode="cover" />
    </Pressable>
  )
}