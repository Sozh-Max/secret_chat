import { LinearGradient } from 'expo-linear-gradient';
import { View, ScrollView } from 'react-native';

import { SafeAreaInsectComponent } from '@/src/components/SafeAreaInsectComponent/SafeAreaInsectComponent';
import { Header } from '@/src/screens/SettingsPage/content/header/Header';
import { TemplateContent } from '@/src/components/TemplateContent/TemplateContent';
import { styles } from '@/src/screens/SettingsPage/styles';
import { AccountData } from '@/src/screens/SettingsPage/content/account-data/AccountData';
import { TokensBuy } from '@/src/screens/SettingsPage/content/tokens-buy/TokensBuy';
import { Balance } from '@/src/screens/SettingsPage/content/balance/Balance';

export const SettingsScreen = () => (
  <SafeAreaInsectComponent>
    <LinearGradient
      colors={['rgb(5, 4, 4)', 'rgb(22, 22, 22)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.wrapper}
    >
      <Header/>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.inner}>

          <TemplateContent
            title="Balance"
            description="To use chat features, view photos, or watch videos, users must have a sufficient star balance"
          >
            <Balance/>
          </TemplateContent>

          <TemplateContent
            title="Star purchase"
          >
            <TokensBuy/>
          </TemplateContent>

          <TemplateContent
            title="Account"
            description="To ensure privacy, message history is stored only on this device, we do not collect or store this type of data. Certain hidden features are available depending on the user's account level"
          >
            {/*<log-account />*/}
            <AccountData/>
          </TemplateContent>

          {/*<TemplateContent*/}
          {/*  title='System info'*/}
          {/*  description='Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'*/}
          {/*/>*/}
        </View>
      </ScrollView>
    </LinearGradient>
  </SafeAreaInsectComponent>
);

