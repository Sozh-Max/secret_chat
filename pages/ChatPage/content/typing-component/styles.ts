import { StyleSheet } from 'react-native';
import { CHAT_COLOR, DISMISS_ICON_COLOR, MAIN_ICON_COLOR } from '@/constants/Colors';

export const styles = StyleSheet.create({
  wrapper: {
    paddingRight: '23%',
    paddingTop: 10,
    paddingBottom: 10,
  },
  container: {
    backgroundColor: CHAT_COLOR,
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 12,
    paddingBottom: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    alignSelf: 'flex-start',
    maxWidth: '100%',
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
    color: DISMISS_ICON_COLOR,
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
    borderTopColor: MAIN_ICON_COLOR,
    borderRightColor: DISMISS_ICON_COLOR,
    borderBottomColor: DISMISS_ICON_COLOR,
    borderLeftColor: DISMISS_ICON_COLOR,
  },
});