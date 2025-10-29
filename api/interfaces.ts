import { AGENT_KEYS } from '@/constants/agents-data';
import { ROLES } from '@/api/constants';

export interface IMessage {
  role: ROLES;
  content: string;
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