import { StyleSheet } from 'react-native';
import { CHAT_COLOR, SUB_COLOR } from '@/constants/Colors';

export const styles = StyleSheet.create({
  wrapper: {
    paddingRight: '23%',
    paddingTop: 12,
    paddingBottom: 24,
  },
  container: {
    backgroundColor: CHAT_COLOR,
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 12,
    paddingBottom: 18,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    alignSelf: 'flex-start',
    maxWidth: '100%',
  },
  header: {
    flexDirection: 'row',
    paddingBottom: 8,
    gap: 8,
    alignItems: 'center',
  },
  name: {
    fontSize: 12,
    fontFamily: 'NotoSans_600SemiBold',
    color: '#fff',
  },
  time: {
    fontSize: 13,
    color: SUB_COLOR,
    fontFamily: 'NotoSans_400Regular',
  },
  content: {
    fontSize: 14,
    fontFamily: 'NotoSans_400Regular',
    color: '#fff',
  },
});
