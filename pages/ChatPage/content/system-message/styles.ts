import { StyleSheet } from 'react-native';
import { CHAT_COLOR, MAIN_COLOR } from '@/constants/Colors';

export const styles = StyleSheet.create({
  wrapper: {
    paddingRight: "23%",
    paddingTop: 12,
    paddingBottom: 24,
  },
  container: {
    backgroundColor: CHAT_COLOR,
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 12,
    paddingBottom: 18,
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    paddingBottom: 8,
    gap: 4,
  },
  title: {
    fontSize: 12,
    color: MAIN_COLOR,
    lineHeight: 24,
    fontFamily: 'NotoSans_600SemiBold',
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: MAIN_COLOR,
  },
  img: {
    borderRadius: 8,
    marginBottom: 8,
    marginTop: 12,
    width: 240,
    height: 240,
  },
});
