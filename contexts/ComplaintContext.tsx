import { AGENT_KEYS } from '@/constants/agents-data';

import React, { createContext, ReactNode, useContext, useState } from 'react';
import { ModalBottom } from '@/components/ModalBottom/ModalBottom';
import { ModalBottomContent } from '@/pages/ChatPage/content/ModalBottomContent/ModalBottomContent';

type ComplaintContextType = {
  activeComplaint: AGENT_KEYS | null;
  activateComplaint: (id: AGENT_KEYS) => void;
  disActiveComplaint: () => void;
}

const ComplaintContext = createContext<ComplaintContextType | undefined>(undefined);

export const ComplaintProvider = (
  { children }:
  { children: ReactNode }
) => {
  const [activeComplaint, setActiveComplaint] = useState<AGENT_KEYS | null>(null);
  const [isShowComplaint, setShowComplaint] = useState<boolean>(true);


  const activateComplaint = (id: AGENT_KEYS) => {
    setShowComplaint(true);
    setActiveComplaint(id)
  }

  const disActiveComplaint = () => {
    setShowComplaint(false);
    setActiveComplaint(null)
  }

  return (
    <ComplaintContext.Provider
      value={{
        activeComplaint,
        activateComplaint,
        disActiveComplaint,
      }}
    >
      {children}
      <ModalBottom
        isShow={isShowComplaint}
        setHide={disActiveComplaint}
      >
        <ModalBottomContent
          handleCancel={disActiveComplaint}
        />
      </ModalBottom>
    </ComplaintContext.Provider>
  );
};

export const useComplaint = () => {
  const context = useContext(ComplaintContext);
  if (!context) {
    throw new Error('useGlobal must be used within a ComplaintProvider');
  }
  return context;
};