import { Image } from 'expo-image';
import { View } from 'react-native';
import { STEPS } from '@/pages/login-page/content/login-main/constants';
import { AnimatedPressBtn } from '@/components/AnimatedPressBtn/AnimatedPressBtn';
import { styles } from '@/pages/login-page/content/login-main/styles';
import { IconBackBtn } from '@/components/icons/IconBackBtn';
import { useLoginPage } from '@/contexts/LoginPageContext';

export const Header = () => {
  const { currentStep, setCurrentStep, setEmail } = useLoginPage();

  const handlePressBackBtn = () => {
    setCurrentStep(STEPS.START);
    setEmail('');
  }

  return (
    <View
      style={{
        height: 60,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'none',
        zIndex: 1,
      }}
    >
      <View
        style={{
          width: 60,
          justifyContent: 'center',
          flexDirection: 'row',
        }}
      >
      {currentStep === STEPS.OTP ? (
        <AnimatedPressBtn
          style={styles.buttonBack}
          onPress={handlePressBackBtn}
        >
          <IconBackBtn
            color={"#ffffff"}
          />
        </AnimatedPressBtn>
      ): (
        <Image
          source={require('@/assets/images/logo.png')}
          style={{
            alignSelf: 'center',
            width: 28,
            height: 28,
          }}
        />
      )}
      </View>
    </View>
  );
};
