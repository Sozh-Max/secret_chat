import { View, Text, Pressable, Modal } from 'react-native';
import { Image } from 'expo-image';
import { useState } from 'react';

import { IdTypeProps } from '@/interfaces/global';
import { styles } from '@/pages/ChatPage/content/system-message/styles';
import { IconSystem } from '@/components/icons/IconSystem';
import { AGENTS_DATA, IMG_PREVIEW_MAP } from '@/constants/agents-data';

export const SystemMessage = ({
  id,
}: IdTypeProps) => {
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
          {description}
        </Text>
        <Pressable onPress={() => setModalVisible(true)}>
          <Image
            source={IMG_PREVIEW_MAP[id]}
            style={styles.img}
          />
        </Pressable>

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
      </View>
    </View>
  );
};