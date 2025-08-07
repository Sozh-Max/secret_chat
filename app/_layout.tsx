import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { GlobalProvider } from '@/contexts/GlobalContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { InitMockDataService } from '@/services/InitMockDataService';

import {
  useFonts,
  NotoSans_400Regular,
  NotoSans_600SemiBold,
  NotoSans_700Bold,
  NotoSans_800ExtraBold,
} from '@expo-google-fonts/noto-sans';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    NotoSans_600SemiBold,
    NotoSans_700Bold,
    NotoSans_800ExtraBold,
  });


  useEffect(() => {
    new InitMockDataService();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <GlobalProvider>
          <Stack
            screenOptions={{
              animation: 'fade', // или 'fade', 'simple_push', 'default', 'slide_from_right'
              headerShown: false,
            }}
          >
            <Stack.Screen name="index"/>
            <Stack.Screen name="chat"/>
            <Stack.Screen name="settings"/>
            <Stack.Screen name="+not-found"/>
          </Stack>
          <StatusBar style="auto"/>
        </GlobalProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
