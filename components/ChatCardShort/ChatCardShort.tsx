import { Image } from 'expo-image';
import { Dimensions, StyleSheet, Text, View, Pressable } from 'react-native';

import { AGENT_KEYS, IMG_THUMB_MAP } from '@/constants/agents-data';
import { MAIN_COLOR } from '@/constants/Colors';
import { IDialogPreview } from '@/contexts/GlobalContext';
import { IconPlayShort } from '@/components/icons/IconPlayShort';
import { IconRating } from '@/components/icons/IconRating';
import { router } from 'expo-router';

const screenWidth = Dimensions.get('window').width;

const ChatCardShort = ({
  data,
}: {
  data: IDialogPreview;
}) => {
  const handlePress = () => {
    router.push({
      pathname: '/screen-chat',
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
          {data.id === AGENT_KEYS.ashley && (
            <IconPlayShort/>
          )}
        </View>
        <Text style={[styles.description, data.message && styles.message]} numberOfLines={1} ellipsizeMode="tail">
          {data.message || data.description}
        </Text>
      </View>
      <View style={styles.rating}>
        <IconRating/>
        <Text style={styles.rating_value}>{data.id === AGENT_KEYS.ashley ? 25 : 10}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  avatar_container: {
    position: 'relative',
  },
  item: {
    paddingTop: 6,
    paddingRight: 6,
    paddingBottom: 6,
    paddingLeft: 19,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(73, 73, 73, 0.1);',
    flexDirection: 'row',
    minHeight: 84,
    alignItems: 'center',
    gap: 13,
    position: 'relative',
  },
  img: {
    borderRadius: 30,
    alignSelf: 'center',
    width: 60,
    height: 60,
  },
  info: {
    flexGrow: 1,
    gap: 8,
  },
  title: {
    fontSize: 14,
    fontFamily: 'NotoSans_600SemiBold',
    lineHeight: 18,
    color: '#fff',
    maxWidth: screenWidth - 115,
    textTransform: 'capitalize',
  },
  title_container: {
    flexDirection: 'row',
    gap: 5,
  },
  description: {
    color: MAIN_COLOR,
    maxWidth: screenWidth - 115,
    width: '100%',
    fontSize: 14,
    fontFamily: 'NotoSans_400Regular',
  },
  message: {
    color: '#ffffff',
  },
  rating: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    right: 16,
    top: 16,
    gap: 2,
  },
  rating_value: {
    fontSize: 11,
    lineHeight: 22,
    fontFamily: 'NotoSans_600SemiBold',
    color: '#fff',
    position: 'relative',
    top: 2,
  },
  label: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    fontSize: 9,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4,
    textTransform: 'uppercase',
    fontFamily: 'NotoSans_800ExtraBold',
    borderRadius: 8,
    color: '#ffffff',
  },
  label_hot: {
    backgroundColor: '#ac0034',
  },
  label_new: {
    backgroundColor: '#469501',
  },
});

export default ChatCardShort;
