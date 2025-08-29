import { AGENT_KEYS } from '@/constants/agents-data';

import React, { createContext, ReactNode, useContext, useState } from 'react';
import { ModalBottom } from '@/components/ModalBottom/ModalBottom';
import { ModalBottomContent } from '@/pages/ChatPage/content/modal-bottom-content/ModalBottomContent';
import { messageService } from '@/services/message-service';
import { useGlobal } from '@/contexts/GlobalContext';

type ComplaintContextType = {
  activeComplaint: AGENT_KEYS | null;
  showComplaintChat: AGENT_KEYS | null;
  activateComplaint: (id: AGENT_KEYS) => void;
  setShowComplaintChat: (id: AGENT_KEYS | null) => void;
  disActiveComplaint: () => void;
}

const ComplaintContext = createContext<ComplaintContextType | undefined>(undefined);

export const ComplaintProvider = (
  { children }:
  { children: ReactNode }
) => {
  const { dialogs } = useGlobal();

  const [activeComplaint, setActiveComplaint] = useState<AGENT_KEYS | null>(null);
  const [showComplaintChat, setShowComplaintChat] = useState<AGENT_KEYS | null>(null);
  const [isShowComplaint, setShowComplaint] = useState<boolean>(false);

  const activateComplaint = (id: AGENT_KEYS) => {
    setShowComplaint(true);
    setActiveComplaint(id);
    disActiveComplaint();
  }

  const disActiveComplaint = () => {
    setShowComplaint(false);
    setActiveComplaint(null);
  }

  const complaintSucceeded = () => {
    disActiveComplaint();
  }

  const complaintFailed = (id?: AGENT_KEYS) => {
    if (id) {
      setShowComplaintChat(id);
    } else {
      setShowComplaintChat(null);
    }

    disActiveComplaint();
  }

  const sendComplaint = async () => {
    const id = activeComplaint;

    if (id && dialogs[id]) {
      messageService.sendComplaint({ dialog: dialogs[id] })
        .then((result) => {
          if (result.ok) {
            complaintSucceeded();
          } else {
            complaintFailed(id);
          }
        })
        .catch(() => {
          complaintFailed(id);
        });
    } else {
      complaintFailed();
    }
  }

  return (
    <ComplaintContext.Provider
      value={{
        activeComplaint,
        activateComplaint,
        disActiveComplaint,
        showComplaintChat,
        setShowComplaintChat,
      }}
    >
      {children}
      <ModalBottom
        isShow={isShowComplaint}
        setHide={disActiveComplaint}
      >
        <ModalBottomContent
          handleApply={sendComplaint}
          handleCancel={disActiveComplaint}
        />
      </ModalBottom>
    </ComplaintContext.Provider>
  );
};

export const useComplaint = () => {
  const context = useContext(ComplaintContext);
  if (!context) {
    throw new Error('useComplaint must be used within a ComplaintProvider');
  }
  return context;
};