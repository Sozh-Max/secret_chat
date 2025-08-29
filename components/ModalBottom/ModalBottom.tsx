import { Animated, Dimensions, Modal, TouchableWithoutFeedback, View } from 'react-native';
import { styles } from '@/components/ModalBottom/styles';
import { ReactNode, useEffect, useRef } from 'react';

const { height } = Dimensions.get('window');

export const ModalBottom = ({
  isShow,
  setHide,
  children,
}: {
  isShow: boolean;
  setHide: () => void;
  children?: ReactNode;
}) => {
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (isShow) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isShow]);

  return (
    <Modal
      transparent
      visible={isShow}
      animationType="none"
    >
      <TouchableWithoutFeedback
        onPress={setHide}
      >
        <View style={styles.backdrop}/>
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          styles.modalContainer,
          { transform: [{ translateY: slideAnim }] },
        ]}
      >
        <View style={styles.modalContent}>
          {children}
        </View>
      </Animated.View>
    </Modal>
  );
};