import { Platform } from 'react-native';
import { PLATFORM } from '@/services/constants';

export const useDevice = () => {

  return {
    isAndroid: Platform.OS === PLATFORM.ANDROID,
    isIOS: Platform.OS === PLATFORM.IOS,
  }
}