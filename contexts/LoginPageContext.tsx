import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

import { STEPS } from '@/pages/login-page/content/login-main/constants';

interface ILoginPageContext {
  currentStep: STEPS,
  email: string,
  activeEmail: string;
  emailError: boolean;
  loadingSendEmail: boolean;
  setCurrentStep: Dispatch<SetStateAction<STEPS>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setActiveEmail: Dispatch<SetStateAction<string>>;
  setEmailError: Dispatch<SetStateAction<boolean>>;
  setLoadingSendEmail: Dispatch<SetStateAction<boolean>>;
}



const LoginPageContext = createContext<ILoginPageContext | undefined>(undefined);

export const LoginPageProvider = (
  { children }:
  { children: ReactNode }
) => {
  const [currentStep, setCurrentStep] = useState<STEPS>(STEPS.START);
  const [email, setEmail] = useState<string>('');
  const [activeEmail, setActiveEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [loadingSendEmail, setLoadingSendEmail] = useState<boolean>(false);

  return (
    <LoginPageContext.Provider value={{
      currentStep,
      email,
      activeEmail,
      emailError,
      loadingSendEmail,
      setCurrentStep,
      setEmail,
      setActiveEmail,
      setEmailError,
      setLoadingSendEmail,
    }}>
      {children}
    </LoginPageContext.Provider>
  );
};

export const useLoginPage = () => {
  const context = useContext(LoginPageContext);
  if (!context) {
    throw new Error('useLoginPage must be used within a LoginPageProvider');
  }
  return context;
};