import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    marginBottom: 16,
  },
  container: {
    flexDirection: 'column',
    gap: 8,
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
    color: '#969696',
    fontFamily: 'NotoSans_400Regular',
  },
});