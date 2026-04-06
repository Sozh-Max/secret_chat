import { View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/src/screens/ChatPage/content/assistant-message/content/video-content/styles';
import { useGlobal } from '@/src/contexts/GlobalContext';
import { VideoPlayer } from '@/src/screens/ChatPage/content/assistant-message/content/video-content/VideoPlayer';
import { useState } from 'react';
import Constants from 'expo-constants';
import { SkeletonBlock } from '@/src/components/skeleton-block/SkeletonBlock';
import { AgentId } from '@/src/interfaces/global';

const STORAGE_URL = Constants.expoConfig?.extra?.STORAGE_URL;

export const VideoContent = ({
  id,
  num,
}: {
  id: AgentId;
  num: string;
}) => {
  const { activeChatVideoId, setActiveChatVideoId} = useGlobal();
  const [tempId, setTempId] = useState<number>(Date.now() * Number(num));

  const isActiveVideo = tempId === activeChatVideoId;

  const videoSource = `${STORAGE_URL}/${id}/video/${num}.mp4`;
  const thumbImg = `${STORAGE_URL}/${id}/video/posters/${num}.jpg`;

  const handlePress = (id: number) => {
    setActiveChatVideoId(id);
    setTempId(id);
  }

  // useEffect(() => {
  //   setIsPosterLoaded(false);
  //   setHasPosterError(false);
  // }, [thumbImg]);

  return (
    <View style={styles.wrapper}>
      {isActiveVideo && (
        <VideoPlayer videoSource={videoSource} />
      )}
      {!isActiveVideo && (
        <View
          style={styles.imageWrapper}
        >
          <SkeletonBlock
            url={thumbImg}
            containerStyle={styles.image}
            skeletonStyle={styles.image}
            imageStyle={styles.image}
            contentFit="cover"
          />
            <Pressable
              style={styles.button}
              onPress={() => handlePress(Date.now())}
            >
              <Ionicons name="play-circle" size={64} color="white" />
            </Pressable>
        </View>
      )}
    </View>
  );
};
