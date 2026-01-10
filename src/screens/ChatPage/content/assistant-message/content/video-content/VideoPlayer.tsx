import { Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { useVideoPlayer, VideoView } from 'expo-video';

import { styles } from '@/src/screens/ChatPage/content/assistant-message/content/video-content/styles';
import { Ionicons } from '@expo/vector-icons';

export const VideoPlayer=  ({
  videoSource
}: {
  videoSource: string;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
    player.play();
  });

  useEffect(() => {
    const sub = player.addListener('playingChange', (playing) => {
      setIsPlaying(playing.isPlaying);
    });

    return () => {
      sub.remove();
    };
  }, [player]);


  // const handlePause = () => {
  //   player.pause();
  // };

  const handlePlay = () => {
    player.currentTime = 0;

    player.play();
  };

  return (
    <>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        nativeControls={false}
      />

      {/*{isPlaying && (*/}
      {/*  <Pressable*/}
      {/*    style={styles.button}*/}
      {/*    onPress={handlePause}*/}
      {/*  >*/}
      {/*    <Ionicons name="pause-circle" size={64} color="white" />*/}
      {/*  </Pressable>*/}
      {/*)}*/}

      {!isPlaying && (
        <Pressable
          style={styles.button}
          onPress={handlePlay}
        >
          <Ionicons name="play-circle" size={64} color="white" />
        </Pressable>
      )}
    </>
  )
}