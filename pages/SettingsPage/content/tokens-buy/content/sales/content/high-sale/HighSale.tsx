import { View, Text } from 'react-native';
import { Sales } from '@/pages/SettingsPage/content/tokens-buy/content/sales/Sales';
import { styles } from '@/pages/SettingsPage/content/tokens-buy/content/sales/content/high-sale/styles';

export const HighSale = () => (
  <Sales>
    <View style={[styles.container, styles.container_1]}>
      <Text style={[styles.text, styles.text_1]}>
        ~50% OFF
      </Text>
    </View>
    <View style={[styles.container, styles.container_2]}>
      <Text style={[styles.text, styles.text_2]}>
        BEST VALUE
      </Text>
    </View>
  </Sales>
)