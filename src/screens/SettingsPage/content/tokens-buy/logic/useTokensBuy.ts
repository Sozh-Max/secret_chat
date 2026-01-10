import { useRef, useState } from 'react';
import { TOKEN_VALUES } from '@/src/screens/SettingsPage/content/tokens-buy/constants';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import { styles } from '@/src/screens/SettingsPage/content/tokens-buy/styles';
import { ITokenValue } from '@/src/screens/SettingsPage/content/tokens-buy/TokensBuy';

export const useTokensBuy = () => {
  const [active, setActive] = useState<ITokenValue>(TOKEN_VALUES[0]);
  const [buttonStyle, setButtonStyle] = useState<StyleProp<ViewStyle>>(styles.primary_button)

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
  };

  return {
    animatedValues,
    handlePress,
    buttonStyle,
  }
}