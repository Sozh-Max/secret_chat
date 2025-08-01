import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import Header from '@/pages/ChatPage/content/header/Header';
import ChatInput from '@/pages/ChatPage/content/chat-input/ChatInput';
import { styles } from '@/pages/ChatPage/styles';
import { ChatWrapper } from '@/pages/ChatPage/content/chat-wrapper/ChatWrapper';
import { FormScreenWrapper } from '@/components/FormScreenWrapper/FormScreenWrapper';
import { AGENT_KEYS } from '@/constants/agents-data';
import { SafeAreaInsectComponent } from '@/components/SafeAreaInsectComponent/SafeAreaInsectComponent';

export const ChatPage = () => {
  const { id } = useLocalSearchParams<{ id: AGENT_KEYS }>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!id) {
      router.navigate('/');
    }
  }, []);

  return (
    <SafeAreaInsectComponent>
      <FormScreenWrapper>
        <LinearGradient
          colors={['rgb(5, 4, 4)', 'rgb(22, 22, 22)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.wrapper}
        >
          <Header id={id} />
          <ChatWrapper id={id} loading={loading} />
          <ChatInput id={id} setLoading={setLoading} />
        </LinearGradient>
      </FormScreenWrapper>
    </SafeAreaInsectComponent>
  );
}