import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import TrainingList from '../ScheduleTraining/TrainingList';
import { COLORS } from '../../Constants/GlobalData';

const initialData = [
  { noOfTrainees: 10, location: 'Riyadh office', department: 'HR', supervisor: 'John Doe', fromDate: '2023-09-01 10:30 AM', toDate: '2023-09-10 11:30 AM', status: 'Under Review' },
  { noOfTrainees: 15, location: 'Pune office', department: 'IT', supervisor: 'Jane Smith', fromDate: '2023-09-05 10:30 AM', toDate: '2023-09-15 11:30 AM', status: 'Approved' },
  { noOfTrainees: 20, location: 'Noida Office', department: 'Finance', supervisor: 'Alice Johnson', fromDate: '2023-09-10 10:30 AM', toDate: '2023-09-20 11:30 AM', status: 'On Hold' },
  { noOfTrainees: 25, department: 'Department 1', supervisor: 'Supervisor 1', location: 'Riyadh office', status: 'Rescheduled', fromDate: '20 Aug 2024 10:30 AM', toDate: '21 Aug 2024 11:30 AM' },
  { noOfTrainees: 30, department: 'Department 2', supervisor: 'Supervisor 2', location: 'Jeddah office', status: 'Under Review', fromDate: '21 Aug 2024 10:30 AM', toDate: '25 Aug 2024 11:30 AM' },
  { noOfTrainees: 35, department: 'Department 3', supervisor: 'Supervisor 3', location: 'Macca Office', status: 'On Hold', fromDate: '22 Aug 2024 10:30 AM', toDate: '26 Aug 2024 11:30 AM' },
  { noOfTrainees: 40, department: 'Department 4', supervisor: 'Supervisor 4', location: 'Madina office', status: 'Approved', fromDate: '23 Aug 2024 10:30 AM', toDate: '27 Aug 2024 11:30 AM' },
  { noOfTrainees: 45, department: 'Department 6', supervisor: 'Supervisor 6', location: 'Hessa Office', status: 'Rejected', fromDate: '25 Aug 2024 10:30 AM', toDate: '29 Aug 2024 11:30 AM' },
];

const UpdateIncidentsScreen: React.FC = () => {
  const [data, setData] = useState(initialData);

  const updateStatus = (noOfTrainees: number, newStatus: string) => {
    const updatedData = data.map(item =>
      item.noOfTrainees === noOfTrainees ? { ...item, status: newStatus } : item
    );
    setData(updatedData);
  };

  return (
    <View style={styles.historyContainer}>
      <TrainingList data={data} updateStatus={updateStatus} />
    </View>
  );
};

const styles = StyleSheet.create({
  historyContainer: {
    flex: 1,
    marginTop: 5,
    marginBottom: 25,
    backgroundColor: COLORS.appBackground,
    padding: 10,
  },
});

export default UpdateIncidentsScreen;