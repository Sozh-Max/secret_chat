import { View, Text, Image } from "react-native";
import { ResizeMode, Video } from 'expo-av';

import { IDialogItem } from '@/contexts/GlobalContext';
import { IconResponse } from '@/components/icons/IconResponse';
import { AGENT_KEYS } from '@/constants/agents-data';
import { styles } from '@/pages/ChatPage/content/assistant-message/styles';

export const AssistantMessage = ({
  dialog,
  id,
}: {
  dialog: IDialogItem;
  id: AGENT_KEYS;
}) => {
  const content = dialog.replic.content || "";

  const parts = content.split(/({{{(?:photo|video)_\d+}}})/g).filter(Boolean);

  const renderPart = (part: string, index: number) => {
    const match = part.match(/{{{(photo|video)_(\d+)}}}/);

    if (!match) {
      // обычный текст
      return (
        <Text key={index} style={styles.content}>
          {part.trim()}
        </Text>
      );
    }

    const type = match[1];
    const num = match[2].padStart(2, "0");

    if (type === "photo") {
      return (
        <Image
          key={index}
          source={{
            uri: `https://app.neuronautica.com/storage/${id}/video/posters/${num}.jpg`,
          }}
          style={{
            width: "100%",
            aspectRatio: 256 / 459,
            borderRadius: 6,
            marginVertical: 3,
          }}
          resizeMode="cover"
        />
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
      </View>
    </View>
  );
};