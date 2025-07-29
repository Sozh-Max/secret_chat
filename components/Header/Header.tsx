import { Image } from 'expo-image';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { useRef } from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useGlobal } from '@/contexts/GlobalContext';
import { IconMenu } from '../icons/IconMenu';

const Header = () => {
  const { tokens } = useGlobal();

  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.85,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

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
        {/*<View*/}
        {/*  style={styles.setting}*/}
        {/*>*/}
        {/*  /!* <Image*/}
        {/*    source={require('@/assets/images/ico-menu.svg')}*/}
        {/*    style={{*/}
        {/*      alignSelf: 'center',*/}
        {/*      width: 24,*/}
        {/*      height: 24,*/}
        {/*      */}
        {/*    }}*/}
        {/*  /> *!/*/}
        {/*  <IconMenu/>*/}
        {/*</View>*/}
        <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
          <Animated.View style={[styles.setting, { transform: [{ scale }] }]}>
            <IconMenu/>
          </Animated.View>
        </Pressable>
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
