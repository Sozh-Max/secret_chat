import { Text } from 'react-native';
import { styles } from '@/src/screens/SettingsPage/content/tokens-buy/content/old-price/styles';

export const OldPrice = (
  { value }: { value: number}
) =>
  <Text style={styles.text}>$ {value.toFixed(2)}</Text>