import { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useKeyboardStatus } from '@/hooks/useKeyboardStatus';

export const FormScreenWrapper = (
  { children }:
  { children: ReactNode },
) => {
  const isKeyboardVisible = useKeyboardStatus();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={isKeyboardVisible ? 0 : -50}
    >
      {/*<ScrollView*/}
      {/*  keyboardShouldPersistTaps="handled"*/}
      {/*  contentContainerStyle={{ flexGrow: 1 }}*/}
      {/*>*/}
        <View style={{ flex: 1 }}>
          {children}
        </View>
      {/*</ScrollView>*/}
    </KeyboardAvoidingView>
  );
}
