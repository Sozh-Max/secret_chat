import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';

import Header from '@/src/screens/ChatPage/content/header/Header';
import ChatInput from '@/src/screens/ChatPage/content/chat-input/ChatInput';
import { ChatWrapper } from '@/src/screens/ChatPage/content/chat-wrapper/ChatWrapper';
import { FormScreenWrapper } from '@/src/components/FormScreenWrapper/FormScreenWrapper';
import { AGENT_KEYS } from '@/src/constants/agents-data';
import { SafeAreaInsectComponent } from '@/src/components/SafeAreaInsectComponent/SafeAreaInsectComponent';
import { useGlobal } from '@/src/contexts/GlobalContext';
import { useUser } from '@/src/contexts/UserContext';
import { useApi } from '@/src/contexts/ApiContext';

export const ChatPage = () => {
  const { id } = useLocalSearchParams<{ id: AGENT_KEYS }>();
  const { userId } = useUser();
  const { api } = useApi();

  const [loading, setLoading] = useState<boolean>(false);

  const { setActiveChatVideoId } = useGlobal();

  useEffect(() => {
    if (!id) {
      router.navigate('/');
    }
  }, []);

  useEffect(() => {
    if (id && userId) {
      api.selectAssistantStatistics({
        assistantId: id,
        userId,
      });
    }

  }, [id, userId]);
  
  useFocusEffect(
    useCallback(() => {
      return () => {
        setActiveChatVideoId(0);
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
              />
            </View>

            <ChatInput
              id={id}
              setLoading={setLoading}
              loading={loading}
            />
          </View>
        </LinearGradient>
      </FormScreenWrapper>
    </SafeAreaInsectComponent>
  );
};