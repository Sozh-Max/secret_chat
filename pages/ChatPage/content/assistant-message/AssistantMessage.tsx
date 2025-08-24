import { View, Text } from 'react-native';

import { IDialogItem } from '@/contexts/GlobalContext';
import { IconResponse } from '@/components/icons/IconResponse';
import { AGENT_KEYS } from '@/constants/agents-data';
import { styles } from '@/pages/ChatPage/content/assistant-message/styles';
import { RenderParts } from '@/pages/ChatPage/content/assistant-message/content/render-parts/RenderParts';

export const AssistantMessage = ({
  dialog,
  id,
}: {
  dialog: IDialogItem;
  id: AGENT_KEYS;
}) => {
  const content = dialog.replic.content || "";

  const parts = content
    .split(/({{2,3}(?:photo|video)_\d+}{2,3})/g)
    .filter(Boolean);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <IconResponse />
          <Text style={styles.name}>{id}</Text>
          <Text style={styles.time}>{dialog.create}</Text>
        </View>
        <View style={{ gap: 4, flexWrap: "wrap" }}>
          {parts.map((part, index) => (
            <RenderParts
              key={index}
              part={part}
              id={id}
              index={index}
            />
          ))}
        </View>
      </View>
    </View>
  );
};