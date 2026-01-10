import { Text, View } from 'react-native';

import { ITokenValue } from '@/src/screens/SettingsPage/content/tokens-buy/TokensBuy';
import { styles } from '@/src/screens/SettingsPage/content/tokens-buy/content/count-items/styles';
import { formatNumberWithCommas } from '@/src/utils/global';

export const CountItems = ({
  item
}: {
  item: ITokenValue;
}) => {
  return (
    <View style={styles.container}>
      {item.icon}
      <Text style={styles.label}>{formatNumberWithCommas(item.value)} Stars</Text>
    </View>
  );
}