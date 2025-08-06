import { Animated, Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import { ReactNode, useRef } from 'react';

type AnimatedPressBtnProps = {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
  onPress?: PressableProps['onPress'];
  scaleEnd?: number;
};

export const AnimatedPressBtn = ({
  style,
  children,
  onPress = () => {},
  scaleEnd = 0.85,
}: AnimatedPressBtnProps) => {

  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: scaleEnd,
      useNativeDriver: true,
      speed: 50,         // Ускорение анимации
      bounciness: 0,     // Без лишней упругости
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,         // Ускорение анимации
      bounciness: 0,     // Без лишней упругости
    }).start();
  }

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress}>
      <Animated.View style={[style, { transform: [{ scale }] }]}>
        {children}
      </Animated.View>
    </Pressable>
  )
}
