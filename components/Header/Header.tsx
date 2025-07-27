import { Image } from 'expo-image';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from "@/components/ThemedView";
import { useGlobal } from "@/contexts/GlobalContext";
import { View } from 'react-native';
import { IconMenu } from '../icons/IconMenu';

const Header = () => {
  const {tokens} = useGlobal();

  return (
    <ThemedView
      style={{
        height: 80,
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: 50,
          justifyContent: 'center',
          flexDirection: 'row',
        }}
      >
        <Image
         source={require('@/assets/images/logo.png')}
         style={{
          alignSelf: 'center',
          width: 28,
          height: 28,
        }}
        />
      </View>
      <ThemedText
        style={{
          color: '#fff',
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        {tokens}
        </ThemedText>
      <View>
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* <Image
            source={require('@/assets/images/ico-menu.svg')}
            style={{
              alignSelf: 'center',
              width: 24,
              height: 24,
              
            }}
          /> */}
          <IconMenu />
        </View>
      </View>
    </ThemedView>
  )
}

export default Header;
