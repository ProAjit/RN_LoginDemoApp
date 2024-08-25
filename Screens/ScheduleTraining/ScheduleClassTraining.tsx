import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { submitTrainingData } from '../../Networking/ClassTrainingServices';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import TrainingList from './TrainingList';

const TrainingDataArr = [
  { noOfTrainees: 111111, department: 'Department 1', supervisor: 'Supervisor 1', location: 'Riyadh office', status: 'Accepted', fromDate: '20 Aug 2024 10:30 AM', toDate: '21 Aug 2024 11:30 AM' },
  { noOfTrainees: 222222, department: 'Department 2', supervisor: 'Supervisor 2', location: 'Pune office', status: 'Under Review', fromDate: '21 Aug 2024 10:30 AM', toDate: '25 Aug 2024 11:30 AM' },
  { noOfTrainees: 333333, department: 'Department 3', supervisor: 'Supervisor 3', location: 'Noida Office', status: 'Submitted', fromDate: '22 Aug 2024 10:30 AM', toDate: '26 Aug 2024 11:30 AM' },
  { noOfTrainees: 444444, department: 'Department 4', supervisor: 'Supervisor 4', location: 'India office', status: 'Approved', fromDate: '23 Aug 2024 10:30 AM', toDate: '27 Aug 2024 11:30 AM' },
  { noOfTrainees: 555555, department: 'Department 5', supervisor: 'Supervisor 5', location: 'UAE office', status: 'Closed', fromDate: '24 Aug 2024 10:30 AM', toDate: '28 Aug 2024 11:30 AM' },
  { noOfTrainees: 666666, department: 'Department 6', supervisor: 'Supervisor 6', location: 'KSA Office', status: 'Rejected', fromDate: '25 Aug 2024 10:30 AM', toDate: '29 Aug 2024 11:30 AM' },
];

const ScheduleClassTraining = () => {
  const [department, setDepartment] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [noOfTrainees, setNoOfTrainees] = useState('');
  const [location, setLocation] = useState('');
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onFromDateChange = (event: any, selectedDate?: Date) => {
    setShowFromDatePicker(false);
    if (selectedDate) {
      setFromDate(selectedDate);
    }
  };

  const onToDateChange = (event: any, selectedDate?: Date) => {
    setShowToDatePicker(false);
    if (selectedDate) {
      setToDate(selectedDate);
    }
  };

  const formatDateTime = (date?: Date) => {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    return `${day}/${month}/${year} \n ${formattedHours}:${minutes} ${ampm}`;
  };

  const handleSubmit = async () => {
    if (department.trim() === '' || supervisor.trim() === '' || noOfTrainees.trim() === '' || location.trim() === '') {
      Alert.alert('Error', 'Please enter values in all fields.');
      return;
    }

    const numTrainees = parseInt(noOfTrainees);
    if (isNaN(numTrainees) || numTrainees < 5 || numTrainees > 30) {
      Alert.alert('Invalid Input', 'Please enter a number between 5 and 30.');
      return;
    }

    setLoading(true); // Show loader

    try {
      const data = {
        department,
        supervisor,
        noOfTrainees: numTrainees,
        location,
        fromDate: fromDate as Date,
        toDate: toDate as Date,
      };
      const response = await submitTrainingData(data);
      // Check the status code and show a message
      if (response.status === 200) {
        Alert.alert('Success', 'Data submitted successfully.');
        handleCancel();
      } else {
        Alert.alert('Error', `Failed to submit data. Status code: ${response.status}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to submit training data.');
    } finally {
      setTimeout(() => {
        setLoading(false); // Hide loader after 0.5 seconds
      }, 500);
    }
  };

  const handleCancel = () => {
    setDepartment('');
    setNoOfTrainees('');
    setSupervisor('');
    setLocation('');
    setFromDate(undefined);
    setToDate(undefined);
  };

  const handleNoOfTraineesChange = (text: string) => {
    setNoOfTrainees(text);
  };

  const handleNoOfTraineesEndEditing = () => {
    const num = parseInt(noOfTrainees);
    if (isNaN(num) || num < 5 || num > 25) {
      Alert.alert('Invalid Input', 'Please enter a number between 5 and 30.');
      setNoOfTrainees('');
    }
  };

  const renderNewRequestContent = () => (
    <>
      <View style={styles.container}>
        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        <Text style={styles.label}>Department Name</Text>
        <TextInput style={styles.input} value={department}
          autoCorrect={false} spellCheck={false}
          onChangeText={setDepartment} />

        <Text style={styles.label}>Supervisor Name</Text>
        <TextInput style={styles.input} value={supervisor}
          autoCorrect={false} spellCheck={false}
          onChangeText={setSupervisor} />

        <Text style={styles.label}>Training on Date & Time</Text>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => setShowFromDatePicker(true)} style={styles.dateInput}>
            <Text>{fromDate ? formatDateTime(fromDate) : 'From Date'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowToDatePicker(true)} style={styles.dateInput}>
            <Text>{toDate ? formatDateTime(toDate) : 'To Date'}</Text>
          </TouchableOpacity>
        </View>

        {showFromDatePicker && (
          <DateTimePicker
            value={fromDate || new Date()}
            mode="datetime"
            display="default"
            onChange={onFromDateChange}
            minimumDate={new Date()} // Today's date
            maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))} // One year from today
          />
        )}

        {showToDatePicker && (
          <DateTimePicker
            value={toDate || new Date()}
            mode="datetime"
            display="default"
            onChange={onToDateChange}
            minimumDate={fromDate || new Date()} // From date or today's date
            maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))} // One year from today
          />
        )}

        <Text style={styles.label}>No. of Trainees</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          autoCorrect={false} spellCheck={false}
          value={noOfTrainees}
          onChangeText={handleNoOfTraineesChange}
          onEndEditing={handleNoOfTraineesEndEditing}
        />

        <Text style={styles.label}>Location</Text>
        <TextInput style={styles.input} value={location}
          autoCorrect={false} spellCheck={false}
          onChangeText={setLocation} />
      </View>
    </>
  );

  const renderHistoryRequestsContent = () => (
    <View style={styles.historyView}>
      <TrainingList data={TrainingDataArr} />
    </View>
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled>
        <View style={styles.segmentedControlContainer}>
          <SegmentedControl
            values={['New Schedule', 'Training History']}
            selectedIndex={selectedIndex}
            onChange={(event) => {
              setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
            }}
            style={styles.segmentedControl}
            tintColor="rgba(2, 28, 52, 1.0)"
            fontStyle={{ fontSize: 15.5, fontWeight: 'bold', color: '#fff' }}
            backgroundColor="rgba(211, 211, 211, 1.0)"
          />
        </View>
        <View style={styles.container}>
          {selectedIndex === 0 ? renderNewRequestContent() : renderHistoryRequestsContent()}
        </View>
      </KeyboardAwareScrollView>
      {selectedIndex === 0 && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Submitting...' : 'Submit'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.whiteButton} onPress={handleCancel} disabled={loading}>
            <Text style={styles.whiteButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#fff',
  },
  segmentedControlContainer: {
    marginVertical: 10,
    paddingHorizontal: 40,
  },
  segmentedControl: {
    height: 35,
  },
  topButtonsContainer: {
    height: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 6,
    marginRight: 6,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  topButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    marginHorizontal: 10,
  },
  activeButton: {
    backgroundColor: 'rgba(2, 28, 52, 1.0)',
  },
  inactiveButton: {
    backgroundColor: '#fff',
    borderColor: 'rgba(2, 28, 52, 1.0)',
    borderWidth: 1,
  },
  activeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inactiveButtonText: {
    color: 'rgba(2, 28, 52, 1.0)',
    fontSize: 16,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    margin: 10,
  },
  button: {
    flex: 1,
    backgroundColor: 'rgba(2, 28, 52, 1.0)',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  whiteButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(2, 28, 52, 1.0)',
  },
  whiteButtonText: {
    color: 'rgba(2, 28, 52, 1.0)',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loaderContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 10,
  },
  historyView: {
    flex: 1,
    padding: 2,
    marginTop: 5,
    backgroundColor: '#fff',
  },
  historyText: {
    fontSize: 18,
    color: 'rgba(2, 28, 52, 1.0)',
  },
});

export default ScheduleClassTraining;