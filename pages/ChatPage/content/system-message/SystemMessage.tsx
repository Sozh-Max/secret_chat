import { View, Text, Pressable, Modal } from 'react-native';
import { Image } from 'expo-image';
import { useState } from 'react';

import { IdTypeProps } from '@/interfaces/global';
import { styles } from '@/pages/ChatPage/content/system-message/styles';
import { IconSystem } from '@/components/icons/IconSystem';
import { IMG_PREVIEW_MAP } from '@/constants/agents-data';


interface SystemMessageType extends IdTypeProps {
  message?: string;
  isImage?: boolean;
}

export const SystemMessage = ({
  id,
  message,
  isImage = false,
}: SystemMessageType) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>

        <View style={styles.header}>
          <IconSystem/>
          <Text style={styles.title}>System</Text>
        </View>
        {Boolean(message) && (
          <Text style={styles.text}>
            {message}
          </Text>
        )}

        {isImage && (
          <Pressable onPress={() => setModalVisible(true)}>
            <Image
              source={IMG_PREVIEW_MAP[id]}
              style={styles.img}
            />
          </Pressable>
        )}

        {isImage && (
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