import { StyleSheet } from 'react-native';
import { TEXT_REGULAR } from '@/constants/global';

const COLOR = '#E69B07';
const BACKGROUND_COLOR = '#E69B0733';

export const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  container_1: {
    borderColor: COLOR,
    backgroundColor: BACKGROUND_COLOR,
  },
  container_2: {
    borderColor: COLOR,
    backgroundColor: COLOR,
  },
  text: {
    fontSize: 11,
    lineHeight: 14,
    fontFamily: TEXT_REGULAR,
  },
  text_1: {
    color: COLOR,
  },
  text_2: {
    color: 'white',
  },
});