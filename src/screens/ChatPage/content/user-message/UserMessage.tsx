import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, Image as RNImage, Pressable, Animated } from 'react-native';
import { Image } from 'expo-image';
import { IDialogItem } from '@/src/contexts/GlobalContext';
import { styles } from '@/src/screens/ChatPage/content/user-message/styles';
import { IconResponse } from '@/src/components/icons/IconResponse';
import { getHoursAndMinutesFromMs } from '@/src/services/message-service';
import { router } from 'expo-router';
import { ChatMediaSkeleton } from '@/src/components/ChatMediaSkeleton/ChatMediaSkeleton';

const UserMessageImpl = ({ dialog }: { dialog: IDialogItem }) => {
  const url = dialog.replic.image;
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hasImageError, setHasImageError] = useState(false);

  // ---- Анимация: сначала bubble fade/slide, потом текст
  const bubble = useRef(new Animated.Value(0)).current; // 0..1
  const text = useRef(new Animated.Value(0)).current;   // 0..1
  const didAnimate = useRef(false); // ✅ чтобы в dev/StrictMode не дергалось дважды

  useEffect(() => {
    if (didAnimate.current) return;
    didAnimate.current = true;

    Animated.sequence([
      Animated.timing(bubble, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.delay(40),
      Animated.timing(text, {
        toValue: 1,
        duration: 140,
        useNativeDriver: true,
      }),
    ]).start();
  }, [bubble, text]);

  const [imgRatio, setImgRatio] = useState<number | null>(null); // width/height

  useEffect(() => {
    if (!url) return;
    setIsImageLoaded(false);
    setHasImageError(false);

    RNImage.getSize(
      url,
      (w, h) => {
        if (w > 0 && h > 0) setImgRatio(w / h);
      },
      () => setImgRatio(null)
    );
  }, [url]);

  const imageStyle = useMemo(() => {
    if (!imgRatio) return [styles.image, { width: '100%', height: 220 }];
    return [styles.image, { width: '100%', aspectRatio: imgRatio }];
  }, [imgRatio]);

  const bubbleStyle = useMemo(() => {
    const opacity = bubble;

    const translateY = bubble.interpolate({
      inputRange: [0, 1],
      outputRange: [6, 0],
    });

    const scale = bubble.interpolate({
      inputRange: [0, 1],
      outputRange: [0.985, 1],
    });

    return {
      opacity,
      transform: [{ translateY }, { scale }],
    };
  }, [bubble]);

  const textStyle = useMemo(() => {
    const opacity = text;

    const translateY = text.interpolate({
      inputRange: [0, 1],
      outputRange: [4, 0],
    });

    return {
      opacity,
      transform: [{ translateY }],
    };
  }, [text]);

  const handlePressable = () => {
    if (!hasImageError) {
      router.push({
        pathname: '/image-modal',
        params: { url },
      })
    }
  }

  return (
    <Animated.View style={[styles.wrapper, bubbleStyle]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.name}>You</Text>
          <Text style={styles.time}>{getHoursAndMinutesFromMs(dialog.createTime)}</Text>
          <View style={styles.iconWrap}>
            <IconResponse />
          </View>
        </View>

        {url && (
          <Pressable
            onPress={handlePressable}
            style={styles.imagePressable}
          >
            {!isImageLoaded && (
              <ChatMediaSkeleton
                style={imgRatio ? { width: '100%', aspectRatio: imgRatio, borderRadius: 8 } : styles.imageSkeleton}
              />
            )}
            <Image
              source={hasImageError ? null : url}
              style={hasImageError ? styles.imageHidden : imageStyle}
              contentFit="contain"
              cachePolicy="disk"
              onLoad={() => setIsImageLoaded(true)}
              onError={() => setHasImageError(true)}
            />
          </Pressable>
        )}

        <Animated.View style={textStyle}>
          <Text style={styles.content}>{dialog.replic.content}</Text>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

export const UserMessage = React.memo(UserMessageImpl, (prev, next) => {
  // ✅ не даём старым сообщениям перерисовываться без причины
  return (
    prev.dialog.msgId === next.dialog.msgId &&
    prev.dialog.replic.content === next.dialog.replic.content &&
    prev.dialog.replic.image === next.dialog.replic.image
  );
});
