import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import { ReactNode, RefObject, useState } from 'react';
import { EaseView } from 'react-native-ease';

type AnimatedPressBtnProps = {
  style?: StyleProp<ViewStyle> | ((args: { pressed: boolean }) => StyleProp<ViewStyle>);
  wrapperStyle?: StyleProp<ViewStyle>;
  children: ReactNode;
  onPress?: PressableProps['onPress'];
  scaleEnd?: number;
  customRef?: RefObject<any> | null;
  disabled?: boolean;
};

export const AnimatedPressBtn = ({
  style,
  wrapperStyle,
  children,
  onPress = () => {},
  scaleEnd = 0.85,
  customRef,
  disabled = false,
}: AnimatedPressBtnProps) => {
  const [isPressedIn, setIsPressedIn] = useState(false);

  return (
    <Pressable
      onPressIn={() => setIsPressedIn(true)}
      onPressOut={() => setIsPressedIn(false)}
      onPress={onPress}
      ref={customRef}
      style={wrapperStyle}
      disabled={disabled}
    >
      {({ pressed }) => {
        const baseStyle = typeof style === 'function' ? style({ pressed }) : style;

        return (
          <EaseView
            animate={{ scale: isPressedIn && !disabled ? scaleEnd : 1 }}
            transition={{
              type: 'spring',
              damping: 20,
              stiffness: 250,
              mass: 1,
            }}
            style={baseStyle}
          >
            {children}
          </EaseView>
        );
      }}
    </Pressable>
  );
};