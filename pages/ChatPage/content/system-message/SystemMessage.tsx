import { View, Text, Pressable, Modal } from 'react-native';
import { Image } from 'expo-image';
import { useState } from 'react';

import { IdTypeProps } from '@/interfaces/global';
import { styles } from '@/pages/ChatPage/content/system-message/styles';
import { IconSystem } from '@/components/icons/IconSystem';
import { AGENTS_DATA, IMG_PREVIEW_MAP } from '@/constants/agents-data';

const BLOCKED_TEXT = "Uh oh! Something messed up. Looks like this person has blocked you. We're saving this chat and sending it to our moderators. Just a reminder that our rules don't allow talking about violence, drugs, or suicide, and doing so could get your account totally banned.";

interface SystemMessage extends IdTypeProps {
  isBlocked?: boolean
}

export const SystemMessage = ({
  id,
  isBlocked = false,
}: SystemMessage) => {
  const description = AGENTS_DATA[id];
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>

        <View style={styles.header}>
          <IconSystem/>
          <Text style={styles.title}>System</Text>
        </View>

        <Text style={styles.text}>
          {isBlocked ? BLOCKED_TEXT : description}
        </Text>

        {!isBlocked && (
          <Pressable onPress={() => setModalVisible(true)}>
            <Image
              source={IMG_PREVIEW_MAP[id]}
              style={styles.img}
            />
          </Pressable>
        )}

        {!isBlocked && (
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="fade"
          >
            <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
              <Pressable
                style={styles.modalImageWrapper}
                onPress={(e) => {
                  e.isPropagationStopped();
                }}
              >
                <Image
                  source={IMG_PREVIEW_MAP[id]}
                  style={styles.modalImage}
                  contentFit="contain"
                />
              </Pressable>
            </Pressable>
          </Modal>
        )}
      </View>
    </View>
  );
};