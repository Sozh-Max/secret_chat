import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  balance_container: {
    paddingBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  balance: {
    fontSize: 24,
    lineHeight: 36,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'NotoSans_600SemiBold',
  },
  icon: {
    width: 28,
    height: 28,
  }
});