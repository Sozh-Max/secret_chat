import { View, Text, TextInput } from 'react-native';
import { useRef, useState } from 'react';

import { CustomButton } from '@/components/CustomButton/CustomButton';
import { styles } from '@/pages/login-page/content/login-main/styles';
import { LinearGradient } from 'expo-linear-gradient';
import { OtpContent } from '@/pages/login-page/content/login-main/content/OtpContent';
import { STEPS } from '@/pages/login-page/content/login-main/constants';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useUser } from '@/contexts/UserContext';
import { useLoginPage } from '@/contexts/LoginPageContext';
import { VideoBackground } from '@/components/video-background/VideoBackground';
import { MAIN_ICON_COLOR } from '@/constants/Colors';
import { useApi } from '@/contexts/ApiContext';
import appsFlyer from 'react-native-appsflyer';
import { useDevice } from '@/hooks/useDevice';

export const LoginMain = () => {
  const emailRef = useRef<TextInput>(null);
  const { bootId, setAuthorizedData } = useUser();
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const { isAndroid } = useDevice();

  const {
    currentStep,
    email,
    emailError,
    loadingSendEmail,
    setCurrentStep,
    setEmail,
    setActiveEmail,
    setEmailError,
    setLoadingSendEmail,
  } = useLoginPage();
  const { api } = useApi();

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();

      if (!user) return;

      if (user?.data?.idToken) {
        const data = await api.auth(user.data.idToken as string, bootId);

        if (data) {
          setAuthorizedData({
            isAuthorized: true,
            userId: data.id,
            email: data.email,
          });

          if (isAndroid) {
            appsFlyer.logEvent('af_complete_authorization', {
              method: 'google',
            });
          }
        }
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Пользователь отменил вход');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Авторизация уже выполняется');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Сервисы Google Play недоступны');
      } else {
        console.error(`error: ${error}`);
      }
    }
  };

  const validateEmail = (value: string) => {
    const trimmed = (value || '').trim();
    if (!trimmed) return false;

    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(trimmed);
  };

  const onContinuePress = () => {
    setEmailError(false);
    setActiveEmail(email);

    if (!validateEmail(email)) {
      setEmailError(true);
      setTimeout(() => {
        emailRef.current?.focus();
      }, 0);
      return;
    }

    setLoadingSendEmail(true);

    api.sendAuthorizeByEmail(email.trim()).then((response) => {
      if (response.ok) {
        setCurrentStep(STEPS.OTP);
      }
    }).finally(() => {
      setLoadingSendEmail(false);
    });
  };

  const setEmailHandler = (value: string) => {
    if (emailError) {
      setEmailError(false);
    }
    setEmail(value);
  };

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };

  const handleEmailBlur = () => {
    setIsEmailFocused(false);
  };

  return (
    <View style={{
      flex: 1,
      position: 'relative',
    }}>
      <VideoBackground />
      <LinearGradient
        colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0.5)', 'transparent']}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={{ flex: 1, position: 'absolute', zIndex: 2, top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <View style={styles.wrapper}>
          {currentStep === STEPS.START && (
            <>
              <View>
                <Text style={styles.text}>
                  Enter your email to sign in
                </Text>
              </View>
              <View>
                <TextInput
                  ref={emailRef}
                  style={[styles.emailInput, emailError && styles.inputError]}
                  placeholder={isEmailFocused ? "" : "email@example.com"}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  onChangeText={setEmailHandler}
                  onFocus={handleEmailFocus}
                  onBlur={handleEmailBlur}
                  placeholderTextColor={MAIN_ICON_COLOR}
                  cursorColor={MAIN_ICON_COLOR}
                  textAlign={'center'}
                />
              </View>
              <View>
                <CustomButton
                  text="Continue"
                  handlePress={onContinuePress}
                  disabled={loadingSendEmail}
                />
              </View>
            </>
          )}

          {currentStep === STEPS.OTP && (
            <OtpContent />
          )}
          <View style={styles.row}>
            <View style={styles.line} />
            <Text style={styles.text}>
              or
            </Text>
            <View style={styles.line} />
          </View>
          <CustomButton
            text="Continue with Google"
            handlePress={signIn}
          />
        </View>
      </LinearGradient>
    </View>
  );
};