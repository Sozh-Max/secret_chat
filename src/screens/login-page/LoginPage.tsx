import { View } from 'react-native';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

import { Header } from '@/src/screens/login-page/content/header/Header';
import Footer from '@/src/screens/MaiPage/content/footer/Footer';
import { LoginMain } from '@/src/screens/login-page/content/login-main/LoginMain';
import { useUser } from '@/src/contexts/UserContext';
import { LoginPageProvider } from '@/src/contexts/LoginPageContext';
import { SafeAreaInsectComponent } from '@/src/components/SafeAreaInsectComponent/SafeAreaInsectComponent';
import { FormScreenWrapper } from '@/src/components/FormScreenWrapper/FormScreenWrapper';

export const LoginPage = () => {
  const { isAuthorized } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthorized) return;
    router.replace('/');
  }, [isAuthorized]);

  return (
    <SafeAreaInsectComponent>
      <LoginPageProvider>
        <FormScreenWrapper>
          <View style={{ flex: 1 }}>
            <Header/>
            <LoginMain/>
            <Footer/>
          </View>
        </FormScreenWrapper>
      </LoginPageProvider>
    </SafeAreaInsectComponent>
  );
};