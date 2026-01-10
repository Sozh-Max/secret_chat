import { Text } from 'react-native';

import { styles } from '@/src/screens/SettingsPage/content/tokens-buy/content/price/styles';

export const Price = (
  { value }: { value: number}
) =>
  <Text style={styles.text}>$ {value.toFixed(2)}</Text>