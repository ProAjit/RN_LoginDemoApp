import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';

interface TrainingDataItem {
  noOfTrainees: number;
  location: string;
  department: string;
  supervisor: string;
  fromDate: string;
  toDate: string;
  status: string;
}

interface TrainingListProps {
  data: TrainingDataItem[];
  updateStatus: (noOfTrainees: number, newStatus: string) => void;
}

const TrainingList: React.FC<TrainingListProps> = ({ data, updateStatus }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TrainingDataItem | null>(null);

  const statusOptions = ['Rescheduled', 'On Hold', 'Approved', 'Rejected', 'Under Review'];

  const handleStatusPress = (item: TrainingDataItem) => {
    if (item.status !== 'Approved' && item.status !== 'Rejected') {
      setSelectedItem(item);
      setModalVisible(true);
    }
  };

  const handleStatusSelect = (newStatus: string) => {
    if (selectedItem) {
      updateStatus(selectedItem.noOfTrainees, newStatus);
      setModalVisible(false);
      setSelectedItem(null);
    }
  };

  const renderItem = ({ item }: { item: TrainingDataItem }) => {
    const getStatusBackgroundColor = (status: string) => {
      switch (status) {
        case 'Approved':
          return styles.approvedBackground;
        case 'Rejected':
          return styles.rejectedBackground;
        case 'On Hold':
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
          <Text style={styles.nameText}>
            Department: {item.department}
          </Text>
          <Text style={styles.nameText}>
            Supervisor: {item.supervisor}
          </Text>
          <Text style={styles.numberText}>
            No Of Trainees: {item.noOfTrainees}
          </Text>
          <Text style={styles.numberText}>
            Location: {item.location}
          </Text>
          <View style={[styles.innerContainer]}>
            <Text style={styles.dateText}>
              From: {item.fromDate}
            </Text>
            <View style={styles.rowContainer}>
              <Text style={styles.dateText}>
                To: {item.toDate}
              </Text>
              <TouchableOpacity
                onPress={() => handleStatusPress(item)}
                style={[styles.statusButton, getStatusBackgroundColor(item.status)]}
              >
                <Text style={styles.statusText}>
                  {item.status}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.noOfTrainees.toString()}
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
                <TouchableOpacity onPress={() => handleStatusSelect(item)} style={styles.modalItem}>
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 0,
  },
  container: {
    marginTop: 10,
    height: 200,
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
    width: 200,
    color: 'gray',
  },
  statusButton: {
    borderRadius: 10,
    height: 32,
    width: 120,
  },
  statusText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 7,
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
});

export default TrainingList;