import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  imageWrapper: {
    aspectRatio: 256 / 459,
  },
  image: {
    width: "100%",
    aspectRatio: 256 / 459,
    borderRadius: 6,
    marginVertical: 3,
  },
  modalImageWrapper: {
    width: '98%',
    aspectRatio: 9 / 16,
    // aspectRatio: 1,
    // paddingBottom: 'calc(98% * (1 / 0.557734))',
  },
  modalImage: {
    width: "100%",
    maxWidth: "100%",
    aspectRatio: 9 / 16,
    borderRadius: 3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
