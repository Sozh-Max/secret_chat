import { Image } from 'expo-image';
import { View, Text } from 'react-native';

import { useGlobal } from '@/src/contexts/GlobalContext';
import { IconMenu } from '@/src/components/icons/IconMenu';
import { AnimatedPressBtn } from '@/src/components/AnimatedPressBtn/AnimatedPressBtn';
import { router } from 'expo-router';
import StarIcon from '@/assets/images/svg/star_icon.svg';
import { styles } from '@/src/screens/MaiPage/content/header/styles';
import { formatNumberWithCommas } from '@/src/utils/global';

export const Header = () => {
  const { tokens } = useGlobal();

  const handlePressSettings = () => {
    setTimeout(() => {
      router.push('/settings');
    }, 50);
  }

  return (
    <View style={styles.container}>
      <View style={styles.container_logo}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.balance}>
        <StarIcon width={14} height={14} />
        <Text style={styles.balance_text}>
          {formatNumberWithCommas(tokens)}
        </Text>
      </View>
      <View>
        <AnimatedPressBtn
          style={styles.setting}
          onPress={handlePressSettings}
          scaleEnd={0.8}
        >
          <IconMenu />
        </AnimatedPressBtn>
      </View>
    </View>
  );
};
