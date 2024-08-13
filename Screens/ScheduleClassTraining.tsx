import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const ScheduleClassTraining = () => {
  const [department, setDepartment] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [noOfTrainees, setNoOfTrainees] = useState('');
  const [location, setLocation] = useState('');
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);

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

  const formatDate = (date?: Date) => {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = () => {
    if (department.trim() === '' || supervisor.trim() === '' || noOfTrainees.trim() === '') {
      Alert.alert('Error', 'Please enter values in all fields.');
    } else {
      Alert.alert('Submitted', `Department: ${department}, Supervisor: ${supervisor}, NoOfTrainees: ${noOfTrainees}`);
    }
  };

  const handleCancel = () => {
    setDepartment('');
    setNoOfTrainees('');
    setSupervisor('');
    setLocation('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Department Name</Text>
      <TextInput style={styles.input} value={department} onChangeText={setDepartment} />

      <Text style={styles.label}>Supervisor Name</Text>
      <TextInput style={styles.input} value={supervisor} onChangeText={setSupervisor} />

      <Text style={styles.label}>Training on Date</Text>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => setShowFromDatePicker(true)} style={styles.dateInput}>
          <Text>{fromDate ? formatDate(fromDate) : 'From Date'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowToDatePicker(true)} style={styles.dateInput}>
          <Text>{toDate ? formatDate(toDate) : 'To Date'}</Text>
        </TouchableOpacity>
      </View>

      {showFromDatePicker && (
        <DateTimePicker
          value={fromDate || new Date()}
          mode="date"
          display="default"
          onChange={onFromDateChange}
          maximumDate={toDate || undefined} // Prevent selecting a "From Date" after the "To Date"
        />
      )}

      {showToDatePicker && (
        <DateTimePicker
          value={toDate || new Date()}
          mode="date"
          display="default"
          onChange={onToDateChange}
          minimumDate={fromDate || undefined} // Prevent selecting a "To Date" before the "From Date"
        />
      )}

      <Text style={styles.label}>No. of Trainees</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={noOfTrainees}
        onChangeText={setNoOfTrainees}
      />

      <Text style={styles.label}>Location</Text>
      <TextInput style={styles.input} value={location} onChangeText={setLocation} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.whiteButton} onPress={handleCancel}>
          <Text style={styles.whiteButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
});

export default ScheduleClassTraining;
