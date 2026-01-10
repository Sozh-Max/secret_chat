import { Text, View } from 'react-native';
import { styles } from '@/src/screens/SettingsPage/content/account-data/styles';
import { CustomButton } from '@/src/components/CustomButton/CustomButton';
import { useUser } from '@/src/contexts/UserContext';

export const AccountData = () => {
  const { email, logout } = useUser();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.emailWrapper}>
          <Text style={styles.emailText}>{email} </Text>
        </View>
      </View>
      <View style={styles.row}>
        <CustomButton
          text="Sign out"
          handlePress={logout}
        />
      </View>
    </View>
  )
}