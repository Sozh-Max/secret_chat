import { useEffect } from 'react';
import * as Application from 'expo-application';

import { AsyncStorageService } from '@/services/async-storage-service';
import { LOCAL_STORAGE_KEYS } from '@/services/constants';
import { api } from '@/api/api';
import { Platform } from 'react-native';

const initGooglePlayInstallReferrer = async (geo: string, id: string) => {
  const lastReferrer = await AsyncStorageService.getData(LOCAL_STORAGE_KEYS.GOOGLE_REFERRER);

  if (!lastReferrer && id && Platform.OS === 'android') {
    const referrer = await Application.getInstallReferrerAsync();


    if (referrer) {
      await api.sendGooglePlayInstallReferrer({
        ref: referrer,
        geo,
        id,
      });

      await AsyncStorageService.storeData(
        LOCAL_STORAGE_KEYS.GOOGLE_REFERRER,
        JSON.stringify(referrer),
      );
    }
  }
}

export const useGooglePlayInstallReferrer = (deviceRegion: string, id: string) => {
  useEffect(() => {
    initGooglePlayInstallReferrer(deviceRegion, id);
  }, [id])
}