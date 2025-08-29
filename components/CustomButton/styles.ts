import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1e1e1e',
    borderTopColor: '#373737',
  },
  button_disabled: {
    backgroundColor: '#181818',
  },
  text: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'NotoSans_400Regular',
  },
  text_disabled: {
    color: '#535353',
  }
});