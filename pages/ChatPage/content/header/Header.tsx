import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { IconBackBtn } from '@/components/icons/IconBackBtn';
import { AGENT_KEYS, IMG_THUMB_MAP } from '@/constants/agents-data';
import { Image } from 'expo-image';
import { IconRemove } from '@/components/icons/IconRemove';
import { IconRating } from '@/components/icons/IconRating';
import { ThemedText } from '@/components/ThemedText';
import { IdTypeProps } from '@/interfaces/global';
import { styles } from '@/pages/ChatPage/content/header/styles';

const Header = ({
  id,
}: IdTypeProps) => {

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

export default Header;
