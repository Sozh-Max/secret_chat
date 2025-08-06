import React from 'react';

import { View, Text, StyleSheet, Pressable, Linking } from 'react-native';
import { SUB_COLOR } from '@/constants/Colors';


const Footer = () => {
  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <View
      style={styles.wrapper}
    >
      <Pressable onPress={() => openLink('https://caramel-crater-22c.notion.site/Secret-Chat-Privacy-Policy-1d51e68b6acd80daafbed8587d78a87b')}>
        <Text style={styles.link}>Privacy Policy</Text>
      </Pressable>
      <Text style={styles.separator}>•</Text>
      <Pressable onPress={() => openLink('https://caramel-crater-22c.notion.site/Secret-Chat-Terms-of-Use-1d51e68b6acd8040a79bff797fd3346e')}>
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
    color: SUB_COLOR,
    textTransform: 'uppercase',
    paddingLeft: 6,
    paddingRight: 6,
    fontSize: 9,
    fontFamily: 'NotoSans_600SemiBold',
  },
  separator: {
    color: SUB_COLOR,
    fontSize: 9,
    fontFamily: 'NotoSans_600SemiBold',
  },
})

export default Footer;
