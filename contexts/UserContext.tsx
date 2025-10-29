import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { mainUtils } from '@/services/main-utils';
import { AsyncStorageService } from '@/services/async-storage-service';
import { LOCAL_STORAGE_KEYS } from '@/services/constants';

interface IUserData {
  email: string;
  userId: string;
  isAuthorized: boolean;
}

interface IUserContext extends IUserData {
  isCheckAuthorized: boolean;
  setAuthorizedData: (data: IUserData) => void;
  logout: () => void;
}

export type UserData = IUserContext | null;

const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider = (
  { children }:
  { children: ReactNode }
) => {
  const [userId, setUserId] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isCheckAuthorized, setIsCheckAuthorized] = useState<boolean>(false);


  useEffect(() => {
    mainUtils.getUserData().then((data: UserData) => {
      if (data && data.email && data.userId) {
        setIsAuthorized(data.isAuthorized);
        setUserId(data.userId);
        setEmail(data.email);
      }
    }).finally(() => {
      setIsCheckAuthorized(true);
    });
  }, []);

  const setAuthorizedData = async (data: IUserData) => {
    setIsAuthorized(data.isAuthorized);
    setUserId(data.userId);
    setEmail(data.email);
    await AsyncStorageService.storeData(
      LOCAL_STORAGE_KEYS.USER_DATA,
      JSON.stringify({
        email: data.email,
        userId: data.userId,
        isAuthorized: data.isAuthorized,
      }),
    );
  }

  const logout = async () => {
    setIsAuthorized(false);
    setUserId('');
    setEmail('');
    await AsyncStorageService.removeData(
      LOCAL_STORAGE_KEYS.USER_DATA,
    );
  }

  return (
    <UserContext.Provider value={{
      userId,
      email,
      isAuthorized,
      logout,
      isCheckAuthorized,
      setAuthorizedData,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};