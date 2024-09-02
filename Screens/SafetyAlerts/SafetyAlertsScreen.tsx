import React from 'react';
import { View, Text, Modal, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface SafetyAlertPopupProps {
  visible: boolean;
  onClose: () => void;
}

const SafetyAlertPopup: React.FC<SafetyAlertPopupProps> = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.overlay} onPress={onClose} activeOpacity={1}>
        <View style={styles.popup}>
          <Image 
            source={require('/Users/ajitsatarkar/Documents/React_Native_Git/RN_LoginPOC/RN_LoginDemoApp/images/login/logo.png')} // Ensure you have an alert image in your assets
            style={styles.alertImage}
          />
          <Text style={styles.alertText}>Safety Alert</Text>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: 250,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertImage: {
    width: 60,
    height: 60,
    borderRadius: 25,
    marginBottom: 20,
  },
  alertText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default SafetyAlertPopup;