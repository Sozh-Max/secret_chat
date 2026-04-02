import { PropsWithChildren, useEffect, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { EaseView } from 'react-native-ease';

type AnimatedScreenProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
}>;

export const AnimatedScreen = ({ children, style }: AnimatedScreenProps) => {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    setEntered(true);
  }, []);

  return (
    <EaseView
      style={[{ flex: 1 }, style]}
      initialAnimate={{
        opacity: 0,
        translateY: 10,
        scale: 0.985,
      }}
      animate={{
        opacity: entered ? 1 : 0,
        translateY: entered ? 0 : 10,
        scale: entered ? 1 : 0.985,
      }}
      transition={{
        opacity: {
          type: 'timing',
          duration: 120,
          easing: 'easeOut',
        },
        transform: {
          type: 'timing',
          duration: 180,
          easing: 'easeOut',
        },
      }}
    >
      {children}
    </EaseView>
  );
}