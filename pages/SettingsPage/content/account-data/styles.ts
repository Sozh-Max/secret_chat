import { StyleSheet } from 'react-native';
import { MAIN_ICON_COLOR } from '@/constants/Colors';

export const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
  },
  row: {
    marginTop: 16,
  },
  emailWrapper: {
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderBottomColor: '#1e1e1e',
    borderTopColor: '#1e1e1e',
    borderLeftColor: '#1e1e1e',
    borderRightColor: '#1e1e1e',
  },
  emailText: {
    color: MAIN_ICON_COLOR,
    width: '100%',
    fontSize: 14,
    fontFamily: 'NotoSans_400Regular',
    textAlign: 'center',
  },
});