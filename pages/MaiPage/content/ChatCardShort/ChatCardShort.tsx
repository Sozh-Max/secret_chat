import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Text, View, Pressable } from 'react-native';

import { AGENT_KEYS, IMG_THUMB_MAP } from '@/constants/agents-data';
import { IDialogPreview } from '@/contexts/GlobalContext';
import { IconPlayShort } from '@/components/icons/IconPlayShort';
import { IconRating } from '@/components/icons/IconRating';
import { IconBlock } from '@/components/icons/IconBlock';
import { styles } from '@/pages/MaiPage/content/ChatCardShort/styles';

const ChatCardShort = ({
  data,
}: {
  data: IDialogPreview;
}) => {
  const handlePress = () => {
    router.push({
      pathname: '/chat',
      params: { id: data.id },
    });
  }

  return (
    <Pressable
      style={styles.item}
      onPress={handlePress}
    >
      <View style={styles.avatar_container}>
        <Image
          source={IMG_THUMB_MAP[data.id]}
          style={styles.img}
        />
        {data.id === AGENT_KEYS.wendy && (
          <Text style={[styles.label, styles.label_new]}>New</Text>
        )}
        {data.id === AGENT_KEYS.ashley && (
          <Text style={[styles.label, styles.label_hot]}>Hot</Text>
        )}
      </View>
      <View style={styles.info}>
        <View style={styles.title_container}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {data.id}
          </Text>
          {data.hasVideo && (
            <IconPlayShort />
          )}
          {data.isBlocked && (
            <IconBlock />
          )}
        </View>
        <Text style={[styles.description, data.message && styles.message]} numberOfLines={1} ellipsizeMode="tail">
          {data.message || data.description}
        </Text>
      </View>
      <View style={styles.rating}>
        <IconRating />
        <Text style={styles.rating_value}>{data.cost}</Text>
      </View>
    </Pressable>
  );
};

export default ChatCardShort;
