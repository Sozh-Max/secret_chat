import React from 'react';
import { IDialogItem } from '@/src/contexts/GlobalContext';
import { AGENT_KEYS } from '@/src/constants/agents-data';
import { ROLES } from '@/src/api/constants';
import { UserMessage } from '@/src/screens/ChatPage/content/user-message/UserMessage';
import { AssistantMessage } from '@/src/screens/ChatPage/content/assistant-message/AssistantMessage';

type CombinerMessageProps = {
  dialog: IDialogItem;
  id: AGENT_KEYS;
};

export const CombinerMessage = React.memo(
  function CombinerMessage({ dialog, id }: CombinerMessageProps) {
    return dialog?.replic.role === ROLES.USER
      ? <UserMessage dialog={dialog} />
      : <AssistantMessage dialog={dialog} id={id} />;
  },
  (prev, next) => {
    return (
      prev.id === next.id &&
      prev.dialog.msgId === next.dialog.msgId &&
      prev.dialog.replic.role === next.dialog.replic.role &&
      prev.dialog.replic.content === next.dialog.replic.content &&
      prev.dialog.replic.image === next.dialog.replic.image
    );
  }
);

CombinerMessage.displayName = 'CombinerMessage';
