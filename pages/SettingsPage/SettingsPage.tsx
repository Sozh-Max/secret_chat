import { LinearGradient } from 'expo-linear-gradient';
import { View, Text } from 'react-native';

import { SafeAreaInsectComponent } from '@/components/SafeAreaInsectComponent/SafeAreaInsectComponent';
import { Header } from '@/pages/SettingsPage/content/Header/Header';
import { SettingsContent } from '@/pages/SettingsPage/content/SettingsContent/SettingsContent';
import { TokensBuy } from '@/pages/SettingsPage/content/TokensBuy/TokensBuy';
import { LogAccount } from '@/pages/SettingsPage/content/LogAccount/LogAccount';
import { useGlobal } from '@/contexts/GlobalContext';
import { styles } from '@/pages/SettingsPage/styles';

export const SettingsPage = () => {
  const { tokens } = useGlobal();

  return (
    <SafeAreaInsectComponent>
      <LinearGradient
        colors={['rgb(5, 4, 4)', 'rgb(22, 22, 22)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.wrapper}
      >
        <Header />
        <View style={styles.container}>

          <SettingsContent
            title='Balance'
          >
            <View style={styles.balance_container}>
              <Text style={styles.balance}>
                ⭐ {tokens}
              </Text>
            </View>
          </SettingsContent>

          <SettingsContent
            title='Star purchase'
            description='To use chat features, view photos, or watch videos, users must have a sufficient star balance'
          >
            <TokensBuy />
          </SettingsContent>

          <SettingsContent
            title='Account'
            description="To ensure privacy, message history is stored only on this device, we do not collect or store this type of data. Certain hidden features are available depending on the user's account level"
          >
            <LogAccount />
          </SettingsContent>

          <SettingsContent
            title='System info'
            description='Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
          />

        </View>
      </LinearGradient>
    </SafeAreaInsectComponent>

  );
}
