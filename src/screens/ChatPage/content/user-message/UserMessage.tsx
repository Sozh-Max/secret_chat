import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, Image as RNImage, Pressable, ViewStyle, StyleProp } from 'react-native';
import { EaseView } from 'react-native-ease';

import { IDialogItem } from '@/src/contexts/GlobalContext';
import { styles } from '@/src/screens/ChatPage/content/user-message/styles';
import { IconResponse } from '@/src/components/icons/IconResponse';
import { getHoursAndMinutesFromMs } from '@/src/services/message-service';
import { router } from 'expo-router';
import { SkeletonBlock } from '@/src/components/skeleton-block/SkeletonBlock';
import { ImageStyle } from 'expo-image';

const BUBBLE_DURATION = 50;
const TEXT_DELAY = 30;
const TEXT_DURATION = 50;

type MediaBoxStyle = {
  width: '100%';
  height?: number;
  aspectRatio?: number;
};

const UserMessageImpl = ({ dialog }: { dialog: IDialogItem }) => {
  const url = dialog.replic.image;

  // const [isImageLoaded, setIsImageLoaded] = useState(false);
  // const [hasImageError, setHasImageError] = useState(false);
  const [imgRatio, setImgRatio] = useState<number | null>(null);

  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  const didStart = useRef(false);
  const textDelayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (didStart.current) return;
    didStart.current = true;

    setBubbleVisible(true);

    return () => {
      if (textDelayTimer.current) {
        clearTimeout(textDelayTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!url) {
      setImgRatio(null);
      // setIsImageLoaded(false);
      // setHasImageError(false);
      return;
    }
    //
    // setIsImageLoaded(false);
    // setHasImageError(false);

    RNImage.getSize(
      url,
      (width, height) => {
        if (width > 0 && height > 0) {
          setImgRatio(width / height);
        } else {
          setImgRatio(null);
        }
      },
      () => setImgRatio(null)
    );
  }, [url]);

  const mediaBoxStyle = useMemo<MediaBoxStyle>(() => {
    if (!imgRatio) {
      return {
        width: '100%',
        height: 220,
      };
    }

    return {
      width: '100%',
      aspectRatio: imgRatio,
    };
  }, [imgRatio]);

  const skeletonStyle = useMemo<StyleProp<ViewStyle>>(() => {
    return [
      mediaBoxStyle,
      { borderRadius: 8 },
    ];
  }, [mediaBoxStyle]);

  const imageStyle = useMemo<StyleProp<ImageStyle>>(() => {
    return [
      styles.image,
      mediaBoxStyle,
    ];
  }, [mediaBoxStyle]);

  const handlePressable = () => {
    if (!url) return;

    router.push({
      pathname: '/image-modal',
      params: { url },
    });
  };

  const handleBubbleTransitionEnd = ({ finished }: { finished: boolean }) => {
    if (!finished || textVisible) return;

    textDelayTimer.current = setTimeout(() => {
      setTextVisible(true);
    }, TEXT_DELAY);
  };

  return (
    <EaseView
      style={styles.wrapper}
      initialAnimate={{
        opacity: 0,
        translateY: 6,
        scaleX: 0.985,
        scaleY: 0.985,
      }}
      animate={{
        opacity: bubbleVisible ? 1 : 0,
        translateY: bubbleVisible ? 0 : 6,
        scaleX: bubbleVisible ? 1 : 0.985,
        scaleY: bubbleVisible ? 1 : 0.985,
      }}
      transition={{
        type: 'timing',
        duration: BUBBLE_DURATION,
        easing: 'easeOut',
      }}
      onTransitionEnd={handleBubbleTransitionEnd}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.name}>You</Text>
          <Text style={styles.time}>
            {getHoursAndMinutesFromMs(dialog.createTime)}
          </Text>
          <View style={styles.iconWrap}>
            <IconResponse />
          </View>
        </View>

        {url && (
          <Pressable onPress={handlePressable} style={styles.imagePressable}>
            <SkeletonBlock
              url={url}
              contentFit="contain"
              containerStyle={mediaBoxStyle}
              skeletonStyle={skeletonStyle}
              imageStyle={imageStyle}
            />
            {/*{!isImageLoaded && <ChatMediaSkeleton style={skeletonStyle} />}*/}

            {/*<Image*/}
            {/*  source={hasImageError ? null : url}*/}
            {/*  style={hasImageError ? styles.imageHidden : imageStyle}*/}
            {/*  contentFit="contain"*/}
            {/*  cachePolicy="disk"*/}
            {/*  onLoad={() => setIsImageLoaded(true)}*/}
            {/*  onError={() => setHasImageError(true)}*/}
            {/*/>*/}
          </Pressable>
        )}

        <EaseView
          initialAnimate={{
            opacity: 0,
            translateY: 4,
          }}
          animate={{
            opacity: textVisible ? 1 : 0,
            translateY: textVisible ? 0 : 4,
          }}
          transition={{
            type: 'timing',
            duration: TEXT_DURATION,
            easing: 'easeOut',
          }}
        >
          <Text style={styles.content}>{dialog.replic.content}</Text>
        </EaseView>
      </View>
    </EaseView>
  );
};

export const UserMessage = React.memo(UserMessageImpl, (prev, next) => {
  return (
    prev.dialog.msgId === next.dialog.msgId &&
    prev.dialog.replic.content === next.dialog.replic.content &&
    prev.dialog.replic.image === next.dialog.replic.image
  );
});