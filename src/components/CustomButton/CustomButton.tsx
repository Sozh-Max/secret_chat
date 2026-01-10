import { PressableProps, StyleProp, Text, ViewStyle } from 'react-native';
import { styles } from '@/src/components/CustomButton/styles';
import { AnimatedPressBtn } from '@/src/components/AnimatedPressBtn/AnimatedPressBtn';
import { ReactNode, RefObject } from 'react';

type CustomButtonProps = {
  handlePress?: PressableProps['onPress'];
  text: string;
  Icon?: ReactNode;
  disabled?: boolean;
  customRef?: RefObject<any> | null;
  customStyle?: StyleProp<ViewStyle>;
}

export const CustomButton = ({
  handlePress = () => {},
  text,
  Icon,
  disabled = false,
  customRef = null,
  customStyle,
}: CustomButtonProps) => (
  <AnimatedPressBtn
    style={({ pressed }) => [
      styles.button,
      customStyle && customStyle,
      disabled && styles.button_disabled,
      pressed && styles.button_pressed,
    ]}
    onPress={handlePress}
    scaleEnd={0.98}
    customRef={customRef}
  >
    {Icon && <>{Icon}</>}
    <Text style={[styles.text, disabled && styles.text_disabled]}>
      {text}
    </Text>
  </AnimatedPressBtn>
)