import { Image, Pressable } from 'react-native';
import { styles } from '@/src/screens/ChatPage/content/assistant-message/content/image-content/styles';
import { router } from 'expo-router';

export const ImageContent = ({
  id,
  num,
}: {
  id: string;
  num: string;
}) => {
  const url = `https://app.neuronautica.com/storage/${id}/photo/${num}.jpg`;

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
      <Image source={{ uri: url }} style={styles.image} resizeMode="cover" />
    </Pressable>
  )
}