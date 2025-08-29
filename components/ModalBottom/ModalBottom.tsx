import { Animated, Dimensions, Modal, TouchableWithoutFeedback, View } from 'react-native';
import { styles } from '@/components/ModalBottom/styles';
import { ReactNode, useEffect, useRef, useState } from 'react';

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
  const [innerShow, setInnerShow] = useState(isShow);

  useEffect(() => {
    if (isShow) {
      setInnerShow(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => {
        setInnerShow(false);
      }, 300)
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
      visible={innerShow}
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