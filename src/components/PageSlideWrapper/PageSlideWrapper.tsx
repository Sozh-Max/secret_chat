import React, { useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

type Props = {
  children: React.ReactNode;
  duration?: number;
};

export function PageSlideWrapper({
  children,
  duration = 200,
}: Props) {
  const translateX = useSharedValue(width);

  useEffect(() => {
    translateX.value = withTiming(0, {
      duration,
      easing: Easing.out(Easing.cubic),
    });
  }, [duration, translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View style={[
      {
        flex: 1,
      },
      animatedStyle,
    ]}>
      {children}
    </Animated.View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });
