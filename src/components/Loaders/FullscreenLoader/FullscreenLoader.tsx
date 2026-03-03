// FullscreenLoader.tsx
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from "react-native-reanimated";
import { LogoLoader } from "@/src/components/Loaders/LogoLoader/LogoLoader";
import { useGlobal } from '@/src/contexts/GlobalContext';

export const FullscreenLoader = () => {
  const { showGlobalLoader } = useGlobal();
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(showGlobalLoader ? 1 : 0, { duration: 180 });
  }, [showGlobalLoader]);

  const overlayStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      pointerEvents={showGlobalLoader ? "auto" : "none"}
      style={[styles.overlay, overlayStyle]}
    >
      <LogoLoader size={120} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    elevation: 9999,
    backgroundColor: "#0c003e",
    justifyContent: "center",
    alignItems: "center",
  },
});