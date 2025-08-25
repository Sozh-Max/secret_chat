import { View, Text } from 'react-native';
import { IconBackBtn } from '@/components/icons/IconBackBtn';
import { styles } from '@/pages/SettingsPage/content/Header/styles';
import { router } from 'expo-router';
import { AnimatedPressBtn } from '@/components/AnimatedPressBtn/AnimatedPressBtn';

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
        <IconBackBtn color="#c0c0c0" />
      </AnimatedPressBtn>
      <Text style={styles.title}>App settings</Text>
    </View>
  )
}