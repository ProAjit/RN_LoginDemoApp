import React from 'react';
import { View, StyleSheet } from 'react-native';
import SafetyIncidentsList from '../EndroseSafety/SafetyIncidentsList';

const data = [
  { badgeNumber: 111111, name: 'Employee Name 1', description: '', location: 'Riyadh office', status: 'Open' },
  { badgeNumber: 222222, name: 'Employee Name 2', description: '', location: 'Pune office', status: 'Closed' },
  { badgeNumber: 333333, name: 'Employee Name 3', description: '', location: 'Noida Office', status: 'Open' },
  { badgeNumber: 444444, name: 'Employee Name 4', description: '', location: 'India office', status: 'Closed' },
  { badgeNumber: 555555, name: 'Employee Name 5', description: '', location: 'UAE office', status: 'Open' },
  { badgeNumber: 666666, name: 'Employee Name 6', description: '', location: 'KSA Office', status: 'Closed' },
];

const UpdateTrainingScreen: React.FC = () => {
  return (
    <View style={styles.historyContainer}>
      <SafetyIncidentsList data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  historyContainer: {
    flex: 1,
    marginTop: 5,
    marginBottom: 25,
    backgroundColor: '#F4F6FF',
  },
});

export default UpdateTrainingScreen;