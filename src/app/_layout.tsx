import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
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
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { ComplaintProvider } from '@/src/contexts/ComplaintContext';
import { ApiProvider } from '@/src/contexts/ApiContext';
import appsFlyer from 'react-native-appsflyer';
import { useMode } from '@/src/hooks/useMode';
import { useDevice } from '@/src/hooks/useDevice';
import { PaymentsProvider } from '@/src/contexts/PaymentsContext';

const GOOGLE_WEB_AUTH_CLIENT_ID = Constants.expoConfig?.extra?.GOOGLE_WEB_AUTH_CLIENT_ID;
const APPSFLYER_DEV_KEY = Constants.expoConfig?.extra?.APPSFLYER_DEV_KEY;

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_AUTH_CLIENT_ID,
  scopes: ['profile', 'email'],
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});

function RootNavigator() {
  const { isAuthorized, isCheckAuthorized } = useUser();
  const { isGlobalHydrated, hadCache, isInitReady } = useGlobal();
  const router = useRouter();
  const segments = useSegments();

  const isOnLogin = segments?.[0] === 'login';

  const shouldShowLoader =
    !isCheckAuthorized ||
    (isAuthorized && (
      !isGlobalHydrated ||
      (!hadCache && !isInitReady)
    ));

  useEffect(() => {
    if (!isCheckAuthorized) return;
    if (shouldShowLoader) return;

    if (isAuthorized) {
      if (isOnLogin) router.replace('/');
    } else {
      if (!isOnLogin) router.replace('/login');
    }
  }, [isCheckAuthorized, shouldShowLoader, isAuthorized, isOnLogin, router]);

  return (
    <View style={{ flex: 1 }}>
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

      {shouldShowLoader && (
        <View
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          pointerEvents="auto"
        >
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
    </View>
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
    const options = {
      devKey: APPSFLYER_DEV_KEY,
      isDebug: isDev,
      onInstallConversionDataListener: true,
      onDeepLinkListener: true,
    };

    if (isAndroid) {
      appsFlyer.initSdk(
        options,
        (result: string) => {
          console.log('AppsFlyer init success', result);
        },
        (error: Error) => {
          console.error('AppsFlyer init error', error);
        }
      );
    }

  }, []);

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
                    <RootNavigator/>
                    <StatusBar translucent style="light" backgroundColor="#000000"/>
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
