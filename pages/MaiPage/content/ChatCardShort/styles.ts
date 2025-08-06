import { Dimensions, StyleSheet } from 'react-native';
import { MAIN_COLOR } from '@/constants/Colors';

const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  avatar_container: {
    position: 'relative',
  },
  item: {
    paddingTop: 6,
    paddingRight: 6,
    paddingBottom: 6,
    paddingLeft: 19,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(73, 73, 73, 0.1);',
    flexDirection: 'row',
    minHeight: 84,
    alignItems: 'center',
    gap: 13,
    position: 'relative',
  },
  img: {
    borderRadius: 30,
    alignSelf: 'center',
    width: 60,
    height: 60,
  },
  info: {
    flexGrow: 1,
    gap: 8,
  },
  title: {
    fontSize: 14,
    fontFamily: 'NotoSans_600SemiBold',
    lineHeight: 18,
    color: '#fff',
    maxWidth: screenWidth - 115,
    textTransform: 'capitalize',
  },
  title_container: {
    flexDirection: 'row',
    gap: 5,
  },
  description: {
    color: MAIN_COLOR,
    maxWidth: screenWidth - 115,
    width: '100%',
    fontSize: 14,
    fontFamily: 'NotoSans_400Regular',
  },
  message: {
    color: '#ffffff',
  },
  rating: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    right: 16,
    top: 16,
    gap: 2,
  },
  rating_value: {
    fontSize: 11,
    lineHeight: 17,
    fontFamily: 'NotoSans_600SemiBold',
    color: '#fff',
  },
  label: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    fontSize: 9,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4,
    textTransform: 'uppercase',
    fontFamily: 'NotoSans_800ExtraBold',
    borderRadius: 8,
    color: '#ffffff',
  },
  label_hot: {
    backgroundColor: '#ac0034',
  },
  label_new: {
    backgroundColor: '#469501',
  },
});