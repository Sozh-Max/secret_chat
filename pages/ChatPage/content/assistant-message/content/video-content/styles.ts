import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    aspectRatio: 9 / 16,
    borderRadius: 6,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});