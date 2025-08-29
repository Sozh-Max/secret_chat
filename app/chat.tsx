import { ChatPage } from '@/pages/ChatPage/ChatPage';
import { ComplaintProvider } from '@/contexts/ComplaintContext';

export default function Chat() {
  return (
    <ComplaintProvider>
      <ChatPage />
    </ComplaintProvider>
  )
}
