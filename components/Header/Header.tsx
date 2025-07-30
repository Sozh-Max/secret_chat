import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useGlobal } from '@/contexts/GlobalContext';
import { IconMenu } from '../icons/IconMenu';
import { AnimatedPressBtn } from '@/components/AnimatedPressBtn/AnimatedPressBtn';
import { router } from 'expo-router';

const Header = () => {
  const { tokens } = useGlobal();

  const handlePressSettings = () => router.push('/settings')

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
          fontFamily: 'NotoSans_600SemiBold',
        }}
      >
        {tokens}
      </ThemedText>
      <View>
        {/*<Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>*/}
        {/*  <Animated.View style={[styles.setting, { transform: [{ scale }] }]}>*/}
        {/*    <IconMenu/>*/}
        {/*  </Animated.View>*/}
        {/*</Pressable>*/}
        <AnimatedPressBtn style={styles.setting} onPress={handlePressSettings}>
          <IconMenu />
        </AnimatedPressBtn>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  setting: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default Header;
