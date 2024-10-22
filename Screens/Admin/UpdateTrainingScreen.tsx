import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, Alert, ActivityIndicator } from 'react-native';
import { COLORS, DEVICE, API, FormatDate } from '../../Constants/GlobalData';
import { updateTrainingStatus } from '../../Networking/Training/ClassTrainingServices';
import AppSingleton from '../../AppSingleton/AppSingleton';
const singleton = AppSingleton.getInstance();

interface TrainingDataItem {
  noOfTrainees: number;
  badgeNumber: string;
  location: string;
  trainingId: number;
  department: string;
  supervisor: string;
  fromDate: string;
  toDate: string;
  status: string;
  subject: string;
  region: string;
}

interface TrainingListProps {
  data: TrainingDataItem[];
  updateStatus: (noOfTrainees: number, newStatus: string) => void;
}

const UpdateTrainingScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TrainingDataItem | null>(null);
  const [data, setData] = useState<TrainingDataItem[]>([]);
  const [show, setShow] = useState(false);
  const statusOptions = ['Rescheduled', 'OnHold', 'Approved', 'Rejected', 'Under Review'];

  const handleStatusPress = (item: TrainingDataItem) => {
    if (item.status !== 'Approved' && item.status !== 'Rejected') {
      setSelectedItem(item);
      setModalVisible(true);
    }
  };

  const handleStatusSelect = async (newStatus: string) => {
    setModalVisible(false)
    console.log('\nhandleStatusfor', selectedItem?.trainingId)
    if (selectedItem) {
      setShow(true)
      // Create the request body for the API call
      const requestBody = {
        TrainingId: selectedItem.trainingId,
        NewStatus: newStatus,   // New status selected
      };
  
      try {
        // Call the POST API
        const response = await updateTrainingStatus(requestBody);
        // Check if the response is successful
        if (response.TrainingSchedule.Status) {
          const msg = `Training# ` + selectedItem.trainingId + ` has been updated to ` + response.TrainingSchedule.Status
          Alert.alert('Success', msg);
          // Close the modal and reset the selected item
          setModalVisible(false);
          setSelectedItem(null);
          // Refresh the data list by calling fetchData
          await fetchData();
        } else {
          Alert.alert('Error', 'Unable to update training status.');
        }
        setShow(false)
      } catch (error) {
        Alert.alert('Error', 'An error occurred while updating the training status.');
        setShow(false)
      }
    }
  };

  // Function to call API and fetch data
  const fetchData = async () => {
    try {
      const getTrainingsURL = API.TestAdminBaseURL + '/getTrainingListByRegion?Region=' + singleton.region
      console.log('\nAPI call getTrainingsURL', getTrainingsURL);
      const response = await fetch(getTrainingsURL);
      const json = await response.json();
      console.log('\nTrainingList SUCCESS');
      console.log('\ngetTrainingList SUCCESS', json);
      // Parse the response to map to DataItem format
      const parsedData: TrainingDataItem[] = json["TrainingSchedules"].map((training: any) => ({
        noOfTrainees: Number(training["NumberOfTrainees"]),
        badgeNumber: Number(training["Badgenumber"]),
        department: training["Department"],
        supervisor: training["Supervisor"],
        location: training["Location"],
        toDate: training["ToDate"],
        subject: training["Subject"],
        fromDate: training["FromDate"],
        status: training["Status"],
        region: training["Region"],
        trainingId: Number(training["TrainingId"]),
      }));
      setData(parsedData);  // Set parsed data
      setShow(false);    // Set loading to false after data is fetched
    } catch (error) {
      // If the API call fails, load from local JSON file
      Alert.alert('Unable to fetch training list');
      console.log('\nAPI call failed, loading local JSON:', JSON.stringify(error));
      setTimeout(() => {
        setShow(false);  // Stop loading in case of an error
      }, 10);
    }
  };


  useEffect(() => {
    setShow(true)
    fetchData();  // Call the API when the component mounts
  }, []);

  const renderItem = ({ item }: { item: TrainingDataItem }) => {
    const getStatusBackgroundColor = (status: string) => {
      switch (status) {
        case 'Approved':
          return styles.approvedBackground;
        case 'Rejected':
          return styles.rejectedBackground;
        case 'OnHold':
          return styles.onHoldBackground;
        case 'Rescheduled':
          return styles.rescheduledBackground;
        case 'Under Review':
          return styles.underReviewBackground;
        default:
          return styles.defaultBackground;
      }
    };

    return (
      <View style={[styles.container]}>
        <View style={styles.textContainer}>
        <View style={[styles.innerContainer]}>
            <Text style={styles.nameText}>
            Training Id: {item.trainingId}
            </Text>
            <TouchableOpacity
               onPress={() => handleStatusPress(item)}
              style={[styles.statusButton, getStatusBackgroundColor(item.status)]}>
              <Text style={styles.statusText}>
                {item.status}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.numberText}>
            Department: {item.department}
          </Text>
          <Text style={styles.numberText}>
            Supervisor: {item.supervisor}
          </Text>
          <Text style={styles.numberText}>
              No Of Trainees: {item.noOfTrainees}
          </Text>
          <Text style={styles.numberText}>
            Subject: {item.subject}
          </Text>
          <Text style={styles.numberText}>
            Location: {item.location}
          </Text>
          <Text style={styles.dateText}>
            From: {FormatDate(item.fromDate)}
          </Text>
          <View style={styles.rowContainer}>
            <Text style={styles.dateText}>
              To: {FormatDate(item.toDate)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      {show && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.appThemeBlue} />
        </View>
      )}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.trainingId.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalBackground} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Change the status of Training to -</Text>
            <FlatList
              data={statusOptions.filter(option => option !== (selectedItem ? selectedItem.status : ''))}
              renderItem={({ item }) => (
                <TouchableOpacity 
                onPress={() => handleStatusSelect(item)} 
                style={styles.modalItem}>
                <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
    backgroundColor: COLORS.appBackground,
  },
  container: {
    marginTop: 10,
    height: 275,
    margin: 5,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.0,
    elevation: 4,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  numberText: {
    fontSize: 16,
    marginTop: 10,
  },
  dateText: {
    fontSize: 14,
    marginTop: 10,
    width: 180,
    color: 'gray',
  },
  statusButton: {
    borderRadius: 10,
    height: 30,
    width: 110,
    marginTop: 10,
  },
  statusText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 5,
  },
  approvedBackground: {
    backgroundColor: 'gray',
  },
  rejectedBackground: {
    backgroundColor: 'red',
  },
  onHoldBackground: {
    backgroundColor: 'blue',
  },
  rescheduledBackground: {
    backgroundColor: 'green',
  },
  underReviewBackground: {
    backgroundColor: 'purple',
  },
  defaultBackground: {
    backgroundColor: 'white',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    height: '33%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalItemText: {
    fontSize: 18,
  },
  loaderContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: DEVICE.height / 3,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});

export default UpdateTrainingScreen;