import { Animated, Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import { ReactNode, RefObject, useRef } from 'react';

type AnimatedPressBtnProps = {
  style?: StyleProp<ViewStyle> | ((args: { pressed: boolean }) => StyleProp<ViewStyle>);
  wrapperStyle?: StyleProp<ViewStyle>;
  children: ReactNode;
  onPress?: PressableProps['onPress'];
  scaleEnd?: number;
  customRef?: RefObject<any> | null;
  disabled?: boolean;
};

export const AnimatedPressBtn = ({
  style,
  wrapperStyle,
  children,
  onPress = () => {},
  scaleEnd = 0.85,
  customRef,
  disabled = false,
}: AnimatedPressBtnProps) => {

  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: scaleEnd,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  }

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      ref={customRef}
      style={wrapperStyle}
      disabled={disabled}
    >
      {({ pressed }: { pressed: boolean }) => {
        const baseStyle = typeof style === 'function' ? style({ pressed }) : style;

        const animatedStyles = [
          ...(Array.isArray(baseStyle) ? baseStyle : (baseStyle ? [baseStyle] : [])),
          { transform: [{ scale }] },
        ];

        return (
          <Animated.View style={animatedStyles}>
            {children}
          </Animated.View>
        );
      }}
    </Pressable>
  );
}
