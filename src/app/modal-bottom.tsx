import { Animated, Dimensions, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { useEffect, useRef } from 'react';
import { router } from 'expo-router';

import { ModalComplaintContent } from '@/src/screens/ChatPage/content/modal-complaint-content/ModalComplaintContent';
import { useComplaint } from '@/src/contexts/ComplaintContext';

const { height } = Dimensions.get('window');

export default function ModalBottom() {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const { disActiveComplaint, sendComplaint } = useComplaint();

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      router.dismiss();
    }, 300);
  };

  const cancelModal = () => {
    disActiveComplaint();
    closeModal();
  }

  const handleApply = () => {
    sendComplaint();
    closeModal();
  }

  return (
    <View
      style={styles.overlay}
      pointerEvents="box-none"
    >

      <TouchableWithoutFeedback onPress={cancelModal}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          { transform: [{ translateY: slideAnim }] },
        ]}
      >
        <View style={styles.modalContent}>
          <ModalComplaintContent
            handleApply={handleApply}
            handleClose={cancelModal}
          />
        </View>
      </Animated.View>
    </View>
  );
};

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  modalContent: {
    backgroundColor: 'rgb(1, 1, 1)',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 200,
  },
});