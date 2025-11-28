import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-get-random-values';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GlobalProvider } from '@/contexts/GlobalContext';
import Constants from 'expo-constants';
import {
  useFonts,
  NotoSans_400Regular,
  NotoSans_500Medium,
  NotoSans_600SemiBold,
  NotoSans_700Bold,
  NotoSans_800ExtraBold,
} from '@expo-google-fonts/noto-sans';
import { LinearGradient } from 'expo-linear-gradient';
import { UserProvider, useUser } from '@/contexts/UserContext';
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

const GOOGLE_WEB_AUTH_CLIENT_ID = Constants.expoConfig?.extra?.GOOGLE_WEB_AUTH_CLIENT_ID;

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_AUTH_CLIENT_ID,
  scopes: ['profile', 'email'],
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});

function RootNavigator() {
  const { isAuthorized, isCheckAuthorized } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isCheckAuthorized) return;

    if (isAuthorized) {
      router.replace('/');
    } else {
      router.replace('/login');
    }
  }, [isCheckAuthorized, isAuthorized]);

  if (!isCheckAuthorized) {

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: ({ current, layouts }) => ({
          cardStyle: {
            transform: [
              {
                translateX: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-layouts.screen.width, 0],
                }),
              },
            ],
          },
        }),
        transitionSpec: {
          open: { animation: 'spring', config: { duration: 200 } },
          close: { animation: 'spring', config: { duration: 200 } },
        },
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="index" />
      <Stack.Screen name="chat" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="+not-found" />

      <Stack.Screen
        name="image-modal"
        options={{
          presentation: 'transparentModal',
          gestureEnabled: true,
          headerShown: false,
          animation: 'fade',
          contentStyle: { backgroundColor: 'transparent' },
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    NotoSans_500Medium,
    NotoSans_600SemiBold,
    NotoSans_700Bold,
    NotoSans_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={DarkTheme}>
      <UserProvider>
        <GlobalProvider>
          <SafeAreaProvider>
            <LinearGradient
              colors={['rgb(5, 4, 4)', 'rgb(22, 22, 22)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{ flex: 1 }}
            >
              <RootNavigator />
              <StatusBar translucent style="light" backgroundColor="#000000" />
            </LinearGradient>
          </SafeAreaProvider>
        </GlobalProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
