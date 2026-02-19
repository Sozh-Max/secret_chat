import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    // position: 'fixed',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    // left: 0,
    // bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 3,
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadedImageWrapper: {
    width: 50,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadedImageContainer: {
    position: 'relative',
    width: 25,
    height: 25,
  },
  uploadedImage: {
    width: 25,
    height: 25,
    borderRadius: 3,
  },
  uploadedImageRemove: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: -12,
    top: -7,
    zIndex: 10,
  },
  button_start: {
    paddingLeft: 4,
  },
  button_finish: {
    paddingRight: 4,
  },
  input: {
    flex: 1,
    textAlignVertical: 'center',
    minWidth: 0,
    height: 50,
    color: '#fff',
    fontSize: 14,
    flexGrow: 1,
    paddingBottom: 5,
    paddingTop: 8,
    fontFamily: 'NotoSans_400Regular',
    ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as any) : {}),
  },
  emoji_picker: {
    position: 'absolute',
    height: 36,
    bottom: '100%',
    left: 0,
    width: '100%',
    paddingLeft: 8,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  emoji_btn: {
    marginLeft: 5,
    marginRight: 5,
  },
  emoji: {
    fontSize: 18,
    lineHeight: 36,
  }
});