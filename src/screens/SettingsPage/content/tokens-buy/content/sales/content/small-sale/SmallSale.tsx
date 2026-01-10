import { View, Text } from 'react-native';
import { styles } from '@/src/screens/SettingsPage/content/tokens-buy/content/sales/content/small-sale/styles';
import { Sales } from '@/src/screens/SettingsPage/content/tokens-buy/content/sales/Sales';

export const SmallSale = () => (
  <Sales>
    <View style={styles.container}>
      <Text style={styles.text}>
        ~30% OFF
      </Text>
    </View>
  </Sales>
)