import React, { JSX, useEffect, useRef } from "react";
import {
  View,
  Animated,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

const DOT_COUNT = 3;

const FADE_IN_DURATION = 180;
const FADE_OUT_DURATION = 220;
const WAVE_PAUSE = 150;

export const TypingDots = (): JSX.Element => {
  const dots = useRef<Animated.Value[]>(
    Array.from({ length: DOT_COUNT }, () => new Animated.Value(0))
  ).current;

  useEffect((): (() => void) => {
    const fadeIn = (dot: Animated.Value): Animated.CompositeAnimation =>
      Animated.timing(dot, {
        toValue: 1,
        duration: FADE_IN_DURATION,
        useNativeDriver: true,
      });

    const fadeOut = (dot: Animated.Value): Animated.CompositeAnimation =>
      Animated.timing(dot, {
        toValue: 0,
        duration: FADE_OUT_DURATION,
        useNativeDriver: true,
      });

    const waveSteps: Animated.CompositeAnimation[] = dots.map(
      (dot: Animated.Value, index: number) => {
        const animations: Animated.CompositeAnimation[] = [];

        animations.push(fadeIn(dot));

        if (index > 0) {
          animations.push(fadeOut(dots[index - 1]));
        }

        return Animated.parallel(animations);
      }
    );

    waveSteps.push(fadeOut(dots[dots.length - 1]));

    const wave: Animated.CompositeAnimation = Animated.sequence([
      ...waveSteps,
      Animated.delay(WAVE_PAUSE),
    ]);

    const loop: Animated.CompositeAnimation = Animated.loop(wave);
    loop.start();

    return (): void => {
      loop.stop();
      dots.forEach(dot => dot.setValue(0));
    };
  }, [dots]);

  return (
    <View style={styles.container}>
      {dots.map((dot: Animated.Value, index: number) => (
        <Animated.Text
          key={index}
          style={[
            styles.dot,
            {
              opacity: dot.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 1],
              }),
              transform: [
                {
                  scale: dot.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.5],
                  }),
                },
                {
                  translateY: dot.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -1.5],
                  }),
                },
              ],
            },
          ]}
        >
          .
        </Animated.Text>
      ))}
    </View>
  );
}

interface Styles {
  container: ViewStyle;
  dot: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    fontSize: 24,
    marginHorizontal: 3,
    color: '#ffffff',
  },
});
