import { View, Text } from 'react-native';
import { IDialogItem } from '@/contexts/GlobalContext';
import { styles } from '@/pages/ChatPage/content/user-message/styles';
import { IconResponse } from '@/components/icons/IconResponse';

export const UserMessage = ({
  dialog
}: {
  dialog: IDialogItem;
}) => (
  <View style={styles.wrapper}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>You</Text>
        <Text style={styles.time}>{dialog.create}</Text>
        <IconResponse />
      </View>
      <Text style={styles.content}>{dialog.replic.content}</Text>
    </View>
  </View>
)
