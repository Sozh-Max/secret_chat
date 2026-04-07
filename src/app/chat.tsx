import { ChatPage } from '@/src/screens/ChatPage/ChatPage';
import { PageSlideWrapper } from '@/src/components/PageSlideWrapper/PageSlideWrapper';

export default function Chat() {
  return (
    <PageSlideWrapper>
      {/*<View style={{ flex: 1, backgroundColor: '#000000' }}>*/}
        <ChatPage />
      {/*</View>*/}
    </PageSlideWrapper>
  )
}
