import { View, Text, TextInput } from 'react-native';
import { useRef, useState } from 'react';
import { ImageBackground } from 'expo-image';

import { IconGoogle } from '@/components/icons/IconGoogle';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import { styles } from '@/pages/login-page/content/login-main/styles';
import { LinearGradient } from 'expo-linear-gradient';
import { OtpContent } from '@/pages/login-page/content/login-main/content/OtpContent';
import { STEPS } from '@/pages/login-page/content/login-main/constants';



export const LoginMain = () => {
  const [email, setEmail] = useState('');
  const [activeEmail, setActiveEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const emailRef = useRef<TextInput>(null);
  const [currentStep, setCurrentStep] = useState<STEPS>(STEPS.START);



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

    setCurrentStep(STEPS.OTP);
  };

  return (
    <ImageBackground
      source={require('../../../../assets/images/login-bg.jpg')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0.85)', 'transparent']}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={{ flex: 1 }}
      >
        <View
          style={styles.wrapper}
        >
          {currentStep === STEPS.START && (
            <>
              <View style={styles.row}>
                <Text style={styles.text}>
                  Enter your email to log in
                </Text>
              </View>
              <View style={styles.row}>
                <TextInput
                  ref={emailRef}
                  style={styles.emailInput}
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  onChangeText={setEmail}
                  placeholderTextColor="#737373"
                />
                {emailError ? (
                  <Text style={{ color: 'red', marginTop: 8 }}>Please enter a valid email address.</Text>
                ) : null}
              </View>
              <View style={styles.row}>
                <CustomButton
                  text="Continue"
                  handlePress={onContinuePress}
                />
              </View>
            </>
          )}

          {currentStep === STEPS.OTP && (
            <OtpContent
              activeEmail={activeEmail}
            />
          )}
          <View style={styles.row}>
            <Text style={styles.text}>
              or
            </Text>
          </View>
          <CustomButton
            text="Continue with Google"
            Icon={<IconGoogle/>}
          />
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};
