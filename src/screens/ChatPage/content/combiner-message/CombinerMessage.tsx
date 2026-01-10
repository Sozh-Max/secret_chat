import { IDialogItem } from '@/src/contexts/GlobalContext';
import { AGENT_KEYS } from '@/src/constants/agents-data';
import { ROLES } from '@/src/api/constants';
import { UserMessage } from '@/src/screens/ChatPage/content/user-message/UserMessage';
import { AssistantMessage } from '@/src/screens/ChatPage/content/assistant-message/AssistantMessage';

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