import { Pressable, View, Text } from 'react-native';
import { IconBackBtn } from '@/components/icons/IconBackBtn';
import { styles } from '@/pages/SettingsPage/content/Header/styles';
import { router } from 'expo-router';

export const Header = () => {
  const handlePressBackBtn = () => {
    router.push('/');
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={handlePressBackBtn}
      >
        <IconBackBtn color="#c0c0c0" />
      </Pressable>
      <Text style={styles.title}>App settings</Text>
    </View>
  )
}