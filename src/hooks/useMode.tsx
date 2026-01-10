import { MODE_DEVELOPMENT, MODE_PRODUCTION } from '@/src/constants/global';
import Constants from 'expo-constants';

const MODE = Constants.expoConfig?.extra?.ENV;

export const useMode = () => {

  return {
    isProd: MODE_PRODUCTION === MODE,
    isDev: MODE_DEVELOPMENT === MODE,
  };
}