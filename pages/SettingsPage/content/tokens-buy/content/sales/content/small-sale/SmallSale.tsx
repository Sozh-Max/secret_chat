import { View, Text } from 'react-native';
import { styles } from '@/pages/SettingsPage/content/tokens-buy/content/sales/content/small-sale/styles';
import { Sales } from '@/pages/SettingsPage/content/tokens-buy/content/sales/Sales';

export const SmallSale = () => (
  <Sales>
    <View style={styles.container}>
      <Text style={styles.text}>
        ~30% OFF
      </Text>
    </View>
  </Sales>
)