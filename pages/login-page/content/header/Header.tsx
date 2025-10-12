import { Image } from 'expo-image';
import { View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';

export const Header = () => {
  return (
    <ThemedView
      style={{
        height: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: 80,
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
    </ThemedView>
  );
};
