import { View, Text } from 'react-native';
import { IconBackBtn } from '@/src/components/icons/IconBackBtn';
import { styles } from '@/src/screens/SettingsPage/content/header/styles';
import { router } from 'expo-router';
import { AnimatedPressBtn } from '@/src/components/AnimatedPressBtn/AnimatedPressBtn';
import { SUB_MAIN_ICON_COLOR } from '@/src/constants/Colors';

export const Header = () => {
  const handlePressBackBtn = () => {
    setTimeout(() => {
      router.push('/');
    }, 50);
  }

  return (
    <View style={styles.container}>
      <AnimatedPressBtn
        style={styles.button}
        onPress={handlePressBackBtn}
      >
        <IconBackBtn color={SUB_MAIN_ICON_COLOR} />
      </AnimatedPressBtn>
      <Text style={styles.title}>App settings</Text>
    </View>
  )
}