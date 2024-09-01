import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SafetyIncidentsList from '../EndroseSafety/SafetyIncidentsList';

const initialData = [
  { badgeNumber: 111111, name: 'Employee Name 1', description: '', location: 'Riyadh office', status: 'Open' },
  { badgeNumber: 222222, name: 'Employee Name 2', description: '', location: 'Pune office', status: 'Closed' },
  { badgeNumber: 333333, name: 'Employee Name 3', description: '', location: 'Noida Office', status: 'Open' },
  { badgeNumber: 444444, name: 'Employee Name 4', description: '', location: 'India office', status: 'Closed' },
  { badgeNumber: 555555, name: 'Employee Name 5', description: '', location: 'UAE office', status: 'Open' },
  { badgeNumber: 666666, name: 'Employee Name 6', description: '', location: 'KSA Office', status: 'Closed' },
];

const UpdateTrainingScreen: React.FC = () => {
  const [data, setData] = useState(initialData);

  const updateStatus = (badgeNumber: number, newStatus: string) => {
    const updatedData = data.map(item =>
      item.badgeNumber === badgeNumber ? { ...item, status: newStatus } : item
    );
    setData(updatedData);
  };

  return (
    <View style={styles.historyContainer}>
      <SafetyIncidentsList data={data} updateStatus={updateStatus} />
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