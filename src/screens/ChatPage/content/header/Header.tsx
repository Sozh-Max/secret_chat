import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { useRef, useState } from 'react';

import { IconBackBtn } from '@/src/components/icons/IconBackBtn';
import { IMG_THUMB_MAP } from '@/src/constants/agents-data';
import { IconRemove } from '@/src/components/icons/IconRemove';
import { ThemedText } from '@/src/components/ThemedText';
import { IdTypeProps } from '@/src/interfaces/global';
import { styles } from '@/src/screens/ChatPage/content/header/styles';
import { useGlobal } from '@/src/contexts/GlobalContext';
import { AnimatedPressBtn } from '@/src/components/AnimatedPressBtn/AnimatedPressBtn';
import { DISMISS_ICON_COLOR, MAIN_ICON_COLOR, SUB_MAIN_ICON_COLOR } from '@/src/constants/Colors';
import { IconComplaint } from '@/src/components/icons/IconComplaint';
import { useComplaint } from '@/src/contexts/ComplaintContext';
import { useUser } from '@/src/contexts/UserContext';
import { useApi } from '@/src/contexts/ApiContext';
import StarIcon from '@/assets/images/svg/star_icon.svg';
import IconVerified from '@/src/components/icons/IconVerify';
import { IconBlock } from '@/src/components/icons/IconBlock';

const Header = ({
  id,
}: IdTypeProps) => {
  const [isShowNotice, setShowNotice] = useState(false);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout>  | null>(null);
  const { setDialogs, dialogs, setLastMsgGlobalId } = useGlobal();
  const { activateComplaint } = useComplaint();
  const { userId } = useUser();
  const { api, messageService } = useApi();

  const dialog = dialogs[id];

  const isActiveRemove = Boolean(dialog?.dialog.length) && !dialog?.isBlocked;
  const isActiveComplaint = Boolean(dialog?.dialog.length) && !dialog?.isComplaint;

  const handlePressBackBtn = () => {
    setTimeout(() => {
      router.push('/');
    }, 50);
  };

  const handleComplaint = () => {
    if (isActiveComplaint && id) {
      activateComplaint(id);
    }
  }

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

  const handleRemoveHistory = async () => {
    try {
      if (isActiveComplaint) {
        setShowNotice(false);
        const data = await api.removeDialog({
          userId,
          assistantId: id,
        });
        if (data?.lastMsgGlobalId) {
          setLastMsgGlobalId(data.lastMsgGlobalId);
          messageService.removeHistoryById({
            id,
            setDialogs,
            lastMsgId: data?.lastMsgId || 0,
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.wrapper}>
      <AnimatedPressBtn
        style={styles.button}
        onPress={handlePressBackBtn}
      >
        <IconBackBtn color={SUB_MAIN_ICON_COLOR} />
      </AnimatedPressBtn>

      <Image
        source={IMG_THUMB_MAP[id]}
        style={styles.img}
      />
      <View style={styles.info}>
        <View style={styles.label_container}>
          <ThemedText style={styles.label}>{id}</ThemedText>
          <View style={styles.badges}>
            {(dialog?.isBlocked || dialog?.isComplaint) && <IconBlock />}
            {dialog?.verified && <IconVerified size={18} />}
          </View>
        </View>
        <View style={styles.rating}>
          <StarIcon width={14} height={14} />
          <Text style={styles.rating_value}>{dialog?.cost || 0}</Text>
        </View>
      </View>

      {isShowNotice && isActiveComplaint
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
            style={styles.button_mini}
            onPress={handlePressClear}
          >
            <IconRemove color={isActiveRemove && isActiveComplaint ? MAIN_ICON_COLOR : DISMISS_ICON_COLOR}/>
          </AnimatedPressBtn>
        )}

      <AnimatedPressBtn
        style={styles.button_mini}
        onPress={handleComplaint}
      >
        <IconComplaint color={isActiveComplaint ? MAIN_ICON_COLOR : DISMISS_ICON_COLOR}/>
      </AnimatedPressBtn>
    </View>
  );
};

export default Header;
