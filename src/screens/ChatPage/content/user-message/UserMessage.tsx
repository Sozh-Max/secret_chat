import { View, Text, Image } from 'react-native';
import { IDialogItem } from '@/src/contexts/GlobalContext';
import { styles } from '@/src/screens/ChatPage/content/user-message/styles';
import { IconResponse } from '@/src/components/icons/IconResponse';
import { getHoursAndMinutesFromMs } from '@/src/services/message-service';

export const UserMessage = ({
  dialog
}: {
  dialog: IDialogItem;
}) => (
  <View style={styles.wrapper}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>You</Text>
        <Text style={styles.time}>{getHoursAndMinutesFromMs(dialog.createTime)}</Text>
        <View style={styles.iconWrap}>
          <IconResponse />
        </View>
      </View>
      <Text style={styles.content}>{dialog.replic.content}</Text>
      {dialog.replic.imageUrl && (
        <Image
          source={{
            uri: dialog.replic.imageUrl,
          }}
          style={styles.image}
          resizeMode="contain"
        />
      )}
    </View>
  </View>
)
