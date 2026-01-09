import { Text, View } from 'react-native';
import { useGlobal } from '@/contexts/GlobalContext';
import { styles } from '@/pages/SettingsPage/content/balance/styles';

import StarIcon from '@/assets/images/svg/star_icon.svg';

export const Balance = () => {
  const { tokens } = useGlobal();

  return (
    <View style={styles.balance_container}>
      <View style={styles.info}>
        <StarIcon width={28} height={28} />
        <Text style={styles.balance}>
          {tokens}
        </Text>
      </View>
    </View>
  )
}