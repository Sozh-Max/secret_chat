import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
  },
  container: {
    flexDirection: 'row',
    paddingLeft: 13,
    paddingRight: 13,
    flexGrow: 1,
  },
  button: {
    width: 50,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  info: {
    paddingLeft: 13,
    flexGrow: 1,
    justifyContent: 'center',
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