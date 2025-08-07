import { View, Text } from 'react-native';
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
}) => (
  <View style={styles.wrapper}>
    <View style={styles.container}>
      <View style={styles.header}>
        <IconResponse/>
        <Text style={styles.name}>{id}</Text>
        <Text style={styles.time}>{dialog.create}</Text>
      </View>
      <Text style={styles.content}>{dialog.replic.content}</Text>
    </View>
  </View>
);