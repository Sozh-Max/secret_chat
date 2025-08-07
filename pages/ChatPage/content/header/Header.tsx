import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { useRef, useState } from 'react';

import { IconBackBtn } from '@/components/icons/IconBackBtn';
import { IMG_THUMB_MAP } from '@/constants/agents-data';
import { IconRemove } from '@/components/icons/IconRemove';
import { IconRating } from '@/components/icons/IconRating';
import { ThemedText } from '@/components/ThemedText';
import { IdTypeProps } from '@/interfaces/global';
import { styles } from '@/pages/ChatPage/content/header/styles';
import { messageService } from '@/services/message-service';
import { useGlobal } from '@/contexts/GlobalContext';
import { AnimatedPressBtn } from '@/components/AnimatedPressBtn/AnimatedPressBtn';
import { LOW_COLOR, MAIN_COLOR } from '@/constants/Colors';

const Header = ({
  id,
}: IdTypeProps) => {
  const [isShowNotice, setShowNotice] = useState(false);
  const timeoutIdRef = useRef<number | null>(null);
  const { setDialogs, dialogs } = useGlobal();

  const dialog = dialogs[id];

  const isActiveRemove = Boolean(dialog?.dialog.length) && !dialog?.isBlocked;

  const handlePressBackBtn = () => {
    setTimeout(() => {
      router.push('/');
    }, 300);
  };

  const handlePressClear = () => {
    if (isActiveRemove) {
      setTimeout(() => {
        setShowNotice(true);

        if (timeoutIdRef.current !== null) {
          clearTimeout(timeoutIdRef.current);
        }

        timeoutIdRef.current = setTimeout(() => {
          setShowNotice(false);
        }, 3500);
      }, 300);
    }
  };

  const handleRemoveHistory = () => {
    setShowNotice(false);
    messageService.removeHistoryById({
      id,
      setDialogs,
    });
  };

  return (
    <View style={styles.wrapper}>
      <AnimatedPressBtn
        style={styles.button}
        onPress={handlePressBackBtn}
      >
        <IconBackBtn/>
      </AnimatedPressBtn>

      <Image
        source={IMG_THUMB_MAP[id]}
        style={styles.img}
      />
      <View style={styles.info}>
        <ThemedText style={styles.label}>{id}</ThemedText>
        <View style={styles.rating}>
          <IconRating/>
          <Text style={styles.rating_value}>{dialog?.cost || 0}</Text>
        </View>
      </View>

      {isShowNotice
        ? (
          <Pressable
            style={styles.button_clear}
            onPress={handleRemoveHistory}
          >
            <View style={styles.button_clear_notice}>
              <Text style={styles.text_clear}>Sure?</Text>
            </View>
          </Pressable>
        )
        : (
          <AnimatedPressBtn
            style={styles.button}
            onPress={handlePressClear}
          >
            <IconRemove color={isActiveRemove ? MAIN_COLOR : LOW_COLOR}/>
          </AnimatedPressBtn>
        )}
    </View>
  );
};

export default Header;
