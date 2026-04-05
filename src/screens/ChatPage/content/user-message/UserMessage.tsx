import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, Image as RNImage, Pressable, StyleProp, ViewStyle } from 'react-native';
import { EaseView } from 'react-native-ease';
import { ImageStyle } from 'expo-image';

import { IDialogItem } from '@/src/contexts/GlobalContext';
import { styles } from '@/src/screens/ChatPage/content/user-message/styles';
import { IconResponse } from '@/src/components/icons/IconResponse';
import { getHoursAndMinutesFromMs } from '@/src/services/message-service';
import { router } from 'expo-router';
import { SkeletonBlock } from '@/src/components/skeleton-block/SkeletonBlock';

type Props = {
  dialog: IDialogItem;
  shouldAnimateContent?: boolean;
};

type MediaBoxStyle = {
  width: '100%';
  height?: number;
  aspectRatio?: number;
};

const BUBBLE_DURATION = 180;
const TEXT_DELAY = 40;
const TEXT_DURATION = 140;

const UserMessageImpl = ({
  dialog,
  shouldAnimateContent = true,
}: Props) => {
  const url = dialog.replic.image;

  const [imgRatio, setImgRatio] = useState<number | null>(null);

  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(!shouldAnimateContent);

  const didStart = useRef(false);
  const didAnimateText = useRef(!shouldAnimateContent);
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
    if (!shouldAnimateContent) {
      if (textDelayTimer.current) {
        clearTimeout(textDelayTimer.current);
        textDelayTimer.current = null;
      }

      didAnimateText.current = true;
      setTextVisible(true);
    }
  }, [shouldAnimateContent]);

  useEffect(() => {
    if (!url) {
      setImgRatio(null);
      return;
    }

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

  const containerStyle = useMemo<StyleProp<ViewStyle>>(
    () => [mediaBoxStyle],
    [mediaBoxStyle]
  );

  const skeletonStyle = useMemo<StyleProp<ViewStyle>>(
    () => [mediaBoxStyle, { borderRadius: 8 }],
    [mediaBoxStyle]
  );

  const imageStyle = useMemo<StyleProp<ImageStyle>>(
    () => [styles.image, mediaBoxStyle],
    [mediaBoxStyle]
  );

  const handlePressable = () => {
    if (!url) return;

    router.push({
      pathname: '/image-modal',
      params: { url },
    });
  };

  const handleBubbleTransitionEnd = ({ finished }: { finished: boolean }) => {
    if (!finished || didAnimateText.current || !shouldAnimateContent) return;

    textDelayTimer.current = setTimeout(() => {
      didAnimateText.current = true;
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
              containerStyle={containerStyle}
              skeletonStyle={skeletonStyle}
              imageStyle={imageStyle}
            />
          </Pressable>
        )}

        <EaseView
          initialAnimate={{
            opacity: shouldAnimateContent ? 0 : 1,
            translateY: shouldAnimateContent ? 4 : 0,
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
    prev.dialog.replic.image === next.dialog.replic.image &&
    prev.shouldAnimateContent === next.shouldAnimateContent
  );
});