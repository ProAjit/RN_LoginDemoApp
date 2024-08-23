import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

interface DataItem {
  badgeNumber: number;
  name: string;
  location: string;
  status: string;
}

interface SafetyIncidentsListProps {
  data: DataItem[];
}

const SafetyIncidentsList: React.FC<SafetyIncidentsListProps> = ({ data }) => {
  
  const renderItem = ({ item }: { item: DataItem }) => {
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
        default:
          return styles.defaultBackground;
      }
    };

    const handleStatusPress = (status: string) => {
      console.log(`Status tapped: ${status}`);
    };

    return (
      <View style={[styles.container]}>
        <Text style={styles.nameText}>
          Name: {item.name}
        </Text>
        <Text style={styles.badgeNumberText}>
          Badge Number: {item.badgeNumber}
        </Text>
        <Text style={styles.locationText}>
          Location: {item.location}
        </Text>
        <TouchableOpacity onPress={() => handleStatusPress(item.status)} style={styles.statusButton}>
         <Text style={[styles.statusText, getStatusBackgroundColor(item.status)]}>
          { item.status }
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.badgeNumber.toString()}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
  },
  container: {
    height: 150,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor:'lightgray',
  },
  rowContent: {
    flex: 1,
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  statusButton: {
    height: 50,
    width: 150,
    borderRadius: 10,
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 16,
    color: 'white',
  },
  badgeNumberText: {
    fontSize: 16,
    marginTop: 10,
  },
  locationText: {
    fontSize: 14,
    marginTop: 10,
    color: 'gray',
  },
  approvedBackground: {
    backgroundColor: 'green',
  },
  rejectedBackground: {
    backgroundColor: 'red',
  },
  submittedBackground: {
    backgroundColor: 'blue',
  },
  acceptedBackground: {
    backgroundColor: 'cyan',
  },
  underReviewBackground: {
    backgroundColor: 'purple',
  },
  defaultBackground: {
    backgroundColor: 'white',
  },
});

export default SafetyIncidentsList;
