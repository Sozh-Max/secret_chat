import { StyleSheet } from 'react-native';
import { MAIN_COLOR } from '@/constants/Colors';

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
    borderBottomColor: '#373737',
    borderTopColor: '#373737',
    borderLeftColor: '#373737',
    borderRightColor: '#373737',
  },
  emailText: {
    color: MAIN_COLOR,
    width: '100%',
    fontSize: 14,
    fontFamily: 'NotoSans_400Regular',
    textAlign: 'center',
  },
});