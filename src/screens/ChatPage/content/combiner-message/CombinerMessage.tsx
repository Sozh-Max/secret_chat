import React from 'react';
import { IDialogItem } from '@/src/contexts/GlobalContext';
import { ROLES } from '@/src/api/constants';
import { UserMessage } from '@/src/screens/ChatPage/content/user-message/UserMessage';
import { AssistantMessage } from '@/src/screens/ChatPage/content/assistant-message/AssistantMessage';
import { AgentId } from '@/src/interfaces/global';

type CombinerMessageProps = {
  dialog: IDialogItem;
  id: AgentId;
  shouldAnimateContent?: boolean;
};

export const CombinerMessage = React.memo(
  function CombinerMessage({
    dialog,
    id,
    shouldAnimateContent = true,
  }: CombinerMessageProps) {
    return dialog?.replic.role === ROLES.USER ? (
      <UserMessage
        dialog={dialog}
        shouldAnimateContent={shouldAnimateContent}
      />
    ) : (
      <AssistantMessage
        dialog={dialog}
        id={id}
      />
    );
  },
  (prev, next) => {
    return (
      prev.id === next.id &&
      prev.shouldAnimateContent === next.shouldAnimateContent &&
      prev.dialog.msgId === next.dialog.msgId &&
      prev.dialog.replic.role === next.dialog.replic.role &&
      prev.dialog.replic.content === next.dialog.replic.content &&
      prev.dialog.replic.image === next.dialog.replic.image
    );
  }
);

CombinerMessage.displayName = 'CombinerMessage';