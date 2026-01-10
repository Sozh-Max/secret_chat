import { createContext, useContext } from 'react';
import { useUser } from './UserContext';
import { MessageService } from '@/src/services/message-service';
import { Api } from '@/src/api/api';

const ApiContext = createContext<{
  api: Api;
  messageService: MessageService;
} | null>(null);

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
  const { logout } = useUser();

  const api = new Api(() => logout());
  const messageService = new MessageService(api);

  return (
    <ApiContext.Provider
      value={{
        api,
        messageService,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const api = useContext(ApiContext);
  if (!api) throw new Error('useApi must be used within ApiProvider');
  return api;
};