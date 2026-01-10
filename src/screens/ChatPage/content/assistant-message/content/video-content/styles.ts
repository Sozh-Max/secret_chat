import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    aspectRatio: 9 / 16,
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
  },
  video: {
    width: '100%',
    aspectRatio: 9 / 16,
  },
  button: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -32 }, { translateY: -32 }],
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 32,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsContainer: {
    padding: 10,
  },
  imageWrapper: {
    aspectRatio: 256 / 459,
    position: 'relative',
  },
  image: {
    width: "100%",
    aspectRatio: 256 / 459,
    borderRadius: 6,
    marginVertical: 3,
  },
});