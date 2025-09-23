import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';

import Header from '@/pages/ChatPage/content/header/Header';
import ChatInput from '@/pages/ChatPage/content/chat-input/ChatInput';
import { ChatWrapper } from '@/pages/ChatPage/content/chat-wrapper/ChatWrapper';
import { FormScreenWrapper } from '@/components/FormScreenWrapper/FormScreenWrapper';
import { AGENT_KEYS } from '@/constants/agents-data';
import { SafeAreaInsectComponent } from '@/components/SafeAreaInsectComponent/SafeAreaInsectComponent';
import { useGlobal } from '@/contexts/GlobalContext';
import { useComplaint } from '@/contexts/ComplaintContext';
import { api } from '@/api/api';

export const ChatPage = () => {
  const { id } = useLocalSearchParams<{ id: AGENT_KEYS }>();
  const { uniqueId } = useGlobal()
  const [loading, setLoading] = useState<boolean>(false);
  const [isShowTyping, setShowTyping] = useState<boolean>(false);

  const { setActiveChatVideoId } = useGlobal();
  const { disActiveComplaint } = useComplaint();

  useEffect(() => {
    if (!id) {
      router.navigate('/');
    }
  }, []);

  useEffect(() => {
    if (id && uniqueId) {
      api.selectAssistantStatistics({
        assistantId: id,
        userId: uniqueId,
      })
    }

  }, []);
  
  useFocusEffect(
    useCallback(() => {
      return () => {
        setActiveChatVideoId(0);
        disActiveComplaint();
      };
    }, []),
  );

  return (
    <SafeAreaInsectComponent>
      <FormScreenWrapper>
        <LinearGradient
          colors={['rgb(5, 4, 4)', 'rgb(22, 22, 22)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ flex: 1 }}
        >
          <View style={{ flex: 1 }}>

            <Header
              id={id}
            />

            <View style={{ flex: 1 }}>
              <ChatWrapper
                id={id}
                isShowTyping={isShowTyping}
              />
            </View>

            <ChatInput
              id={id}
              setLoading={setLoading}
              loading={loading}
              setShowTyping={setShowTyping}
            />
          </View>
        </LinearGradient>
      </FormScreenWrapper>
    </SafeAreaInsectComponent>
  );
};