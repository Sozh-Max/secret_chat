import { NativeModules, Platform } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

import { AsyncStorageService } from '@/services/async-storage-service';
import { LOCAL_STORAGE_KEYS, PLATFORM } from '@/services/constants';

class MainUtils {
  getDeviceRegion = (): string => {
    const deviceLocale = Platform.OS === PLATFORM.IOS
      ? NativeModules.SettingsManager.settings.AppleLocale
      : NativeModules.I18nManager?.localeIdentifier ?? 'test';

    return deviceLocale?.split('_')[0]?.toLowerCase() || '';
  }

  getUniqueId = async (): Promise<string> => {
    const uid = await AsyncStorageService.getData(LOCAL_STORAGE_KEYS.UID);

    if (!uid) {
      const id = uuidv4();

      await AsyncStorageService.storeData(LOCAL_STORAGE_KEYS.UID, id);
      return id;
    }

    return uid;
  }
}

export const mainUtils: MainUtils = new MainUtils();
