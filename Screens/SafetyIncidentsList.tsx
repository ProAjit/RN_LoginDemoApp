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
            Name: {item.name}
          </Text>
          <Text style={styles.badgeNumberText}>
            Badge Number: {item.badgeNumber}
          </Text>
          <View style={[styles.innerContainer]}>
          <Text style={styles.locationText}>
            Location: {item.location}
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
    height: 120,
    marginBottom: 15,
    padding: 8,
    borderRadius: 10,
    backgroundColor: 'lightgray',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  innerContainer: {
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
  badgeNumberText: {
    fontSize: 16,
    marginTop: 10,
  },
  locationText: {
    fontSize: 14,
    marginTop: 10,
    color: 'gray',
  },
  statusButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    height: 32,
  },
  statusText: {
    fontSize: 16,
    color: 'white',
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

export default SafetyIncidentsList;