import { Image, Text, View } from 'react-native';
import { useGlobal } from '@/contexts/GlobalContext';
import { styles } from '@/pages/SettingsPage/content/balance/styles';

export const Balance = () => {
  const { tokens } = useGlobal();

  return (
    <View style={styles.balance_container}>
      <View style={styles.info}>
        <Image
          source={require(`@/assets/images/svg/star_icon.svg`)}
          resizeMode="cover"
          style={styles.icon}
        />
        <Text style={styles.balance}>
          {tokens}
        </Text>
      </View>
    </View>
  )
}