import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator,
  KeyboardAvoidingView, FlatList, TouchableWithoutFeedback
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { submitTrainingData } from '../../Networking/ClassTrainingServices';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import TrainingList from './TrainingList';
import bottomButtonStyles from '../../Styles/bottomButtonStyles';
import segmentStyle from '../../Styles/segmentStyle';
import { COLORS } from '../../Constants/globalData';
// import { Ionicons } from '@expo/vector-icons'; // Use Ionicons for the dropdown arrow

const regionsData = ['Riyadh', 'Jeddah', 'Macca', 'Madina', 'Hessa'];

const TrainingDataArr = [
  { noOfTrainees: 111111, department: 'Department 1', supervisor: 'Supervisor 1', location: 'Riyadh office', status: 'Rescheduled', fromDate: '20 Aug 2024 10:30 AM', toDate: '21 Aug 2024 11:30 AM' },
  { noOfTrainees: 222222, department: 'Department 2', supervisor: 'Supervisor 2', location: 'Jeddah office', status: 'Under Review', fromDate: '21 Aug 2024 10:30 AM', toDate: '25 Aug 2024 11:30 AM' },
  { noOfTrainees: 333333, department: 'Department 3', supervisor: 'Supervisor 3', location: 'Macca Office', status: 'On Hold', fromDate: '22 Aug 2024 10:30 AM', toDate: '26 Aug 2024 11:30 AM' },
  { noOfTrainees: 444444, department: 'Department 4', supervisor: 'Supervisor 4', location: 'Madina office', status: 'Approved', fromDate: '23 Aug 2024 10:30 AM', toDate: '27 Aug 2024 11:30 AM' },
  { noOfTrainees: 555555, department: 'Department 6', supervisor: 'Supervisor 6', location: 'Hessa Office', status: 'Rejected', fromDate: '25 Aug 2024 10:30 AM', toDate: '29 Aug 2024 11:30 AM' },
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
  const [region, setRegion] = useState(''); // State for selected region
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State for dropdown visibility

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
    if (region.trim() === '' || department.trim() === '' || supervisor.trim() === '' || noOfTrainees.trim() === '' || location.trim() === '') {
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
    setRegion('');
    setFromDate(undefined);
    setToDate(undefined);
  };

  const handleNoOfTraineesChange = (text: string) => {
    setNoOfTrainees(text);
  };

  const handleNoOfTraineesEndEditing = () => {
    const num = parseInt(noOfTrainees);
    if (isNaN(num) || num < 5 || num > 30) {
      Alert.alert('Invalid Input', 'Please enter a number between 5 and 30.');
      setNoOfTrainees('');
    }
  };

  const handleScreenPress = () => {
    if (isDropdownVisible) {
      setIsDropdownVisible(false)
    }
  };

  const renderNewRequestContent = () => (
    <TouchableWithoutFeedback onPress={handleScreenPress}>
      <View style={styles.container}>
        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        {/* Region Dropdown */}
        <Text style={styles.label}>Region</Text>
        <TouchableOpacity
          style={styles.dropdownInput}
          onPress={() => setIsDropdownVisible(!isDropdownVisible)}>
          <TextInput
            placeholder='Select a Region'
            editable={false}
            style={styles.regionText}>{region}
          </TextInput>
          {/* <Ionicons name={isDropdownVisible ? 'chevron-up' : 'chevron-down'} size={20} color="#000" /> */}
        </TouchableOpacity>
        {isDropdownVisible && renderRegionDropdown()}

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
    </TouchableWithoutFeedback>
  );

  const renderHistoryRequestsContent = () => (
    <View style={styles.historyView}>
      <TrainingList data={TrainingDataArr} updateStatus={function (noOfTrainees: number, newStatus: string): void {
        throw new Error('Function not implemented.');
      }} />
    </View>
  );

  const handleRegionSelect = (selectedRegion: React.SetStateAction<string>) => {
    setRegion(selectedRegion);
    setIsDropdownVisible(false);
  };

  const renderRegionDropdown = () => (
    <View style={styles.dropdownContainer}>
      <FlatList
        data={regionsData}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => handleRegionSelect(item)}>
            <Text style={styles.dropdownItemText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: COLORS.appBackground }} behavior="padding">
      <View style={segmentStyle.segmentedControlContainer}>
        <SegmentedControl
          values={['New Schedule', 'Training History']}
          selectedIndex={selectedIndex}
          onChange={(event) => {
            setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
          }}
          style={segmentStyle.segmentedControl}
          tintColor="rgba(2, 28, 52, 1.0)"
          fontStyle={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}
          backgroundColor="rgba(230, 230, 230, 1.0)"
        />
      </View>

      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled >
        <View style={styles.container}>
          {selectedIndex === 0 ? renderNewRequestContent() : renderHistoryRequestsContent()}
        </View>
      </KeyboardAwareScrollView>

      {selectedIndex === 0 && (
        <View style={bottomButtonStyles.buttonContainer}>
          <TouchableOpacity style={bottomButtonStyles.button} onPress={handleSubmit} disabled={loading}>
            <Text style={bottomButtonStyles.buttonText}>{loading ? 'Submitting...' : 'Submit'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={bottomButtonStyles.whiteButton} onPress={handleCancel} disabled={loading}>
            <Text style={bottomButtonStyles.whiteButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: COLORS.appBackground,
    flexDirection: 'column',
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
  dropdownContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    zIndex: 1000,
    height: 200, // Height for all 5 items
    width: '99%', // Full width of the parent container
    marginTop: 70,
    marginLeft: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  dropdownInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  regionText: {
    fontSize: 16,
  },
  dropdownItem: {
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownItemText: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  topButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    marginHorizontal: 10,
  },
  activeButton: {
    backgroundColor: COLORS.appThemeBlue,
  },
  inactiveButton: {
    backgroundColor: '#fff',
    borderColor: COLORS.appThemeBlue,
    borderWidth: 1,
  },
  activeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inactiveButtonText: {
    color: COLORS.appThemeBlue,
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
    backgroundColor: '#fff',
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
    marginBottom: 25,
    backgroundColor: COLORS.appBackground,
  },
  historyText: {
    fontSize: 18,
    color: COLORS.appThemeBlue,
  },
});

export default ScheduleClassTraining;