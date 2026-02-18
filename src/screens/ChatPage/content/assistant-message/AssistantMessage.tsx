import React, { useEffect, useMemo, useRef } from 'react';
import { Text, View, Animated } from 'react-native';

import { IDialogItem } from '@/src/contexts/GlobalContext';
import { IconResponse } from '@/src/components/icons/IconResponse';
import { AGENT_KEYS } from '@/src/constants/agents-data';
import { styles } from '@/src/screens/ChatPage/content/assistant-message/styles';
import { RenderParts } from '@/src/screens/ChatPage/content/assistant-message/content/render-parts/RenderParts';

import { DISMISS_ICON_COLOR, MAIN_ICON_COLOR } from '@/src/constants/Colors';
import { AnimatedPressBtn } from '@/src/components/AnimatedPressBtn/AnimatedPressBtn';
import { useComplaint } from '@/src/contexts/ComplaintContext';
import { IconComplaintFlag } from '@/src/components/icons/IconComplaintFlag';
import { getHoursAndMinutesFromMs } from '@/src/services/message-service';
import { ROLES } from '@/src/api/constants';
import { TypingDots } from '@/src/screens/ChatPage/content/assistant-message/content/tree-dots/ThreeDots';

type Props = {
  dialog: IDialogItem;
  id: AGENT_KEYS;
  isBlocked?: boolean;
  isComplaint?: boolean;
};

const AssistantMessageImpl = ({ dialog, id, isBlocked, isComplaint }: Props) => {
  const { activateComplaint } = useComplaint();

  const content = dialog.replic.content || '';

  // ---- Анимации
  const bubble = useRef(new Animated.Value(0)).current; // 0..1
  const typingOpacity = useRef(new Animated.Value(0)).current;

  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslateY = useRef(new Animated.Value(4)).current;

  // ✅ чтобы в dev/StrictMode эффекты не запускались дважды
  const didEnterBubble = useRef(false);
  const didEnterContent = useRef(false);

  useEffect(() => {
    if (didEnterBubble.current) return;
    didEnterBubble.current = true;

    Animated.timing(bubble, {
      toValue: 1,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [bubble]);

  useEffect(() => {
    if (dialog.replic.role === ROLES.TYPING) {
      typingOpacity.setValue(0);
      Animated.timing(typingOpacity, {
        toValue: 1,
        duration: 140,
        useNativeDriver: true,
      }).start();
      return;
    }

    if (!didEnterContent.current) {
      didEnterContent.current = true;

      contentOpacity.setValue(0);
      contentTranslateY.setValue(4);

      Animated.sequence([
        Animated.delay(40),
        Animated.parallel([
          Animated.timing(contentOpacity, {
            toValue: 1,
            duration: 140,
            useNativeDriver: true,
          }),
          Animated.timing(contentTranslateY, {
            toValue: 0,
            duration: 140,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    } else {
      contentOpacity.setValue(1);
      contentTranslateY.setValue(0);
    }
  }, [
    dialog.replic.role,
    typingOpacity,
    contentOpacity,
    contentTranslateY,
  ]);

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

  const contentAnimStyle = useMemo(() => {
    return {
      opacity: contentOpacity,
      transform: [{ translateY: contentTranslateY }],
    };
  }, [contentOpacity, contentTranslateY]);

  const isComplaintDisabled = !!isComplaint || !!isBlocked;

  const handlePressComplaint = () => {
    if (!isComplaintDisabled) {
      activateComplaint(id);
    }
  };

  return (
    <Animated.View style={[styles.wrapper, bubbleStyle]}>
      <View style={styles.container}>
        {dialog.replic.role === ROLES.TYPING ? (
          <Animated.View style={{ opacity: typingOpacity }}>
            <TypingDots />
          </Animated.View>
        ) : (
          <>
            <View style={styles.header}>
              <View style={styles.header_content}>
                <IconResponse />
                <Text style={styles.name}>{id}</Text>
                <Text style={styles.time}>
                  {getHoursAndMinutesFromMs(dialog.createTime)}
                </Text>
              </View>

              <AnimatedPressBtn
                style={styles.button_complaint}
                onPress={handlePressComplaint}
              >
                <IconComplaintFlag
                  color={isComplaintDisabled ? DISMISS_ICON_COLOR : MAIN_ICON_COLOR}
                />
              </AnimatedPressBtn>
            </View>

            <Animated.View style={contentAnimStyle}>
              <View style={{ gap: 4, flexWrap: 'wrap' }}>
                <RenderParts part={content} id={id} />
              </View>
            </Animated.View>
          </>
        )}
      </View>
    </Animated.View>
  );
};

export const AssistantMessage = React.memo(AssistantMessageImpl, (prev, next) => {
  return (
    prev.id === next.id &&
    prev.isBlocked === next.isBlocked &&
    prev.isComplaint === next.isComplaint &&
    prev.dialog.msgId === next.dialog.msgId &&
    prev.dialog.replic.role === next.dialog.replic.role &&
    prev.dialog.replic.content === next.dialog.replic.content &&
    prev.dialog.replic.image === next.dialog.replic.image
  );
});
