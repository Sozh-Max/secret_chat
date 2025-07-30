import { Animated, Pressable, View, Text } from 'react-native';
import { styles } from '@/pages/SettingsPage/content/TokensBuy/styles';
import { useRef, useState } from 'react';
import { CustomButton } from '@/pages/SettingsPage/content/CustomButton/CustomButton';

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

  // Храним анимации по каждому значению
  const animatedValues = useRef<Record<number, Animated.Value>>(Object.fromEntries(
    VALUES.map((val) => [val, new Animated.Value(val === active ? 1 : 0)])
  )).current;

  const animate = (value: number) => {
    VALUES.forEach((val) => {
      Animated.timing(animatedValues[val], {
        toValue: val === value ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });
  };

  const handlePress = (value: number) => {
    setActive(value);
    animate(value);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {VALUES.map((tokens) => {
          const animatedStyle = {
            backgroundColor: animatedValues[tokens].interpolate({
              inputRange: [0, 1],
              outputRange: ['#171717', '#313131'],
            }),
            borderColor: animatedValues[tokens].interpolate({
              inputRange: [0, 1],
              outputRange: ['#0c0c0c', '#707070'],
            }),
            transform: [{
              scale: animatedValues[tokens].interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.02],
              }),
            }],
          };

          return (
            <Pressable
              key={tokens}
              onPress={() => handlePress(tokens)}
              style={styles.item_wrapper}
            >
              <Animated.View style={[styles.item, animatedStyle]}>
                <Text style={[styles.emoji, getSizeStyle(tokens)]}>⭐</Text>
                <Text style={styles.label}>{tokens}</Text>
              </Animated.View>
            </Pressable>
          );
        })}
      </View>
      <View style={styles.btn_container}>
        <CustomButton
          text="Buy"
          disabled={true}
        />
      </View>
    </View>
  );
};