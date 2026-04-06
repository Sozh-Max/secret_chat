import { useState } from 'react';
import { Pressable } from 'react-native';
import { styles } from '@/src/screens/ChatPage/content/assistant-message/content/image-content/styles';
import { router } from 'expo-router';
import { getAgentPhotoUrl } from '@/src/utils/chat-image-cache';
import { SkeletonBlock } from '@/src/components/skeleton-block/SkeletonBlock';
import { AgentId } from '@/src/interfaces/global';

export const ImageContent = ({
  id,
  num,
}: {
  id: AgentId;
  num: string;
}) => {
  const url = getAgentPhotoUrl(id, num);
  const [hasError, setHasError] = useState(false);

  const handlePress = () => {
    if (!hasError) {
      router.push({
        pathname: '/image-modal',
        params: { url },
      });
    }
  }

  return (
    <Pressable
      onPress={handlePress}
      style={styles.imageWrapper}
    >
      <SkeletonBlock
        url={url}
        contentFit="cover"
        containerStyle={styles.image}
        skeletonStyle={styles.image}
        imageStyle={styles.image}
        handleError={setHasError}
      />
    </Pressable>
  )
}
