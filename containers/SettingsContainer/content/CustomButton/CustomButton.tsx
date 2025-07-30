import { PressableProps, Text } from 'react-native';
import { styles } from '@/containers/SettingsContainer/content/CustomButton/styles';
import { AnimatedPressBtn } from '@/components/AnimatedPressBtn/AnimatedPressBtn';
import { ReactNode } from 'react';

type CustomButtonProps = {
  handlePress?: PressableProps['onPress'];
  text: string;
  Icon?: ReactNode;
  disabled?: boolean;
}

export const CustomButton = ({
  handlePress = () => {},
  text,
  Icon,
  disabled = false,
}: CustomButtonProps) => (
  <AnimatedPressBtn
    style={[styles.button, disabled && styles.button_disabled]}
    onPress={handlePress}
    scaleEnd={0.98}
  >
    {Icon && <>{Icon}</>}
    <Text style={[styles.text, disabled && styles.text_disabled]}>
      {text}
    </Text>
  </AnimatedPressBtn>
)