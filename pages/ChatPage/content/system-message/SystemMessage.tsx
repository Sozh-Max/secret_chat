import { View, Text } from 'react-native';
import { IdTypeProps } from '@/interfaces/global';
import { styles } from '@/pages/ChatPage/content/system-message/styles';
import { IconSystem } from '@/components/icons/IconSystem';
import { AGENTS_DATA, IMG_PREVIEW_MAP } from '@/constants/agents-data';
import { Image } from 'expo-image';

export const SystemMessage = ({
  id
}: IdTypeProps) => {
  const description = AGENTS_DATA[id];
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>

        <View style={styles.header}>
          <IconSystem />
          <Text style={styles.title}>System</Text>
        </View>
        <Text style={styles.text}>
          {description}
        </Text>
        <Image
          source={IMG_PREVIEW_MAP[id]}
          style={styles.img}
        />
      </View>
    </View>
  )
}