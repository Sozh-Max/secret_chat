import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  imageWrapper: {
    aspectRatio: 256 / 459,
  },
  image: {
    width: "100%",
    aspectRatio: 256 / 459,
    marginVertical: 3,
    borderRadius: 8,
  },
  modalImageWrapper: {
    width: '90%',
    aspectRatio: 256 / 459,
    overflow: 'hidden',
  },
  modalImage: {
    width: "100%",
    aspectRatio: 256 / 459,
    borderRadius: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
