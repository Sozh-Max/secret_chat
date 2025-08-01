import { StyleSheet, View } from 'react-native';

import ChatCardShort from '@/components/ChatCardShort/ChatCardShort';
import { useGlobal } from '@/contexts/GlobalContext';


const MainChatList = () => {
  const { dialogPreview } = useGlobal();

  return (
    <View style={styles.body}>
      <View style={styles.body_inner}>
        {dialogPreview.map((dialog) => (
          <ChatCardShort
            key={dialog.id}
            data={dialog}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flexDirection: 'column',
    flexGrow: 1,
    position: 'relative',
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