import React, { ReactNode } from 'react';
import { Pressable, StyleSheet, Platform, StyleProp, ViewStyle } from 'react-native';

export const RippleButton = ({
  onPress,
  children,
  style,
}: {
  onPress: () => void;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{
        color: 'rgba(280, 280, 280, 0.15)',
        borderless: true,
        radius: 25,
        foreground: true,
      }}
      style={({ pressed }) => [
        style || basicStyles.button,
        // Эффект для iOS (так как android_ripple там не работает)
        Platform.OS === 'ios' && pressed && { backgroundColor: 'rgba(280, 280, 280, 0.15)' }
      ]}
    >
      {children}
    </Pressable>
  );
}

const basicStyles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24, // Делаем область круглой
    backgroundColor: 'transparent', // Без фонового цвета
  },
});