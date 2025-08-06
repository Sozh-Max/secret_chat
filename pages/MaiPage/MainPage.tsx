import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Header } from '@/pages/MaiPage/content/Header/Header';
import MainChatList from '@/pages/MaiPage/content/MainChatList/MainChatList';
import Footer from '@/pages/MaiPage/content/Footer/Footer';

export const MainPage = () => {

  return (
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
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    height: '100%',
  },
});