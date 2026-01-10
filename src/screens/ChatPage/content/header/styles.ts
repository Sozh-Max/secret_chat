import { StyleSheet } from 'react-native';
import { MAIN_ICON_COLOR } from '@/src/constants/Colors';

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    maxWidth: '100%',
    zIndex: 3,
    width: '100%',
    paddingRight: 7,
  },
  button: {
    width: 50,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_mini: {
    width: 35,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_clear: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_clear_notice: {
    backgroundColor: '#ff0033',
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 12,
  },
  text_clear: {
    fontSize: 10,
    lineHeight: 24,
    fontFamily: 'NotoSans_600SemiBold',
    color: '#fff',
    textTransform: 'uppercase',
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 13,
  },
  info: {
    paddingLeft: 13,
    flexGrow: 1,
    justifyContent: 'center',
    marginRight: 13,
    gap: 2,
  },
  label: {
    fontSize: 14,
    fontFamily: 'NotoSans_600SemiBold',
    lineHeight: 18,
    color: '#fff',
    textTransform: 'capitalize',
  },

  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  rating_value: {
    fontSize: 11,
    lineHeight: 17,
    fontFamily: 'NotoSans_600SemiBold',
    color: MAIN_ICON_COLOR,
    position: 'relative',
  },
});