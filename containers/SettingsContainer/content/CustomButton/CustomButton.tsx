import { PressableProps, Text } from 'react-native';
import { styles } from '@/containers/SettingsContainer/content/CustomButton/styles';
import { AnimatedPressBtn } from '@/components/AnimatedPressBtn/AnimatedPressBtn';
import { ComponentType } from 'react';

type CustomButtonProps = {
  handlePress?: PressableProps['onPress'];
  text: string;
  Icon?: ComponentType<any>;
}

export const CustomButton = ({
  handlePress = () => {},
  text,
  Icon,
}: CustomButtonProps) => (
  <AnimatedPressBtn
    style={styles.button}
    onPress={handlePress}
    scaleEnd={0.98}
  >
    {Icon && <Icon />}
    <Text style={styles.text}>
      {text}
    </Text>
  </AnimatedPressBtn>
)