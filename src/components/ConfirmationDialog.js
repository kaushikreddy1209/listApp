import React from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';

const ConfirmationDialog = ({ visible, message, onConfirm, onCancel }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text>{message}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Yes" onPress={onConfirm} />
            <Button title="No" onPress={onCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default ConfirmationDialog;