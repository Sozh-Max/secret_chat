import { View, Text } from 'react-native';
import { IconBackBtn } from '@/src/components/icons/IconBackBtn';
import { styles } from '@/src/screens/SettingsPage/content/header/styles';
import { router } from 'expo-router';
import { AnimatedPressBtn } from '@/src/components/AnimatedPressBtn/AnimatedPressBtn';
import { SUB_MAIN_ICON_COLOR } from '@/src/constants/Colors';
import { RippleButton } from '@/src/components/ripple-button/RippleButton';


export const Header = () => {
  const handlePressBackBtn = () => {
    router.replace('/');
  }

  return (
    <View style={styles.container}>
      <RippleButton
        style={styles.button}
        onPress={handlePressBackBtn}
      >
        <IconBackBtn color={SUB_MAIN_ICON_COLOR} />
      </RippleButton>
      <Text style={styles.title}>App settings</Text>
    </View>
  )
}