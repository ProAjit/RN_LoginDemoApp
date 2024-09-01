import React from 'react';
import { View, StyleSheet } from 'react-native';
import TrainingList from '../ScheduleTraining/TrainingList';

const TrainingDataArr = [
    { noOfTrainees: 111111, department: 'Department 1', supervisor: 'Supervisor 1', location: 'Riyadh office', status: 'Rescheduled', fromDate: '20 Aug 2024 10:30 AM', toDate: '21 Aug 2024 11:30 AM' },
    { noOfTrainees: 222222, department: 'Department 2', supervisor: 'Supervisor 2', location: 'Jeddah office', status: 'Under Review', fromDate: '21 Aug 2024 10:30 AM', toDate: '25 Aug 2024 11:30 AM' },
    { noOfTrainees: 333333, department: 'Department 3', supervisor: 'Supervisor 3', location: 'Macca Office', status: 'On Hold', fromDate: '22 Aug 2024 10:30 AM', toDate: '26 Aug 2024 11:30 AM' },
    { noOfTrainees: 444444, department: 'Department 4', supervisor: 'Supervisor 4', location: 'Madina office', status: 'Approved', fromDate: '23 Aug 2024 10:30 AM', toDate: '27 Aug 2024 11:30 AM' },
    { noOfTrainees: 555555, department: 'Department 6', supervisor: 'Supervisor 6', location: 'Hessa Office', status: 'Rejected', fromDate: '25 Aug 2024 10:30 AM', toDate: '29 Aug 2024 11:30 AM' },
  ];
  

const UpdateTrainingScreen: React.FC = () => {
  return (
    <View style={styles.historyView}>
        <TrainingList data={TrainingDataArr} />
    </View>
  );
};

const styles = StyleSheet.create({
    historyView: {
    flex: 1,
    padding: 2,
    marginTop: 5,
    marginBottom: 25,
    backgroundColor: '#F4F6FF',
    },
});

export default UpdateTrainingScreen;