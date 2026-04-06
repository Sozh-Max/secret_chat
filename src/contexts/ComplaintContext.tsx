import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { router } from 'expo-router';

import { useGlobal } from '@/src/contexts/GlobalContext';
import { useUser } from '@/src/contexts/UserContext';
import { useApi } from '@/src/contexts/ApiContext';
import { AgentId } from '@/src/interfaces/global';

type ComplaintContextType = {
  activeComplaint: AgentId | null;
  showComplaintChat: AgentId | null;
  activateComplaint: (id: AgentId) => void;
  setShowComplaintChat: (id: AgentId | null) => void;
  disActiveComplaint: () => void;
  sendComplaint: () => void;
}

const ComplaintContext = createContext<ComplaintContextType | undefined>(undefined);

export const ComplaintProvider = (
  { children }:
  { children: ReactNode },
) => {
  const { dialogs, setDialogs } = useGlobal();
  const { userId } = useUser();
  const { messageService } = useApi();

  const [activeComplaint, setActiveComplaint] = useState<AgentId | null>(null);
  const [showComplaintChat, setShowComplaintChat] = useState<AgentId | null>(null);
  const [isShowComplaint, setShowComplaint] = useState<boolean>(false);

  const activateComplaint = (id: AgentId) => {
    setShowComplaint(true);
    setActiveComplaint(id);
    setShowComplaintChat(null);
  };

  const disActiveComplaint = () => {
    setShowComplaint(false);
    setActiveComplaint(null);
  };

  useEffect(() => {
    if (isShowComplaint) {
      router.push({
        pathname: '/modal-bottom',
      })
    }
  }, [isShowComplaint]);

  const sendComplaint = async () => {
    const id = activeComplaint;

    if (id && dialogs[id]) {
      await messageService.sendComplaint({
        dialog: dialogs[id],
        id: userId,
      })
        .then(async (result) => {
          if (result.ok) {
            const data = await result.json();
            if (data) {
              complaintSucceeded(id);
            }
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
  };

  const complaintFailed = (id?: AgentId) => {
    if (id) {
      setShowComplaintChat(id);
    } else {
      setShowComplaintChat(null);
    }
    disActiveComplaint();
  };

  const complaintSucceeded = (id: AgentId) => {
    messageService.complaintUserById({
      id,
      setDialogs,
    });
    disActiveComplaint();
  };

  return (
    <ComplaintContext.Provider
      value={{
        activeComplaint,
        activateComplaint,
        disActiveComplaint,
        showComplaintChat,
        setShowComplaintChat,
        sendComplaint,
      }}
    >
      {children}
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