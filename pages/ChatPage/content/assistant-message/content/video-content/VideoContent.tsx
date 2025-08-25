
import { View, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/pages/ChatPage/content/assistant-message/content/video-content/styles';
import { useGlobal } from '@/contexts/GlobalContext';
import { VideoPlayer } from '@/pages/ChatPage/content/assistant-message/content/video-content/VideoPlayer';


export const VideoContent = ({
  id,
  num,
}: {
  id: string;
  num: string;
}) => {
  const { activeChatVideoId, setActiveChatVideoId} = useGlobal();

  const currentId = `${id}-${num}`;

  const isActiveVideo = currentId === activeChatVideoId;

  const videoSource = `https://app.neuronautica.com/storage/${id}/video/${num}.mp4`;
  const thumbImg = `https://app.neuronautica.com/storage/${id}/video/posters/${num}.jpg`;

  return (
    <View style={styles.wrapper}>
      {isActiveVideo && (
        <VideoPlayer videoSource={videoSource} />
      )}
      {!isActiveVideo && (
        <View
          style={styles.imageWrapper}
        >
          <Image
            source={{
              uri: thumbImg,
            }}
            style={styles.image}
            resizeMode="cover"
          />
            <Pressable
              style={styles.button}
              onPress={() => setActiveChatVideoId(currentId)}
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