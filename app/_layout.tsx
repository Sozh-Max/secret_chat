import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { GlobalProvider } from '@/contexts/GlobalContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { InitMockDataService } from '@/services/InitMockDataService';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  
  useEffect(() => {
    new InitMockDataService();
  }, [])

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

//        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="(main)" options={{ headerShown: false }} />

        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </GlobalProvider>
    </ThemeProvider>
  );
}
