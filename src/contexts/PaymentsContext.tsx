import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { RevenueCatService } from '@/src/revenue-cat/revenue-cat-service';
import { useUser } from '@/src/contexts/UserContext';
import { useGlobal } from '@/src/contexts/GlobalContext';

type PaymentsContextType = {
  revenueCatService: RevenueCatService;
  isReady: boolean;
  refreshBalance: () => Promise<void>;
};

const PaymentsContext = createContext<PaymentsContextType | null>(null);

export const PaymentsProvider = ({ children }: { children: ReactNode }) => {
  const { userId } = useUser();
  const { updateBalance } = useGlobal();

  const revenueCatServiceRef = useRef(new RevenueCatService());

  const [isReady, setIsReady] = useState(false);


  const refreshBalance = async () => {
    if (!userId) {
      updateBalance(0);
      return;
    }

    // тут должен быть запрос на ваш backend
    // const balance = await api.payments.getTokenBalance(userId);
    // setTokenBalance(balance);

    updateBalance(0);
  };

  useEffect(() => {
    const init = async () => {
      await revenueCatServiceRef.current.initRevenueCat();
      setIsReady(true);
    };

    init().catch((e) => {
      console.error('RevenueCat init error', e);
    });
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const syncRevenueCatUser = async () => {
      try {
        if (userId) {
          await revenueCatServiceRef.current.login(userId);
          await refreshBalance();
        } else {
          // logout только если вам реально нужен anonymous user
          // await revenueCatServiceRef.current.logout();
          updateBalance(0);
        }
      } catch (e) {
        console.error('RevenueCat user sync error', e);
      }
    };

    syncRevenueCatUser();
  }, [userId, isReady]);

  const value = useMemo(
    () => ({
      revenueCatService: revenueCatServiceRef.current,
      isReady,
      refreshBalance,
    }),
    [isReady]
  );

  return (
    <PaymentsContext.Provider value={value}>
      {children}
    </PaymentsContext.Provider>
  );
};

export const usePayments = () => {
  const payments = useContext(PaymentsContext);
  if (!payments) throw new Error('usePayments must be used within PaymentsProvider');
  return payments;
};