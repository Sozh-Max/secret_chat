import { Dimensions, StyleSheet } from 'react-native';

const screenHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    height: screenHeight,
  },
  image_background: {
    flexDirection: 'column',
    flexGrow: 1,
  },
});