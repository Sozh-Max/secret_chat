import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { router } from 'expo-router';

import { AGENT_KEYS } from '@/constants/agents-data';
import { useGlobal } from '@/contexts/GlobalContext';
import { useUser } from '@/contexts/UserContext';
import { useApi } from '@/contexts/ApiContext';

type ComplaintContextType = {
  activeComplaint: AGENT_KEYS | null;
  showComplaintChat: AGENT_KEYS | null;
  activateComplaint: (id: AGENT_KEYS) => void;
  setShowComplaintChat: (id: AGENT_KEYS | null) => void;
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

  const [activeComplaint, setActiveComplaint] = useState<AGENT_KEYS | null>(null);
  const [showComplaintChat, setShowComplaintChat] = useState<AGENT_KEYS | null>(null);
  const [isShowComplaint, setShowComplaint] = useState<boolean>(false);

  const activateComplaint = (id: AGENT_KEYS) => {
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

  const complaintFailed = (id?: AGENT_KEYS) => {
    if (id) {
      setShowComplaintChat(id);
    } else {
      setShowComplaintChat(null);
    }
    disActiveComplaint();
  };

  const complaintSucceeded = (id: AGENT_KEYS) => {
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