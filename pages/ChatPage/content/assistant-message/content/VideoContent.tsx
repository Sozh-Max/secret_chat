import { ResizeMode, Video } from 'expo-av';
import { Pressable, View } from 'react-native';
import { useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export const VideoContent = ({
  id,
  num,
  index,
}: {
  id: string;
  num: string;
  index: number;
}) => {
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handlePlay = async () => {
    const ref = videoRef.current;
    if (!ref) return;

    try {
      const s = await ref.getStatusAsync();
      if (!s.isLoaded) return;

      const atEnd =
        "durationMillis" in s &&
        s.durationMillis != null &&
        ("positionMillis" in s ? (s.positionMillis ?? 0) >= s.durationMillis - 250 : false);

      // Если видео на конце — явно перематываем на 0, затем запускаем
      if (s.didJustFinish || atEnd) {
        await ref.setPositionAsync(0);
      }

      await ref.playAsync();
      setIsFinished(false);
      setIsPlaying(true);
    } catch (e) {
      console.warn("play failed:", e);
    }
  };

  return (
    <View
      style={{
        paddingBottom: 'calc(100% * (1 / 0.5625))',
      }}
    >
      <Video
        key={index}
        source={{
          uri: `https://app.neuronautica.com/storage/${id}/video/${num}.mp4`,
        }}
        style={{
          width: "100%",
          maxWidth: "100%",
          aspectRatio: 9 / 16,
          borderRadius: 6,
          marginVertical: 3,
        }}
        ref={videoRef}
        useNativeControls
        resizeMode={ResizeMode.COVER}
        posterSource={{
          uri: `https://app.neuronautica.com/storage/${id}/video/posters/${num}.jpg`,
        }}
        onPlaybackStatusUpdate={(status) => {
          if ("isPlaying" in status) {
            setIsPlaying(status.isPlaying);
          }
        }}
      />
      {!isPlaying && (
        <Pressable
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: [{ translateX: -34 }, { translateY: -34 }],
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: 50,
            width: 68,
            height: 68,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={handlePlay}
        >
          <Ionicons name="play" size={40} color="white" />
        </Pressable>
      )}
    </View>
  )
}