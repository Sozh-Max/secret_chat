import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-get-random-values';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GlobalProvider, useGlobal } from '@/src/contexts/GlobalContext';
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
import { UserProvider, useUser } from '@/src/contexts/UserContext';
import { useCallback, useEffect, useRef } from 'react';
import { Keyboard, View } from 'react-native';
import { ComplaintProvider } from '@/src/contexts/ComplaintContext';
import { ApiProvider } from '@/src/contexts/ApiContext';
import appsFlyer from 'react-native-appsflyer';
import { useMode } from '@/src/hooks/useMode';
import { useDevice } from '@/src/hooks/useDevice';
import { PaymentsProvider } from '@/src/contexts/PaymentsContext';
import * as SplashScreen from 'expo-splash-screen';
import { FullscreenLoader } from '@/src/components/Loaders/FullscreenLoader/FullscreenLoader';
import { KeyboardProvider } from 'react-native-keyboard-controller';

const GOOGLE_WEB_AUTH_CLIENT_ID = Constants.expoConfig?.extra?.GOOGLE_WEB_AUTH_CLIENT_ID;
const APPSFLYER_DEV_KEY = Constants.expoConfig?.extra?.APPSFLYER_DEV_KEY;

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_AUTH_CLIENT_ID,
  scopes: ['profile', 'email'],
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});

SplashScreen.preventAutoHideAsync().catch(() => {});

function RootNavigator() {
  const { isAuthorized, isCheckAuthorized } = useUser();
  const { isAppReady } = useGlobal();
  const router = useRouter();
  const didHideSplash = useRef(false);

  const isBootReady =
    isCheckAuthorized && (!isAuthorized || isAppReady);

  useEffect(() => {
    if (!isBootReady) return;

    router.replace(isAuthorized ? '/' : '/login');
  }, [isBootReady, isAuthorized, router]);

  const onLayoutRootView = useCallback(async () => {
    if (!isBootReady) return;
    if (didHideSplash.current) return;

    didHideSplash.current = true;
    await SplashScreen.hideAsync();
  }, [isBootReady]);

  if (!isBootReady) {
    return null;
  }

  return (
    <KeyboardProvider>
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
          gestureEnabled: false,
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

        <Stack.Screen
          name="modal-bottom"
          options={{
            presentation: 'transparentModal',
            gestureEnabled: true,
            headerShown: false,
            animation: 'fade',
            contentStyle: { backgroundColor: 'transparent' },
          }}
        />
      </Stack>
    </View>
    </KeyboardProvider>
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

  const { isDev } = useMode();
  const { isAndroid } = useDevice();

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => {});
    const hide = Keyboard.addListener('keyboardDidHide', () => {});

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  useEffect(() => {
    const options = {
      devKey: APPSFLYER_DEV_KEY,
      isDebug: isDev,
      onInstallConversionDataListener: true,
      onDeepLinkListener: true,
    };

    if (isAndroid) {
      appsFlyer.initSdk(
        options,
        (result: string) => console.log('AppsFlyer init success', result),
        (error: Error) => console.error('AppsFlyer init error', error)
      );
    }
  }, [isAndroid, isDev]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={DarkTheme}>
      <UserProvider>
        <ApiProvider>
          <GlobalProvider>
            <SafeAreaProvider>
              <ComplaintProvider>
                <PaymentsProvider>
                  <LinearGradient
                    colors={['rgb(5, 4, 4)', 'rgb(22, 22, 22)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{ flex: 1 }}
                  >
                    <RootNavigator />
                    <FullscreenLoader />
                    <StatusBar style="light" />
                  </LinearGradient>
                </PaymentsProvider>
              </ComplaintProvider>
            </SafeAreaProvider>
          </GlobalProvider>
        </ApiProvider>
      </UserProvider>
    </ThemeProvider>
  );
}