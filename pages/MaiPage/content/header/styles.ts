import { StyleSheet } from 'react-native';
import { TEXT_SEMIBOLD } from '@/constants/global';

export const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  balance: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  balance_text: {
    color: '#fff',
    fontSize: 12,
    lineHeight: 12,
    fontFamily: TEXT_SEMIBOLD,
  },
  setting: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container_logo: {
    width: 50,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  logo: {
    alignSelf: 'center',
    width: 28,
    height: 28,
  },
});