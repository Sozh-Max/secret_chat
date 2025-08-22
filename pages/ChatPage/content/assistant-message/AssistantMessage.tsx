import { View, Text, Image, Pressable, Modal } from 'react-native';
import { ResizeMode, Video } from 'expo-av';

import { IDialogItem } from '@/contexts/GlobalContext';
import { IconResponse } from '@/components/icons/IconResponse';
import { AGENT_KEYS } from '@/constants/agents-data';
import { styles } from '@/pages/ChatPage/content/assistant-message/styles';
import { useState } from 'react';

export const AssistantMessage = ({
  dialog,
  id,
}: {
  dialog: IDialogItem;
  id: AGENT_KEYS;
}) => {
  const [activeUrl, setActiveUrl] = useState<string>('');
  const content = dialog.replic.content || "";

  const parts = content.split(/({{{(?:photo|video)_\d+}}})/g).filter(Boolean);

  const renderPart = (part: string, index: number) => {
    const match = part.match(/{{{(photo|video)_(\d+)}}}/);

    if (!match) {
      return (
        <Text key={index} style={styles.content}>
          {part.trim()}
        </Text>
      );
    }

    const type = match[1];
    const num = match[2].padStart(2, "0");

    if (type === "photo") {
      const url = `https://app.neuronautica.com/storage/${id}/video/posters/${num}.jpg`;
      return (
        <Pressable
          onPress={() => setActiveUrl(url)}
        >
          <Image
            key={index}
            source={{
              uri: url,
            }}
            style={{
              width: "100%",
              aspectRatio: 256 / 459,
              borderRadius: 6,
              marginVertical: 3,
            }}
            resizeMode="cover"
          />
        </Pressable>
      );
    }

    if (type === "video") {
      return (
        <Video
          key={index}
          source={{
            uri: `https://app.neuronautica.com/storage/${id}/video/${num}.mp4`,
          }}
          style={{
            width: "100%",
            maxWidth: "100%",
            aspectRatio: 9 / 16,
            borderRadius: 6,
            marginVertical: 3,
          }}
          useNativeControls
          resizeMode={ResizeMode.COVER}
          posterSource={{
            uri: `https://app.neuronautica.com/storage/${id}/video/posters/${num}.jpg`,
          }}
        />
      );
    }

    return null;
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <IconResponse />
          <Text style={styles.name}>{id}</Text>
          <Text style={styles.time}>{dialog.create}</Text>
        </View>
        <View style={{ gap: 4, flexWrap: "wrap" }}>
          {parts.map((part, index) => renderPart(part, index))}
        </View>
        {activeUrl && (
          <Modal
            visible={true}
            transparent={true}
            animationType="fade"
          >
            <Pressable style={styles.modalOverlay} onPress={() => setActiveUrl('')}>
              <Pressable
                style={styles.modalImageWrapper}
                onPress={(e) => {
                  e.isPropagationStopped();
                }}
              >
                <Image
                  source={activeUrl}
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