import { AGENT_KEYS } from '@/constants/agents-data';
import { ROLES } from '@/api/constants';

export interface IMessage {
  role: ROLES,
  content: string;
}

export interface IMessagesRequest {
  assistantId: AGENT_KEYS,
  messages: IMessage[],
}