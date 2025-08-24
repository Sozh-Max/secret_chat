import { View, Text, Image, Pressable, Modal } from 'react-native';

import { IDialogItem } from '@/contexts/GlobalContext';
import { IconResponse } from '@/components/icons/IconResponse';
import { AGENT_KEYS } from '@/constants/agents-data';
import { styles } from '@/pages/ChatPage/content/assistant-message/styles';
import { useState } from 'react';
import { VideoContent } from '@/pages/ChatPage/content/assistant-message/content/VideoContent';

export const AssistantMessage = ({
  dialog,
  id,
}: {
  dialog: IDialogItem;
  id: AGENT_KEYS;
}) => {
  const [activeUrl, setActiveUrl] = useState<string>('');
  const content = dialog.replic.content || "";

  const parts = content
    .split(/({{2,3}(?:photo|video)_\d+}{2,3})/g)
    .filter(Boolean);

  const renderPart = (part: string, index: number) => {
    const match = part.match(/{{2,3}(photo|video)_(\d+)}{2,3}/);

    if (!match) {
      return (
        <Text
          key={index}
          style={styles.content}
        >
          {part.trim()}
        </Text>
      );
    }

    const type = match[1];
    const num = match[2].padStart(2, "0");

    if (type === "photo") {
      const url = `https://app.neuronautica.com/storage/${id}/photo/${num}.jpg`;
      return (
        <Pressable
          onPress={() => setActiveUrl(url)}
          style={{
            paddingBottom: 'calc(100% * (1 / 0.557734))',
          }}
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
        <VideoContent
          id={id}
          num={num}
          index={index}
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
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setActiveUrl('')}
            >
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