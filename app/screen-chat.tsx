import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import HeaderChat from '@/components/HeaderChat/HeaderChat';
import { AGENT_KEYS, IMG_POSTER_MAP } from '@/constants/AgentsData';
import { ImageBackground } from 'expo-image';
import ChatInput from '@/components/ChatInput/ChatInput';

const screenHeight = Dimensions.get('window').height;

export default function ScreenChat() {
  const { id } = useLocalSearchParams<{ id: AGENT_KEYS }>();

  useEffect(() => {
    if (!id) {
      router.push('/');
    }
  }, [id]);

  return (
    <LinearGradient
      colors={['rgb(5, 4, 4)', 'rgb(22, 22, 22)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.wrapper}
    >
      <HeaderChat
        id={id}
      />
      <ImageBackground
        source={IMG_POSTER_MAP[id]}
        style={styles.image_background}
      >
        <View>

        </View>
      </ImageBackground>
      <ChatInput id={id} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    height: screenHeight,
  },
  image_background: {
    flexDirection: 'column',
    flexGrow: 1,
  },
});
