import { Text } from 'react-native';
import { styles } from '@/pages/SettingsPage/content/tokens-buy/content/old-price/styles';

export const OldPrice = (
  { value }: { value: number}
) =>
  <Text style={styles.text}>$ {value}</Text>