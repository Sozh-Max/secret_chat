// LogoLoader.tsx
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Svg from "react-native-svg";
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import {
  LogoLayerTop,
  LogoLayerMain,
  LogoLayerInner,
} from "@/src/components/icons/LogoSvg";

type Props = { size?: number };
const AView = Animated.View;

export const LogoLoader = ({ size = 120 }: Props) => {
  const t = useSharedValue(0);

  useEffect(() => {
    t.value = withRepeat(
      withTiming(1, { duration: 1600, easing: Easing.inOut(Easing.cubic) }),
      -1,
      false
    );
  }, []);

  // 1) MAIN: появление 0.00..0.38, исчезание 0.86..0.94 (первым)
  const mainStyle = useAnimatedStyle(() => {
    const pIn = interpolate(t.value, [0.00, 0.38], [0, 1], Extrapolate.CLAMP);
    const pOut = interpolate(t.value, [0.86, 0.94], [1, 0], Extrapolate.CLAMP);

    const opacityIn = interpolate(pIn, [0, 0.25, 1], [0, 1, 1], Extrapolate.CLAMP);
    const opacity = opacityIn * pOut;

    const scaleIn = interpolate(pIn, [0, 0.75, 1], [0.0, 1.06, 1], Extrapolate.CLAMP);
    // при исчезании чуть “уходит назад”
    const scaleOut = interpolate(pOut, [1, 0], [1, 0.98], Extrapolate.CLAMP);
    const scale = scaleIn * scaleOut;

    const translateYIn = interpolate(pIn, [0, 1], [10, 0], Extrapolate.CLAMP);
    const translateYOut = interpolate(pOut, [1, 0], [0, 6], Extrapolate.CLAMP);

    return {
      opacity,
      transform: [{ translateY: translateYIn + translateYOut }, { scale }],
    };
  });

  // 2) INNER: появление 0.28..0.70, исчезание 0.90..0.97 (вторым)
  const innerStyle = useAnimatedStyle(() => {
    const pIn = interpolate(t.value, [0.28, 0.70], [0, 1], Extrapolate.CLAMP);
    const pOut = interpolate(t.value, [0.90, 0.97], [1, 0], Extrapolate.CLAMP);

    const opacityIn = interpolate(pIn, [0, 0.2, 1], [0, 1, 1], Extrapolate.CLAMP);
    const opacity = opacityIn * pOut;

    const translateYIn = interpolate(
      pIn,
      [0, 0.7, 0.85, 1],
      [-40, 2, -3, 0],
      Extrapolate.CLAMP
    );

    // при исчезании чуть “поднимается”, будто отлипает
    const translateYOut = interpolate(pOut, [1, 0], [0, -8], Extrapolate.CLAMP);

    const scaleIn = interpolate(pIn, [0, 0.8, 1], [0.98, 1.02, 1], Extrapolate.CLAMP);
    const scaleOut = interpolate(pOut, [1, 0], [1, 0.99], Extrapolate.CLAMP);
    const scale = scaleIn * scaleOut;

    return {
      opacity,
      transform: [{ translateY: translateYIn + translateYOut }, { scale }],
    };
  });

  // 3) TOP: появление 0.62..0.92, исчезание 0.94..1.00 (последним)
  const topStyle = useAnimatedStyle(() => {
    const pIn = interpolate(t.value, [0.62, 0.92], [0, 1], Extrapolate.CLAMP);
    const pOut = interpolate(t.value, [0.94, 1.0], [1, 0], Extrapolate.CLAMP);

    const opacityIn = interpolate(pIn, [0, 0.25, 1], [0, 1, 1], Extrapolate.CLAMP);
    const opacity = opacityIn * pOut;

    const translateYIn = interpolate(pIn, [0, 1], [6, 0], Extrapolate.CLAMP);
    const translateYOut = interpolate(pOut, [1, 0], [0, 8], Extrapolate.CLAMP);

    const scaleIn = interpolate(pIn, [0, 1], [0.98, 1], Extrapolate.CLAMP);
    const scaleOut = interpolate(pOut, [1, 0], [1, 0.98], Extrapolate.CLAMP);

    return {
      opacity,
      transform: [{ translateY: translateYIn + translateYOut }, { scale: scaleIn * scaleOut }],
    };
  });

  return (
    <AView style={styles.center}>
      <View style={{ width: size, height: size }}>
        <AView style={[StyleSheet.absoluteFillObject, mainStyle]} pointerEvents="none">
          <Svg width={size} height={size} viewBox="0 0 308 308">
            <LogoLayerMain />
          </Svg>
        </AView>

        <AView style={[StyleSheet.absoluteFillObject, innerStyle]} pointerEvents="none">
          <Svg width={size} height={size} viewBox="0 0 308 308">
            <LogoLayerInner />
          </Svg>
        </AView>

        <AView style={[StyleSheet.absoluteFillObject, topStyle]} pointerEvents="none">
          <Svg width={size} height={size} viewBox="0 0 308 308">
            <LogoLayerTop />
          </Svg>
        </AView>
      </View>
    </AView>
  );
};

const styles = StyleSheet.create({
  center: { justifyContent: "center", alignItems: "center" },
});