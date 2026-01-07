import { Animated, Pressable, View, Text } from 'react-native';
import { styles } from '@/pages/SettingsPage/content/TokensBuy/styles';
import { useRef, useState } from 'react';
import { CustomButton } from '@/components/CustomButton/CustomButton';

interface ITokenValue {
  id: number;
  value: number;
  // @ts-ignore
  styles: any;
}

const TOKEN_VALUES = [
  {
    id: 1,
    value: 500,
    styles: styles.xs,
  },
  {
    id: 2,
    value: 2500,
    styles: styles.s,
  },
  {
    id: 3,
    value: 5000,
    styles: styles.m,
  },
  {
    id: 4,
    value: 10000,
    styles: styles.l,
  },
];

export const TokensBuy = () => {
  const [active, setActive] = useState<ITokenValue>(TOKEN_VALUES[0]);

  // Храним анимации по каждому значению
  const animatedValues = useRef<Record<number, Animated.Value>>(Object.fromEntries(
    TOKEN_VALUES.map((val) => [val.id, new Animated.Value(val.id === active.id ? 1 : 0)])
  )).current;

  const animate = (value: ITokenValue) => {
    TOKEN_VALUES.forEach((val) => {
      Animated.timing(animatedValues[val.id], {
        toValue: val.id === value.id ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });
  };

  const handlePress = (value: ITokenValue) => {
    setActive(value);
    animate(value);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {TOKEN_VALUES.map((token) => {
          const animatedStyle = {
            backgroundColor: animatedValues[token.id].interpolate({
              inputRange: [0, 1],
              outputRange: ['#171717', '#313131'],
            }),
            borderColor: animatedValues[token.id].interpolate({
              inputRange: [0, 1],
              outputRange: ['#0c0c0c', '#707070'],
            }),
            transform: [{
              scale: animatedValues[token.id].interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.02],
              }),
            }],
          };

          return (
            <Pressable
              key={token.id}
              onPress={() => handlePress(token)}
              style={styles.item_wrapper}
            >
              <Animated.View style={[styles.item, animatedStyle]}>
                <Text style={[styles.emoji, token.styles]}>⭐</Text>
                <Text style={styles.label}>{token.value}</Text>
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