import { useEffect } from 'react';
import * as Application from 'expo-application';

import { AsyncStorageService } from '@/services/async-storage-service';
import { LOCAL_STORAGE_KEYS } from '@/services/constants';
import { api } from '@/api/api';
import { Platform } from 'react-native';

const setReferrerToServer = async (bootId: string, referrer: string) => {
  if (bootId && referrer) {
    await api.launchingStatistics({
      bootId,
      data: referrer,
    }).then(async (data) => {
      if (data.ok) {
        await AsyncStorageService.storeData(
          LOCAL_STORAGE_KEYS.IS_SENT_REFERRER,
          'true',
        );
      }
    });

    await AsyncStorageService.storeData(
      LOCAL_STORAGE_KEYS.GOOGLE_REFERRER,
      JSON.stringify(referrer),
    );
  }
}


const initGooglePlayInstallReferrer = async (geo: string, bootId: string) => {
  const referrer = await AsyncStorageService.getData(LOCAL_STORAGE_KEYS.GOOGLE_REFERRER);
  if (referrer) {
    await setReferrerToServer(bootId, referrer);
  } else if (Platform.OS === 'android' && bootId) {
    const referrer = await Application.getInstallReferrerAsync();

    await setReferrerToServer(bootId, referrer);
  }
}

export const useGooglePlayInstallReferrer = (deviceRegion: string, bootId: string) => {
  useEffect(() => {

    if (bootId) {
      setGoogleReferrer(deviceRegion, bootId);
    }
  }, [bootId])
}

const setGoogleReferrer = async (deviceRegion: string, bootId: string) => {
  const isSentReferrer = await AsyncStorageService.getData(
    LOCAL_STORAGE_KEYS.IS_SENT_REFERRER,
  );

  if (!isSentReferrer) {
    await initGooglePlayInstallReferrer(deviceRegion, bootId);
  }
}