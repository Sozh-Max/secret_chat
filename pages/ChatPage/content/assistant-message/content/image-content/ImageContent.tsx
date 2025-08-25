import { Image, Modal, Pressable } from 'react-native';
import { useState } from 'react';
import { styles } from '@/pages/ChatPage/content/assistant-message/content/image-content/styles';

export const ImageContent = ({
  id,
  num,
}: {
  id: string;
  num: string;
}) => {
  const [activeUrl, setActiveUrl] = useState<string>('');
  const url = `https://app.neuronautica.com/storage/${id}/photo/${num}.jpg`;

  return (
    <>
      <Pressable
        onPress={() => setActiveUrl(url)}
        style={styles.imageWrapper}
      >
        <Image
          source={{
            uri: url,
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </Pressable>
      {activeUrl && (
        <Modal
          visible={Boolean(activeUrl)}
          transparent
          animationType="fade"
        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setActiveUrl('')}
          >
            <Pressable onPress={() => {}} style={styles.modalImageWrapper}>
              <Image
                source={{ uri: activeUrl }}
                style={styles.modalImage}
                resizeMode="contain"
              />
            </Pressable>
          </Pressable>
        </Modal>
      )}
    </>
  )
}