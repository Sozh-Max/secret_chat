import { Text, View } from 'react-native';
import { useGlobal } from '@/src/contexts/GlobalContext';
import { styles } from '@/src/screens/SettingsPage/content/balance/styles';

import StarIcon from '@/assets/images/svg/star_icon.svg';
import { formatNumberWithCommas } from '@/src/utils/global';

export const Balance = () => {
  const { tokens } = useGlobal();

  return (
    <View style={styles.balance_container}>
      <View style={styles.info}>
        <StarIcon width={28} height={28} />
        <Text style={styles.balance}>
          {formatNumberWithCommas(tokens)}
        </Text>
      </View>
    </View>
  )
}