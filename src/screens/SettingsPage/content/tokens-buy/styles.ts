import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 18,
  },
  container: {
    gap: 12,
    paddingBottom: 6,
    paddingTop: 6,
  },
  item: {
    backgroundColor: '#171717',
    cursor: 'pointer',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 12,
    paddingTop: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0c0c0c',
    height: 68,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  item_col: {
    gap: 8,
  },
  item_active: {
    backgroundColor: '#313131',
    borderColor: '#707070',
  },
  btn_container: {
    marginTop: 6,
  },
  primary_button: {
    backgroundColor: '#1E1E1E',
  },
  secondary_button: {
    backgroundColor: '#E69B07',
  },
  thirty_button: {
    backgroundColor: '#50AC00',
  },
});