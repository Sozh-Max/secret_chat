import { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { useKeyboardStatus } from '@/src/hooks/useKeyboardStatus';

export const FormScreenWrapper = ({ children }: { children: ReactNode }) => {
  const isKeyboardVisible = useKeyboardStatus();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      // Смещение работает только когда клавиатура открыта
      keyboardVerticalOffset={Platform.OS === 'android' && isKeyboardVisible ? 36 : 0}
    >
      <View style={{ flex: 1 }}>
        {children}
      </View>
    </KeyboardAvoidingView>
  );
}
