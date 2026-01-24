import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Text, View, Pressable } from 'react-native';

import { AGENT_KEYS, IMG_THUMB_MAP } from '@/src/constants/agents-data';
import { IDialogPreview } from '@/src/contexts/GlobalContext';
import { IconPlayShort } from '@/src/components/icons/IconPlayShort';
import { IconBlock } from '@/src/components/icons/IconBlock';
import { styles } from '@/src/screens/MaiPage/content/ChatCardShort/styles';
import StarIcon from '@/assets/images/svg/star_icon.svg';

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
      style={[styles.item]}
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
        {data.isNotification && <View style={styles.circle} />}
      </View>
      <View style={styles.info}>
        <View style={styles.title_container}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {data.id}
          </Text>
          {(data.isBlocked || data.isComplaint) && (
            <IconBlock />
          )}
          {data.hasVideo && (
            <IconPlayShort />
          )}
        </View>
        <Text style={[styles.description, data.message && styles.message]} numberOfLines={1} ellipsizeMode="tail">
          {data.message || data.description}
        </Text>
      </View>
      <View style={styles.rating}>
        <StarIcon width={14} height={14} />
        <Text style={styles.rating_value}>{data.cost}</Text>
      </View>
    </Pressable>
  );
};

export default ChatCardShort;
