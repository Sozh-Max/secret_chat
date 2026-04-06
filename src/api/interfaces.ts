import { ROLES } from '@/src/api/constants';
import { AgentId } from '@/src/interfaces/global';

export interface IMessage {
  role: ROLES;
  content: string;
  image?: string | null;
}

export interface IMessagesRequest {
  userId: string;
  assistantId: AgentId;
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