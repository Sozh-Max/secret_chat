import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-get-random-values';

import { GlobalProvider } from '@/contexts/GlobalContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { InitMockDataService } from '@/services/init-mock-data-service';

import {
  useFonts,
  NotoSans_400Regular,
  NotoSans_600SemiBold,
  NotoSans_700Bold,
  NotoSans_800ExtraBold,
} from '@expo-google-fonts/noto-sans';

import { LinearGradient } from 'expo-linear-gradient';

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
        <LinearGradient
          colors={['rgb(5, 4, 4)', 'rgb(22, 22, 22)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ flex: 1 }}
        >
        <GlobalProvider>
          <Stack
            screenOptions={{
              //animation: 'slide_from_right', // или 'fade', 'simple_push', 'default', 'slide_from_right'
              headerShown: false,
              cardStyleInterpolator: ({ current, layouts }) => {
                return {
                  cardStyle: {
                    transform: [
                      {
                        translateX: current.progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-layouts.screen.width, 0], // 👈 с -width → 0 = слева направо
                        }),
                      },
                    ],
                  },
                };
              },
              transitionSpec: {
                open: { animation: 'spring', config: { duration: 200 } },
                close: { animation: 'spring', config: { duration: 200 } },
              },
            }}
          >
            <Stack.Screen name="index"/>
            <Stack.Screen name="chat"/>
            <Stack.Screen name="settings"/>
            <Stack.Screen name="+not-found"/>
          </Stack>
          <StatusBar style="auto"/>
        </GlobalProvider>
        </LinearGradient>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
