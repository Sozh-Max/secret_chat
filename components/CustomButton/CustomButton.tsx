import { PressableProps, Text } from 'react-native';
import { styles } from '@/components/CustomButton/styles';
import { AnimatedPressBtn } from '@/components/AnimatedPressBtn/AnimatedPressBtn';
import { ReactNode, RefObject } from 'react';

type CustomButtonProps = {
  handlePress?: PressableProps['onPress'];
  text: string;
  Icon?: ReactNode;
  disabled?: boolean;
  customRef?: RefObject<any> | null;
}

export const CustomButton = ({
  handlePress = () => {},
  text,
  Icon,
  disabled = false,
  customRef = null,
}: CustomButtonProps) => (
  <AnimatedPressBtn
    style={({ pressed }) => [
      styles.button,
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