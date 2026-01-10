import { Image } from 'expo-image';
import { View } from 'react-native';
import { STEPS } from '@/src/screens/login-page/content/login-main/constants';
import { AnimatedPressBtn } from '@/src/components/AnimatedPressBtn/AnimatedPressBtn';
import { styles } from '@/src/screens/login-page/content/login-main/styles';
import { IconBackBtn } from '@/src/components/icons/IconBackBtn';
import { useLoginPage } from '@/src/contexts/LoginPageContext';
import { SUB_MAIN_ICON_COLOR } from '@/src/constants/Colors';

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
        zIndex: 5,
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
            color={SUB_MAIN_ICON_COLOR}
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
