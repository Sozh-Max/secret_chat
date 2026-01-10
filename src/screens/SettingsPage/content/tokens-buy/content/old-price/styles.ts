import { StyleSheet } from 'react-native';
import { TEXT_REGULAR } from '@/src/constants/global';

export const styles = StyleSheet.create({
  text: {
    fontFamily: TEXT_REGULAR,
    color: '#969696',
    fontSize: 12,
    lineHeight: 17,
    textDecorationLine: 'line-through',
    textAlign: 'right',
  },
});