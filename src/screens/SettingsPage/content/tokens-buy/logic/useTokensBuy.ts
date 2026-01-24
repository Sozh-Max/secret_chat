import { useRef, useState } from 'react';
import { TOKEN_VALUES } from '@/src/screens/SettingsPage/content/tokens-buy/constants';
import { Animated, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { ITokenValue } from '@/src/screens/SettingsPage/content/tokens-buy/TokensBuy';

const START_VALUE = 2;
const START_TOKEN_VALUE = TOKEN_VALUES[START_VALUE];

export const useTokensBuy = () => {
  const [active, setActive] = useState<ITokenValue>(START_TOKEN_VALUE);
  const [buttonStyle, setButtonStyle] = useState<StyleProp<ViewStyle>>(START_TOKEN_VALUE.buttonStyle);
  const [buttonTextStyle, setButtonTextStyle] = useState<StyleProp<TextStyle>>(START_TOKEN_VALUE.buttonTextStyle);

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
    setButtonStyle(value.buttonStyle);
    setButtonTextStyle(value.buttonTextStyle);
  };

  return {
    animatedValues,
    handlePress,
    buttonStyle,
    buttonTextStyle,
  }
}