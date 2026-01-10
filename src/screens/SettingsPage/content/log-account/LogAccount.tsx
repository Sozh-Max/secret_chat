import { View } from 'react-native';
import { styles } from '@/src/screens/SettingsPage/content/log-account/styles';
import { CustomButton } from '@/src/components/CustomButton/CustomButton';
import { IconGoogle } from '@/src/components/icons/IconGoogle';
import { IconApple } from '@/src/components/icons/IconApple';

export const LogAccount = () => {
  return (
    <View style={styles.container}>
      <View style={styles.btn_container}>
        <CustomButton
          text="Continue with Google"
          Icon={<IconGoogle />}
        />
      </View>
      <View style={styles.btn_container}>
        <CustomButton
          text="Continue with Apple"
          Icon={<IconApple />}
          disabled={true}
        />
      </View>
    </View>
  )
}