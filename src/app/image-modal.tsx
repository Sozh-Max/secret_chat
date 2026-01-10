// app/image-modal.tsx
import { Image, Pressable, View, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import { AGENT_KEYS, IMG_PREVIEW_MAP } from '@/src/constants/agents-data';
import { PLATFORM } from '@/src/services/constants';

export default function ImageModal() {
  const router = useRouter();
  const { url, sourceId } = useLocalSearchParams<{ url: string, sourceId: AGENT_KEYS }>();

  useEffect(() => {
    if (Platform.OS === PLATFORM.ANDROID) {
      NavigationBar.setBackgroundColorAsync('#000000');
      NavigationBar.setButtonStyleAsync('light');
    }
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)' }}>
      <Pressable
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => router.back()}
      >
        <View
          style={{
            width: '90%',
            aspectRatio: sourceId ? 1 : 256 / 459,
            overflow: 'hidden',
          }}
        >
          <Image
            source={sourceId ? IMG_PREVIEW_MAP[sourceId] : { uri: url }}
            style={{
              flex: 1,
              width: "100%",
              aspectRatio: sourceId ? 1 : 256 / 459,
              borderRadius: 10,
            }}
            resizeMode="contain"
          />
        </View>
      </Pressable>
    </View>
  );
}