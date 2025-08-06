import { Dimensions, StyleSheet } from 'react-native';

const screenHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1, // убираем height: screenHeight
    flexDirection: 'column',
    flexGrow: 1,
  },
});