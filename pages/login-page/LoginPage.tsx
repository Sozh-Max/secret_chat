import { SafeAreaView } from "react-native";
import { Header } from '@/pages/login-page/content/header/Header';
import Footer from '@/pages/MaiPage/content/Footer/Footer';
import { LoginMain } from '@/pages/login-page/content/login-main/LoginMain';

export const LoginPage = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <Header />
    <LoginMain />
    <Footer />
  </SafeAreaView>
)