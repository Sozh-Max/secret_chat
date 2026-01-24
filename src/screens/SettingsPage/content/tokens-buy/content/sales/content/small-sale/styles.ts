import { StyleSheet } from 'react-native';
import { TEXT_REGULAR } from '@/src/constants/global';

const COLOR = '#969696';
const BACKGROUND_COLOR = '#96969633';

export const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLOR,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  text: {
    fontSize: 9,
    lineHeight: 12,
    fontFamily: TEXT_REGULAR,
    color: COLOR,
  },
});