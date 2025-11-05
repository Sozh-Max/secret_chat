import { SafeAreaView } from "react-native";
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

import { Header } from '@/pages/login-page/content/header/Header';
import Footer from '@/pages/MaiPage/content/Footer/Footer';
import { LoginMain } from '@/pages/login-page/content/login-main/LoginMain';
import { useUser } from '@/contexts/UserContext';
import { LoginPageProvider } from '@/contexts/LoginPageContext';

export const LoginPage = () => {
  const { isAuthorized } = useUser()
  const router = useRouter();

  useEffect(() => {
    if (!isAuthorized) return;
    router.replace('/');
  }, [isAuthorized]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoginPageProvider>
        <Header />
        <LoginMain />
        <Footer />
      </LoginPageProvider>
    </SafeAreaView>
  )
}