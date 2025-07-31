import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    maxWidth: '100%',
  },
  // container: {
  //   flexDirection: 'row',
  //   paddingLeft: 13,
  //   paddingRight: 13,
  //   flexGrow: 1,
  // },
  button: {
    width: 50,
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
    lineHeight: 22,
    fontFamily: 'NotoSans_600SemiBold',
    color: '#fff',
    position: 'relative',
    top: 2,
  },
});