import { useEffect } from 'react';
import * as Application from 'expo-application';

import { AsyncStorageService } from '@/services/async-storage-service';
import { LOCAL_STORAGE_KEYS, PLATFORM } from '@/services/constants';
import { Platform } from 'react-native';
import { Api } from '@/api/api';

const setReferrerToServer = async (api: Api, bootId: string, referrer: string) => {
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


const initGooglePlayInstallReferrer = async (api: Api, bootId: string) => {
  const referrer = await AsyncStorageService.getData(LOCAL_STORAGE_KEYS.GOOGLE_REFERRER);
  if (referrer) {
    await setReferrerToServer(api, bootId, referrer);
  } else if (Platform.OS === PLATFORM.ANDROID && bootId) {
    const referrer = await Application.getInstallReferrerAsync();

    await setReferrerToServer(api, bootId, referrer);
  }
}

export const useGooglePlayInstallReferrer = (api: Api, bootId: string) => {
  useEffect(() => {

    if (bootId && api) {
      setGoogleReferrer(api, bootId);
    }
  }, [bootId, api])
}

const setGoogleReferrer = async (api: Api, bootId: string) => {
  const isSentReferrer = await AsyncStorageService.getData(
    LOCAL_STORAGE_KEYS.IS_SENT_REFERRER,
  );

  if (!isSentReferrer) {
    await initGooglePlayInstallReferrer(api, bootId);
  }
}