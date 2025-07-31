import { StyleSheet } from 'react-native';
import { MAIN_COLOR, SUB_COLOR } from '@/constants/Colors';

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  assistant: {
    fontSize: 12,
    fontFamily: 'NotoSans_600SemiBold',
    color: '#fff',
    lineHeight: 24,
    textTransform: 'capitalize',
  },
  typing: {
    fontSize: 13,
    lineHeight: 24,
    color: SUB_COLOR,
    fontFamily: 'NotoSans_400Regular',
  },
  ico: {
    width: 20,
    height: 20,
    overflow: 'hidden',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: SUB_COLOR,
    borderTopColor: MAIN_COLOR,
  }
});