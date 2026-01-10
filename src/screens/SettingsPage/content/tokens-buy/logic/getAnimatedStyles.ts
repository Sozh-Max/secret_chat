import { ITokenValue } from '@/src/screens/SettingsPage/content/tokens-buy/TokensBuy';
import { Animated } from 'react-native';

export const getAnimatedStyles = ({
  token,
  animatedValues,
}: {
  token: ITokenValue;
  animatedValues:  Record<number, Animated.Value>;
}) => {
  return {
    backgroundColor: animatedValues[token.id].interpolate({
      inputRange: [0, 1],
      outputRange: ['#171717', token.activeColorBg],
    }),
    borderColor: animatedValues[token.id].interpolate({
      inputRange: [0, 1],
      outputRange: ['#171717', token.borderColor],
    }),
    // transform: [{
    //   scale: animatedValues[token.id].interpolate({
    //     inputRange: [0, 1],
    //     outputRange: [1, 1.02],
    //   }),
    // }],
  };
}