import React, { JSX, useEffect, useRef } from "react";
import { View, Animated, StyleSheet, ViewStyle } from "react-native";

const DOT_COUNT = 3;

const FADE_IN_DURATION = 150;
const FADE_OUT_DURATION = 200;
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
    <View style={styles.container} needsOffscreenAlphaCompositing>
      {dots.map((dot: Animated.Value, index: number) => (
        <Animated.View
          key={index}
          style={[
            styles.dot,
            {
              transform: [
                {
                  scale: dot.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.7],
                  }),
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

interface Styles {
  container: ViewStyle;
  dot: ViewStyle;
}

const DOT_SIZE = 4;

const styles = StyleSheet.create<Styles>({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    marginHorizontal: 3,
    backgroundColor: "rgba(255,255,255,1)",
  },
});
