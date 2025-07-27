import { Image } from 'expo-image';

import { ThemedView } from "@/components/ThemedView";
import { View } from 'react-native';

const Footer = () => {
  return (
    <ThemedView
      style={{
        height: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        flexDirection: 'row',
      }}
    >
      <View style={{
        backgroundColor: 'rgba(0,0,0,0)',
      }}>
        <Image source={require('@/assets/images/logo.png')} style={{ alignSelf: 'center' }} />
      </View>
      <ThemedView>
        <ThemedView>
           <Image source={require('@/assets/images/ico-menu.svg')} style={{ alignSelf: 'center' }} />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  )
}

export default Footer;
