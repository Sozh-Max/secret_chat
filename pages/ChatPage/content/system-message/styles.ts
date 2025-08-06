import { StyleSheet } from 'react-native';
import { CHAT_COLOR, MAIN_COLOR } from '@/constants/Colors';
import { NotoSans_400Regular } from '@expo-google-fonts/noto-sans';

export const styles = StyleSheet.create({
  wrapper: {
    paddingRight: "23%",
    paddingTop: 12,
    paddingBottom: 16,
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
    fontFamily: 'NotoSans_400Regular',
  },
  img: {
    borderRadius: 8,
    marginBottom: 8,
    marginTop: 12,
    width: 240,
    height: undefined,
    aspectRatio: 1,
    maxWidth: '100%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImageWrapper: {
    width: '90%',
    aspectRatio: 1
  },
  modalImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 10,
  },
});
