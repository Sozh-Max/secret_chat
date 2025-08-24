import { ResizeMode, Video } from 'expo-av';
import { Pressable, View } from 'react-native';
import { useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

export const VideoContent = ({ id, num, index }: { id: string; num: string; index: number; }) => {
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async () => {
    const ref = videoRef.current;
    if (!ref) return;
    try {
      const s = await ref.getStatusAsync();
      if (!s.isLoaded) return;

      const atEnd =
        'durationMillis' in s &&
        s.durationMillis != null &&
        ('positionMillis' in s ? (s.positionMillis ?? 0) >= s.durationMillis - 250 : false);

      if (s.didJustFinish || atEnd) {
        await ref.setPositionAsync(0);
      }
      await ref.playAsync();
      setIsPlaying(true);
    } catch (e) {
      console.warn('play failed:', e);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Video
        key={index}
        source={{ uri: `https://app.neuronautica.com/storage/${id}/video/${num}.mp4` }}
        style={styles.video}
        ref={videoRef}
        useNativeControls={isPlaying}
        resizeMode={ResizeMode.COVER}
        onPlaybackStatusUpdate={(status) => {
          if ('isPlaying' in status) setIsPlaying(status.isPlaying);
        }}
      />

      {!isPlaying && (
        <View style={styles.overlay} pointerEvents="box-none">
          <Pressable style={styles.button} onPress={handlePlay}>
            <Ionicons name="play" size={40} color="white" />
          </Pressable>
        </View>
      )}
    </View>
  );
};