import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  image_background: {
    flexDirection: 'column',
    flexGrow: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  wrapper: {
    paddingLeft: 13,
    paddingRight: 13,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  inner: {
    flexDirection: 'column-reverse',
    flexGrow: 1,
    paddingBottom: 20,
    // scrollBehavior: 'smooth',
  },
});