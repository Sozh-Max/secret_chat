// app/image-modal.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, View, Platform, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';
import { AGENT_KEYS } from '@/src/constants/agents-data';
import { PLATFORM } from '@/src/services/constants';
import Constants from 'expo-constants';
import { ChatMediaSkeleton } from '@/src/components/ChatMediaSkeleton/ChatMediaSkeleton';

type Size = { w: number; h: number };

const STORAGE_URL = Constants.expoConfig?.extra?.STORAGE_URL;

function fitIntoBox(img: Size, box: Size): Size {
  if (!img.w || !img.h) return { w: box.w, h: box.h };

  const scale = Math.min(box.w / img.w, box.h / img.h);

  return {
    w: Math.floor(img.w * scale),
    h: Math.floor(img.h * scale),
  };
}

export default function ImageModal() {
  const router = useRouter();
  const { url, sourceId } = useLocalSearchParams<{ url: string; sourceId: AGENT_KEYS }>();

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hasImageError, setHasImageError] = useState(false);

  const { width: screenW, height: screenH } = useWindowDimensions();

  const [imgSize, setImgSize] = useState<Size | null>(null);

  useEffect(() => {
    if (Platform.OS === PLATFORM.ANDROID) {
      NavigationBar.setBackgroundColorAsync('#000000');
      NavigationBar.setButtonStyleAsync('light');
    }
  }, []);

  useEffect(() => {
    setImgSize(null);
  }, [url, sourceId]);

  const maxBox = useMemo(
    () => ({ w: screenW * 0.9, h: screenH * 0.9 }),
    [screenW, screenH]
  );

  const fitted = useMemo(() => {
    if (!imgSize) {
      const side = Math.min(maxBox.w, maxBox.h);
      return { w: side, h: side };
    }
    return fitIntoBox(imgSize, maxBox);
  }, [imgSize, maxBox]);

  const handleLoad = (e: any) => {
    setIsImageLoaded(true);
    const { width, height } = e?.nativeEvent?.source ?? {};
    if (width && height) setImgSize({ w: width, h: height });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)' }}>
      <Pressable
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        onPress={() => router.back()}
      >
        <View
          style={{
            width: fitted.w,
            height: fitted.h,
            borderRadius: 10,
            overflow: 'hidden',
            backgroundColor: '#000',
          }}
        >
          {!isImageLoaded && <ChatMediaSkeleton style={{ width: '100%', height: '100%' }} />}
          {!hasImageError && (
            <Image
              source={sourceId ? `${STORAGE_URL}/${sourceId}/preview.jpg` : url}
              onLoad={handleLoad}
              style={{ width: '100%', height: '100%' }}
              contentFit="contain"
              cachePolicy="disk"
              onError={() => setHasImageError(true)}
            />
          )}
        </View>
      </Pressable>
    </View>
  );
}
