import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  image_background: {
    flexDirection: 'column',
    flexGrow: 1,
    overflow: 'hidden',
  },
  wrapper: {
    paddingLeft: 13,
    paddingRight: 13,
    height: '100%',
  },
  inner: {
    flexDirection: 'column-reverse',
    flexGrow: 1,
    // scrollBehavior: 'smooth',
  },
});