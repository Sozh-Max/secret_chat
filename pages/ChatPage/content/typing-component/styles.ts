import { StyleSheet } from 'react-native';
import { MAIN_COLOR, SUB_COLOR } from '@/constants/Colors';

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingBottom: 16,
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
    borderRadius: 10,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderTopColor: MAIN_COLOR,
    borderRightColor: SUB_COLOR,
    borderBottomColor: SUB_COLOR,
    borderLeftColor: SUB_COLOR,
  }
});