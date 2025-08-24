import { StyleSheet } from 'react-native';
import { CHAT_COLOR, SUB_COLOR } from '@/constants/Colors';

export const styles = StyleSheet.create({
  wrapper: {
    paddingRight: '23%',
    paddingTop: 12,
    paddingBottom: 16,
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
    textTransform: 'capitalize',
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
    maxWidth: '100%',
  },
  modalImageWrapper: {
    width: '98%',
    aspectRatio: 1,
    paddingBottom: 'calc(98% * (1 / 0.557734))',
  },
  modalImage: {
    width: "100%",
    maxWidth: "100%",
    aspectRatio: 9 / 16,
    borderRadius: 3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
