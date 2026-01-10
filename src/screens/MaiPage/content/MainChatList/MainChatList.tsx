import { ScrollView, StyleSheet, View } from 'react-native';

import ChatCardShort from '@/src/screens/MaiPage/content/ChatCardShort/ChatCardShort';
import { useGlobal } from '@/src/contexts/GlobalContext';


const MainChatList = () => {
  const { dialogPreview } = useGlobal();

  return (
    <View style={styles.body}>
      <ScrollView
        style={styles.body_inner}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {dialogPreview.map((dialog) => (
          <ChatCardShort
            key={dialog.id}
            data={dialog}
          />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flexDirection: 'column',
    flexGrow: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  body_inner: {
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});

export default MainChatList;