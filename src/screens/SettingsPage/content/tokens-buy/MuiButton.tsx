import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export const MuiButton =({
  onPress,
  children,
  styles,
}: {
  onPress: () => void;
  children: ReactNode;
  styles: any;
}) => {
  return (

    <RectButton
      onPress={onPress}
      rippleColor="#ffffff66"
      underlayColor="#1565c0"
      style={[styles, currentStyles.button]}
    >
      {children}
    </RectButton>
  );
}

const currentStyles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center' },
  container: { alignItems: 'center' },
  button: {
    // backgroundColor: '#1976d2',
    // paddingVertical: 12,
    // paddingHorizontal: 24,
    // borderRadius: 4,
    // Тени для сходства с MUI
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
});