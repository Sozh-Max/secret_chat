import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, Image, Pressable, Animated } from 'react-native';
import { IDialogItem } from '@/src/contexts/GlobalContext';
import { styles } from '@/src/screens/ChatPage/content/user-message/styles';
import { IconResponse } from '@/src/components/icons/IconResponse';
import { getHoursAndMinutesFromMs } from '@/src/services/message-service';
import { router } from 'expo-router';

const UserMessageImpl = ({ dialog }: { dialog: IDialogItem }) => {
  const url = dialog.replic.image;

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

  // ---- Размер картинки (как у вас)
  const [imgRatio, setImgRatio] = useState<number | null>(null); // width/height

  useEffect(() => {
    if (!url) return;

    Image.getSize(
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
            onPress={() =>
              router.push({
                pathname: '/image-modal',
                params: { url },
              })
            }
            style={styles.imagePressable}
          >
            <Image
              source={{ uri: url }}
              // @ts-ignore
              style={imageStyle}
              resizeMode="contain"
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
