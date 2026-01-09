import { View, Text } from 'react-native';
import { Sales } from '@/pages/SettingsPage/content/tokens-buy/content/sales/Sales';
import { styles } from '@/pages/SettingsPage/content/tokens-buy/content/sales/content/medium-sale/styles';

export const MediumSale = () => (
  <Sales>
    <View style={[styles.container, styles.container_1]}>
      <Text style={[styles.text, styles.text_1]}>
        ~40% OFF
      </Text>
    </View>
    <View style={[styles.container, styles.container_2]}>
      <Text style={[styles.text, styles.text_2]}>
        POPULAR
      </Text>
    </View>
  </Sales>
)