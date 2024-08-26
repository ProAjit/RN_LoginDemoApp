import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

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
}

const TrainingList: React.FC<TrainingListProps> = ({ data }) => {
  
  const renderItem = ({ item }: { item: TrainingDataItem }) => {
    const getStatusBackgroundColor = (status: string) => {
      switch (status) {
        case 'Approved':
          return styles.approvedBackground;
        case 'Rejected':
          return styles.rejectedBackground;
        case 'Submitted':
          return styles.submittedBackground;
        case 'Accepted':
          return styles.acceptedBackground;
        case 'Under Review':
          return styles.underReviewBackground;
        case 'Closed':
          return styles.approvedBackground;
        default:
          return styles.defaultBackground;
      }
    };

    const handleStatusPress = (status: string) => {
      console.log(`Status tapped: ${status}`);
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
          onPress={() => handleStatusPress(item.status)} 
          style={[styles.statusButton, 
          getStatusBackgroundColor(item.status)]}
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
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.noOfTrainees.toString()}
      contentContainerStyle={styles.listContainer}
    />
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
    backgroundColor: 'white',//F4F6FF
    flexDirection: 'row',
    justifyContent: 'space-between',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.0,
    // Shadow for Android
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
    textAlign:'center',
    fontWeight:'bold',
    marginTop: 7,
  },
  approvedBackground: {
    backgroundColor: 'gray',
  },
  rejectedBackground: {
    backgroundColor: 'red',
  },
  submittedBackground: {
    backgroundColor: 'blue',
  },
  acceptedBackground: {
    backgroundColor: 'green',
  },
  underReviewBackground: {
    backgroundColor: 'purple',
  },
  defaultBackground: {
    backgroundColor: 'white',
  },
});

export default TrainingList;