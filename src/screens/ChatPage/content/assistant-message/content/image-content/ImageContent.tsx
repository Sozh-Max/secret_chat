import { useState } from 'react';
import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';
import { styles } from '@/src/screens/ChatPage/content/assistant-message/content/image-content/styles';
import { router } from 'expo-router';
import { AGENT_KEYS } from '@/src/constants/agents-data';
import { getAgentPhotoUrl } from '@/src/utils/chat-image-cache';
import { ChatMediaSkeleton } from '@/src/components/ChatMediaSkeleton/ChatMediaSkeleton';
import { SkeletonBlock } from '@/src/components/skeleton-block/SkeletonBlock';

export const ImageContent = ({
  id,
  num,
}: {
  id: AGENT_KEYS;
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
      {/*<View>*/}
      {/*  {!isLoaded && <ChatMediaSkeleton style={styles.imageSkeleton} />}*/}
      {/*  {!hasError && (*/}
      {/*    <Image*/}
      {/*      source={url}*/}
      {/*      style={styles.image}*/}
      {/*      contentFit="cover"*/}
      {/*      cachePolicy="disk"*/}
      {/*      onLoad={() => setIsLoaded(true)}*/}
      {/*      onError={() => setHasError(true)}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*</View>*/}
    </Pressable>
  )
}
