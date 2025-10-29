import { useEffect } from 'react';
import * as Application from 'expo-application';

import { AsyncStorageService } from '@/services/async-storage-service';
import { LOCAL_STORAGE_KEYS } from '@/services/constants';
import { api } from '@/api/api';
import { Platform } from 'react-native';

const initGooglePlayInstallReferrer = async (geo: string, id: string) => {
  // const lastReferrer = await AsyncStorageService.getData(LOCAL_STORAGE_KEYS.GOOGLE_REFERRER);

  if (Platform.OS === 'android' && id) {
    const referrer = await Application.getInstallReferrerAsync();

    await api.launchingStatistics({
      userId: id,
      data: referrer,
    });

    await AsyncStorageService.storeData(
      LOCAL_STORAGE_KEYS.GOOGLE_REFERRER,
      JSON.stringify(referrer),
    );
  }

  // if (!lastReferrer && id && Platform.OS === 'android') {
  //
  //
  //   if (referrer) {
  //
  //     await api.sendGooglePlayInstallReferrer({
  //       ref: referrer,
  //       geo,
  //       id,
  //     });
  //
  //   }
  // }
}

export const useGooglePlayInstallReferrer = (deviceRegion: string, id: string) => {
  useEffect(() => {
    if (id) {
      initGooglePlayInstallReferrer(deviceRegion, id);
    }
  }, [id])
}