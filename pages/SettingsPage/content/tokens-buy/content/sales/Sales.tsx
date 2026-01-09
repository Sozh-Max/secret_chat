import { View } from 'react-native';
import { styles } from '@/pages/SettingsPage/content/tokens-buy/content/sales/styles';
import { ReactNode } from 'react';

export const Sales = (
  { children }: { children: ReactNode }
) =>
  <View style={styles.container}>{children}</View>
