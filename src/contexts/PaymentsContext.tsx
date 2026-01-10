import { createContext, ReactNode, useContext, useEffect, useRef } from 'react';
import { RevenueCatService } from '@/src/revenue-cat/revenue-cat-service';
import { useUser } from '@/src/contexts/UserContext';

const PaymentsContext = createContext<{
  revenueCatService: RevenueCatService;
} | null>(null);

export const PaymentsProvider = ({ children }: { children: ReactNode }) => {
  const { userId } = useUser();

  const revenueCatServiceRef = useRef<RevenueCatService>(new RevenueCatService());

  useEffect(() => {
    revenueCatServiceRef.current.initRevenueCat();
  }, []);

  useEffect(() => {
    const runRevenueAccount = async () => {
      await revenueCatServiceRef.current.logout();
      if (userId) {
        await revenueCatServiceRef.current.login(userId);
      }
    }
    runRevenueAccount();
  }, [userId]);

  return (
    <PaymentsContext.Provider
      value={{
        revenueCatService: revenueCatServiceRef.current,
      }}
    >
      {children}
    </PaymentsContext.Provider>
  );
};

export const usePayments = () => {
  const payments = useContext(PaymentsContext);
  if (!payments) throw new Error('usePayments must be used within PaymentsProvider');
  return payments;
};