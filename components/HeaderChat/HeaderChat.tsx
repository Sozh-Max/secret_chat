import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { IconBackBtn } from '@/components/icons/IconBackBtn';
import { AGENT_KEYS, IMG_THUMB_MAP } from '@/constants/AgentsData';
import { Image } from 'expo-image';
import { IconRemove } from '@/components/icons/IconRemove';
import { IconRating } from '@/components/icons/IconRating';
import { ThemedText } from '@/components/ThemedText';

const HeaderChat = ({
  id,
}: {
  id: AGENT_KEYS;
}) => {

  const handlePressBackBtn = () => {
    router.push('/');
  }

  return (
    <View style={styles.wrapper}>
      <Pressable
        style={styles.button}
        onPress={handlePressBackBtn}
      >
        <IconBackBtn />
      </Pressable>

      <View
        style={styles.container}
      >
        <Image
          source={IMG_THUMB_MAP[id]}
          style={styles.img}
        />
        <View style={styles.info}>
          <ThemedText style={styles.label}>{id}</ThemedText>
          <View style={styles.rating}>
            <IconRating/>
            <Text style={styles.rating_value}>{id === AGENT_KEYS.ashley ? 25 : 10}</Text>
          </View>
        </View>
      </View>

      <Pressable
        style={styles.button}
      >
        <IconRemove />
      </Pressable>
    </View>
  )
}


const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
  },
  container: {
    flexDirection: 'row',
    paddingLeft: 13,
    paddingRight: 13,
    flexGrow: 1,
  },
  button: {
    width: 50,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  info: {
    paddingLeft: 13,
    flexGrow: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    fontFamily: 'NotoSans_600SemiBold',
    lineHeight: 18,
    color: '#fff',
    textTransform: 'capitalize',
  },

  rating: {
    flexDirection: 'row',
    alignItems: 'center',
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
});

export default HeaderChat;
