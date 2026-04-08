import { ReactNode } from 'react';
import { LayoutChangeEvent, StyleSheet, View, Platform } from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useKeyboardHandler } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const FormScreenWrapper = ({ children }: { children: ReactNode }) => {
  const insets = useSafeAreaInsets();

  const fullHeight = useSharedValue(0);
  const keyboardHeight = useSharedValue(0);

  const onLayout = (event: LayoutChangeEvent) => {
    fullHeight.value = event.nativeEvent.layout.height;
  };

  useKeyboardHandler(
    {
      onMove: (event) => {
        'worklet';
        keyboardHeight.value = Math.max(event.height, 0);
      },
      onEnd: (event) => {
        'worklet';
        keyboardHeight.value = Math.max(event.height, 0);
      },
    },
    []
  );

  const animatedStyle = useAnimatedStyle(() => {
    const bottomInset = Platform.OS === 'android' ? insets.bottom : 0;

    // Пока клавиатура занимает только системную нижнюю зону,
    // ресайз контента не начинаем
    const effectiveKeyboardHeight = Math.max(
      keyboardHeight.value - bottomInset,
      0
    );

    const visibleHeight = Math.max(
      fullHeight.value - effectiveKeyboardHeight,
      0
    );

    return {
      height: visibleHeight,
    };
  });

  return (
    <View style={styles.root} onLayout={onLayout}>
      <Animated.View style={[styles.resizedLayer, animatedStyle]}>
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: 'hidden',
  },
  resizedLayer: {
    width: '100%',
    overflow: 'hidden',
  },
});