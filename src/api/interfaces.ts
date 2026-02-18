import { AGENT_KEYS } from '@/src/constants/agents-data';
import { ROLES } from '@/src/api/constants';

export interface IMessage {
  role: ROLES;
  content: string;
  image?: string | null;
}

export interface IMessagesRequest {
  userId: string;
  assistantId: AGENT_KEYS;
  messages: IMessage[];
}

export interface IResponse<T> {
  msg: string;
  error: number;
  data: T;
}

export interface IResponseUserData  {
  id: string;
  email: string;
}