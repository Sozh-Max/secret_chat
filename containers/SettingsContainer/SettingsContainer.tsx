import { LinearGradient } from 'expo-linear-gradient';
import { View, Text } from 'react-native';
import { Header } from '@/containers/SettingsContainer/content/Header/Header';
import { SettingsContent } from '@/containers/SettingsContainer/content/SettingsContent/SettingsContent';
import { useGlobal } from '@/contexts/GlobalContext';
import { TokensBuy } from '@/containers/SettingsContainer/content/TokensBuy/TokensBuy';
import { styles } from '@/containers/SettingsContainer/styles';

export const SettingsContainer = () => {
  const { tokens } = useGlobal();

  return (
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

        </SettingsContent>

        <SettingsContent
          title='System info'
          description='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36'
        >

        </SettingsContent>

      </View>
    </LinearGradient>
  );
}
