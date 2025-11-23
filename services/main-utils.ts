import { NativeModules, Platform } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

import { AsyncStorageService } from '@/services/async-storage-service';
import { LOCAL_STORAGE_KEYS, PLATFORM } from '@/services/constants';
import { UserData } from '@/contexts/UserContext';

class MainUtils {
  getDeviceRegion = (): string => {
    const deviceLocale = Platform.OS === PLATFORM.IOS
      ? NativeModules.SettingsManager.settings.AppleLocale
      : NativeModules.I18nManager?.localeIdentifier ?? 'default';

    return deviceLocale?.split('_')[0]?.toLowerCase() || '';
  }

  getBootId = async (): Promise<string> => {
    const uid = await AsyncStorageService.getData(LOCAL_STORAGE_KEYS.BOOT_ID);

    if (!uid) {
      const id = uuidv4();

      await AsyncStorageService.storeData(LOCAL_STORAGE_KEYS.BOOT_ID, id);
      return id;
    }

    return uid;
  }

  getUserData = async (): Promise<UserData> => {
    const userData = await AsyncStorageService.getData(LOCAL_STORAGE_KEYS.USER_DATA);
    if (!userData) {
      return null;
    }
     return JSON.parse(userData) || null;
  }
}

export const mainUtils: MainUtils = new MainUtils();
