import { ChatPage } from '@/pages/ChatPage/ChatPage';
import { ComplaintProvider } from '@/contexts/ComplaintContext';
import { View } from 'react-native';

export default function Chat() {
  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <ComplaintProvider>
        <ChatPage />
      </ComplaintProvider>
    </View>
  )
}
