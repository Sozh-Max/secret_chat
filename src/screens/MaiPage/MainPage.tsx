import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Header } from '@/src/screens/MaiPage/content/header/Header';
import MainChatList from '@/src/screens/MaiPage/content/MainChatList/MainChatList';
import Footer from '@/src/screens/MaiPage/content/Footer/Footer';
import { AnimatedScreen } from '@/src/components/animated-screen/AnimatedScreen';

export const MainPage = () => {

  return (
    <AnimatedScreen>
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient
          colors={['rgb(5, 4, 4)', 'rgb(22, 22, 22)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.wrapper}
        >
          <Header></Header>
          <MainChatList></MainChatList>
          <Footer></Footer>
        </LinearGradient>
      </SafeAreaView>
    </AnimatedScreen>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    height: '100%',
  },
});