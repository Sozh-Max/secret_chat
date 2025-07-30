import { Pressable, View, Text } from 'react-native';

import { styles } from '@/containers/SettingsContainer/content/TokensBuy/styles';
import { useState } from 'react';

const VALUES: number[] = [100, 500, 2500, 10000];

const getSizeStyle = (value: number) => {
  switch (value) {
    case VALUES[0]:
      return styles.xs;
    case VALUES[1]:
      return styles.s;
    case VALUES[2]:
      return styles.m;
    case VALUES[3]:
      return styles.l;
    default:
      return styles.xs;
  }
}

export const TokensBuy = () => {
  const [active, setActive] = useState<number>(VALUES[0]);


  const handlePress = (value: number) => {
    setActive(value);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {VALUES.map((tokens) => (
          <Pressable
            key={tokens}
            style={[styles.item, active === tokens && styles.item_active]}
            onPress={() => handlePress(tokens)}
          >
            <Text style={[styles.emoji, getSizeStyle(tokens)]}>⭐</Text>
            <Text style={styles.label}>{tokens}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};