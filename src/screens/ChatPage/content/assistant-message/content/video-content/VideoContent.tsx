import { View, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/src/screens/ChatPage/content/assistant-message/content/video-content/styles';
import { useGlobal } from '@/src/contexts/GlobalContext';
import { VideoPlayer } from '@/src/screens/ChatPage/content/assistant-message/content/video-content/VideoPlayer';
import { useState } from 'react';
import { AGENT_KEYS } from '@/src/constants/agents-data';
import Constants from 'expo-constants';

const STORAGE_URL = Constants.expoConfig?.extra?.STORAGE_URL;

export const VideoContent = ({
  id,
  num,
}: {
  id: AGENT_KEYS;
  num: string;
}) => {
  const { activeChatVideoId, setActiveChatVideoId} = useGlobal();
  const [tempId, setTempId] = useState<number>(Date.now() * Number(num));

  const isActiveVideo = tempId === activeChatVideoId;

  const videoSource = `https://app.neuronautica.com/storage/${id}/video/${num}.mp4`;
  const thumbImg = `https://app.neuronautica.com/storage/${id}/video/posters/${num}.jpg`;

  const newVideoSource = `${STORAGE_URL}/${id}/video/${num}.mp4`;
  const newThumbImg = `${STORAGE_URL}/${id}/video/posters/${num}.jpg`;

  const handlePress = (id: number) => {
    setActiveChatVideoId(id);
    setTempId(id);
  }

  return (
    <View style={styles.wrapper}>
      {isActiveVideo && (
        <VideoPlayer videoSource={AGENT_KEYS.wendy === id ? newVideoSource : videoSource} />
      )}
      {!isActiveVideo && (
        <View
          style={styles.imageWrapper}
        >
          <Image
            source={{
              uri: AGENT_KEYS.wendy === id ? newThumbImg : thumbImg,
            }}
            style={styles.image}
            resizeMode="cover"
          />
            <Pressable
              style={styles.button}
              onPress={() => handlePress(Date.now())}
            >
              <Ionicons name="play-circle" size={64} color="white" />
            </Pressable>
        </View>
      )}

      {/*{!isPlaying && (*/}
      {/*  <Pressable*/}
      {/*    style={styles.button}*/}
      {/*    onPress={() => player.play()}*/}
      {/*  >*/}
      {/*    <Ionicons name="play-circle" size={64} color="white" />*/}
      {/*  </Pressable>*/}
      {/*)}*/}
    </View>
  );
};