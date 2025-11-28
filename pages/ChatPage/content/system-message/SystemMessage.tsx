import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';

import { IdTypeProps } from '@/interfaces/global';
import { styles } from '@/pages/ChatPage/content/system-message/styles';
import { IconSystem } from '@/components/icons/IconSystem';
import { IMG_PREVIEW_MAP } from '@/constants/agents-data';
import { router } from 'expo-router';


interface SystemMessageType extends IdTypeProps {
  message?: string;
  isImage?: boolean;
}

export const SystemMessage = ({
  id,
  message,
  isImage = false,
}: SystemMessageType) => {

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
          <Pressable
            onPress={() =>
              router.push({
                pathname: '/image-modal',
                params: { sourceId: id },
              })
            }
          >
            <Image source={IMG_PREVIEW_MAP[id]} style={styles.img} />
          </Pressable>
        )}
      </View>
    </View>
  );
};