import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { IconBackBtn } from '@/components/icons/IconBackBtn';
import { AGENT_KEYS, IMG_THUMB_MAP } from '@/constants/agents-data';
import { Image } from 'expo-image';
import { IconRemove } from '@/components/icons/IconRemove';
import { IconRating } from '@/components/icons/IconRating';
import { ThemedText } from '@/components/ThemedText';
import { IdTypeProps } from '@/interfaces/global';
import { styles } from '@/pages/ChatPage/content/header/styles';
import { useRef, useState } from 'react';
import { messageService } from '@/services/message-service';
import { useGlobal } from '@/contexts/GlobalContext';
import { AnimatedPressBtn } from '@/components/AnimatedPressBtn/AnimatedPressBtn';

const Header = ({
  id,
}: IdTypeProps) => {
  const [isShowNotice, setShowNotice] = useState(false);
  const timeoutIdRef = useRef<number | null>(null);
  const { setDialogs } = useGlobal();

  const handlePressBackBtn = () => {
    router.push('/');
  };

  const handlePressClear = () => {
    setShowNotice(true);

    if (timeoutIdRef.current !== null) {
      clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = setTimeout(() => {
      setShowNotice(false);
    }, 3500);
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
      <Pressable
        style={styles.button}
        onPress={handlePressBackBtn}
      >
        <IconBackBtn/>
      </Pressable>

      {/*<View*/}
      {/*  style={styles.container}*/}
      {/*>*/}
      <Image
        source={IMG_THUMB_MAP[id]}
        style={styles.img}
      />
      <View style={styles.info}>
        <ThemedText style={styles.label}>{id}</ThemedText>
        <View style={styles.rating}>
          <IconRating/>
          <Text style={styles.rating_value}>{id === AGENT_KEYS.ashley ? 25 : 10}</Text>
        </View>
      </View>
      {/*</View>*/}

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
            <IconRemove/>
          </AnimatedPressBtn>
        )}
    </View>
  );
};

export default Header;
