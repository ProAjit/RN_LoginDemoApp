import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import SafetyAlertPopup from '../SafetyAlertsScreen';


const FeedbackScreen: React.FC = () => {

  const [isPopupVisible, setPopupVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.alertText}>Feedback Screen</Text>
      <Button title="Show Alert" onPress={() => setPopupVisible(true)} />
      <SafetyAlertPopup 
        visible={isPopupVisible} 
        onClose={() => setPopupVisible(false)} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertText: {
    marginBottom: 20,
  },
});

export default FeedbackScreen;
