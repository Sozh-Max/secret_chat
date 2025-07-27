import React from 'react';
import { Button, Modal, StyleSheet, Text, View } from 'react-native';

export const App = ({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: (a: boolean) => void;
}) => {

  return (
    <View style={styles.container}>
      <Button title="Открыть попап" onPress={() => setVisible(true)} />

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)} // Android back button
      >
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <Text style={styles.title}>Привет!</Text>
            <Text>Это модальное окно.</Text>
            <Button title="Закрыть" onPress={() => setVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    elevation: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
});
