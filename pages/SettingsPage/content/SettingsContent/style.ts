import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  title: {
    marginBottom: 16,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#1e1e1e',
    fontSize: 11,
    textTransform: 'uppercase',
    fontFamily: 'NotoSans_400Regular',
    color: '#fff',
  },
  description: {
    fontSize: 12,
    paddingBottom: 8,
    color: '#969696',
    fontFamily: 'NotoSans_400Regular',
  },
});