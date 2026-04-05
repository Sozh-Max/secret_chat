import React, { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { EaseView } from 'react-native-ease';

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

const BUBBLE_DURATION = 180;
const CONTENT_DELAY = 40;
const CONTENT_DURATION = 140;
const TYPING_DURATION = 140;

const AssistantMessageImpl = ({ dialog, id, isBlocked, isComplaint }: Props) => {
  const { activateComplaint } = useComplaint();

  const content = dialog.replic.content || '';
  const isTyping = dialog.replic.role === ROLES.TYPING;
  const isComplaintDisabled = !!isComplaint || !!isBlocked;

  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [typingVisible, setTypingVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  const didStartBubble = useRef(false);
  const didShowContent = useRef(false);
  const delayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (didStartBubble.current) return;
    didStartBubble.current = true;

    setBubbleVisible(true);

    return () => {
      if (delayTimer.current) {
        clearTimeout(delayTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    if (delayTimer.current) {
      clearTimeout(delayTimer.current);
      delayTimer.current = null;
    }

    if (isTyping) {
      setTypingVisible(true);
      setContentVisible(false);
      return;
    }

    setTypingVisible(false);

    if (!didShowContent.current) {
      delayTimer.current = setTimeout(() => {
        didShowContent.current = true;
        setContentVisible(true);
      }, CONTENT_DELAY);
    } else {
      setContentVisible(true);
    }

    return () => {
      if (delayTimer.current) {
        clearTimeout(delayTimer.current);
      }
    };
  }, [isTyping]);

  const handlePressComplaint = () => {
    if (!isComplaintDisabled) {
      activateComplaint(id);
    }
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
    >
      <View style={styles.container}>
        {isTyping ? (
          <EaseView
            initialAnimate={{ opacity: 0 }}
            animate={{ opacity: typingVisible ? 1 : 0 }}
            transition={{
              type: 'timing',
              duration: TYPING_DURATION,
              easing: 'easeOut',
            }}
          >
            <TypingDots />
          </EaseView>
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

            <EaseView
              initialAnimate={{
                opacity: 0,
                translateY: 4,
              }}
              animate={{
                opacity: contentVisible ? 1 : 0,
                translateY: contentVisible ? 0 : 4,
              }}
              transition={{
                type: 'timing',
                duration: CONTENT_DURATION,
                easing: 'easeOut',
              }}
            >
              <View style={{ gap: 4, flexWrap: 'wrap' }}>
                <RenderParts part={content} id={id} />
              </View>
            </EaseView>
          </>
        )}
      </View>
    </EaseView>
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