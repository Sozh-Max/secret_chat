import { IDialogItem } from '@/contexts/GlobalContext';
import { AGENT_KEYS } from '@/constants/agents-data';
import { ROLES } from '@/api/constants';
import { UserMessage } from '@/pages/ChatPage/content/user-message/UserMessage';
import { AssistantMessage } from '@/pages/ChatPage/content/assistant-message/AssistantMessage';

type CombinerMessageProps = {
  dialog: IDialogItem;
  id: AGENT_KEYS;
}

export const CombinerMessage = ({
  dialog,
  id,
}: CombinerMessageProps) => (
  <>
    {dialog?.replic.role === ROLES.USER
      ? <UserMessage dialog={dialog} />
      : <AssistantMessage dialog={dialog} id={id} />
    }
  </>
)