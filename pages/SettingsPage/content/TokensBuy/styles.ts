import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 18,
  },
  container: {
    flexDirection: 'row',
    gap: '2%',
    paddingBottom: 6,
    paddingTop: 6,
  },
  item: {
    backgroundColor: '#171717',
    cursor: 'pointer',
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0c0c0c',
  },
  item_active: {
    backgroundColor: '#313131',
    borderColor: '#707070',
  },
  item_wrapper: {
    width: '23.5%',
  },
  emoji: {
    textAlign: 'center',
    lineHeight: 56,
    paddingBottom: 8,
  },
  label: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
  xs: {
    fontSize: 16,
  },
  s: {
    fontSize: 18,
  },
  m: {
    fontSize: 22,
  },
  l: {
    fontSize: 24,
  },
  btn_container: {
    marginTop: 6,
  },
});