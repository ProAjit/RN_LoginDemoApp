import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { submitTrainingData } from '../Networking/ClassTrainingServices';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
  const [selectedTab, setSelectedTab] = useState<'newSchedule' | 'trainingHistory'>('newSchedule');

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
          maximumDate={toDate || undefined}
        />
      )}

      {showToDatePicker && (
        <DateTimePicker
          value={toDate || new Date()}
          mode="datetime"
          display="default"
          onChange={onToDateChange}
          minimumDate={fromDate || undefined}
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
      <Text style={styles.historyText}>ToDo: Here is list of old requests</Text>
    </View>
  );

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled
    >
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity
          style={[styles.topButton, selectedTab === 'newSchedule' ? styles.activeButton : styles.inactiveButton]}
          onPress={() => setSelectedTab('newSchedule')}
        >
          <Text style={[styles.buttonText, selectedTab === 'newSchedule' ? styles.activeButtonText : styles.inactiveButtonText]}>New Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.topButton, selectedTab === 'trainingHistory' ? styles.activeButton : styles.inactiveButton]}
          onPress={() => setSelectedTab('trainingHistory')}
        >
          <Text style={[styles.buttonText, selectedTab === 'trainingHistory' ? styles.activeButtonText : styles.inactiveButtonText]}>Training History</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {selectedTab === 'newSchedule' ? renderNewRequestContent() : renderHistoryRequestsContent()}
      </View>

      {selectedTab === 'newSchedule' && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Submitting...' : 'Submit'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.whiteButton} onPress={handleCancel} disabled={loading}>
            <Text style={styles.whiteButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
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
    marginTop: 20,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyText: {
    fontSize: 18,
    color: 'rgba(2, 28, 52, 1.0)',
  },
});

export default ScheduleClassTraining;