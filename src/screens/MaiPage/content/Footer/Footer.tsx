import React from 'react';

import { View, Text, StyleSheet, Pressable, Linking } from 'react-native';
import { MAIN_ICON_COLOR } from '@/src/constants/Colors';


const Footer = () => {
  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <View
      style={styles.wrapper}
    >
      <Pressable onPress={() => openLink('https://developtechs.com/privacy-notice/')}>
        <Text style={styles.link}>Privacy Policy</Text>
      </Pressable>
      <Text style={styles.separator}>•</Text>
      <Pressable onPress={() => openLink('https://developtechs.com/terms-of-use/')}>
        <Text style={styles.link}>Terms of Use</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  link: {
    color: MAIN_ICON_COLOR,
    textTransform: 'uppercase',
    paddingLeft: 6,
    paddingRight: 6,
    fontSize: 9,
    fontFamily: 'NotoSans_600SemiBold',
  },
  separator: {
    color: MAIN_ICON_COLOR,
    fontSize: 9,
    fontFamily: 'NotoSans_600SemiBold',
  },
})

export default Footer;
