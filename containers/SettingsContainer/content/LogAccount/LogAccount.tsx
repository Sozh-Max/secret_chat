import { View } from 'react-native';
import { styles } from '@/containers/SettingsContainer/content/LogAccount/styles';
import { CustomButton } from '@/containers/SettingsContainer/content/CustomButton/CustomButton';
import { IconGoogle } from '@/components/icons/IconGoogle';
import { IconApple } from '@/components/icons/IconApple';

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