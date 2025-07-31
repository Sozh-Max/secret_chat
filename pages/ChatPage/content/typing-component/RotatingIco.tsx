import { styles } from '@/pages/ChatPage/content/typing-component/styles';
import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export const RotatingIco = () => {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const rotateLoop = () => {
      spinAnim.setValue(0); // сбрасываем анимацию в 0

      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 650,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => rotateLoop()); // запускаем снова по завершению
    };

    rotateLoop();
  }, []);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return <Animated.View style={[styles.ico, { transform: [{ rotate: spin }] }]} />;
};