import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 50,
    color: '#fff',
    fontSize: 14,
    flexGrow: 1,
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