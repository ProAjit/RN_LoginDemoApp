import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { COLORS, DEVICE } from '../../Constants/GlobalData';
import { updateIncidentStatus } from '../../Networking/EndorseSafety/EndorseSafetyServices';
import { fetchIncidents } from '../../Networking/Updates/UpdateIncidentService';

interface DataItem {
  incidentId: number;
  name: string;
  location: string;
  description: string;
  status: string;
  incidentdate: string;
  region: string;
  badgeNumber: string;
}

const UpdateIncidentsScreen: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [show, setShow] = useState(false);

  const loadIncidents = async () => {
    setShow(true);
    try {
      const incidentData = await fetchIncidents();  // Fetch data using the service
      setData(incidentData);
      setShow(false);
    } catch (error) {
      console.log('Error fetching incidents:', error);
      Alert.alert('Unable to fetch incidents list');
      setShow(false);
    }
  };

  useEffect(() => {
    loadIncidents();  // Call the function to load incidents
  }, []);

  const updateStatus = async (item: DataItem) => {
    if (!item.incidentId) {
      Alert.alert('Incident Id not found');
      return;
    }

    setShow(true);
    const incidentData = {
      incidentid: item.incidentId.toString(),
      Name: item.name,
      Badgenumber: item.badgeNumber,
      Location: item.location,
      Description: item.description,
      incidentstatus: 'Closed',
      assignedto: 8,
      actiontaken: 'testing an update',
      remarks: 'testing an update',
      Imageuri: ' ',
      Region: item.region,
    };

    const success = await updateIncidentStatus(incidentData);
    if (success) {
      loadIncidents();  // Refresh the list after updating
    } else {
      setShow(false);
      Alert.alert('Unable to update the incident status');
    }
  };

  const renderItem = ({ item }: { item: DataItem }) => {
    const getStatusBackgroundColor = (status: string) => {
      switch (status) {
        case 'Open':
          return styles.openBackground;
        case 'Closed':
          return styles.closedBackground;
        default:
          return styles.defaultBackground;
      }
    };

    const handleStatusPress = (item: DataItem) => {
      if (item.status === 'Open') {
        const msg = 'Would you like to close this incident# ' + item.incidentId.toString() + `?`
        Alert.alert(
          msg,
          '',
          [{ text: 'No', style: 'cancel', },{ text: 'Yes', onPress: () => updateStatus(item), },
          ],
          { cancelable: true }
        );
      }
    };

    return (
      <View style={[styles.container]}>
        <View style={styles.textContainer}>
          <View style={[styles.innerContainer]}>
          <Text style={styles.incidentText}>
            Incident Id: {item.incidentId.toString()}
            </Text>
            <TouchableOpacity
              onPress={() => handleStatusPress(item)}
              style={[styles.statusButton,
              getStatusBackgroundColor(item.status)]}
            >
            <Text style={styles.statusText}> {item.status} </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.nameText}>
              Name: {item.name}
          </Text>
          <Text style={styles.badgeNumberText}>
            Description: {item.description}
          </Text>
          <Text style={styles.locationText}>
            Location: {item.location}
          </Text>
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
      keyExtractor={(item) => item.incidentId.toString()}
      contentContainerStyle={styles.listContainer} />
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 15,
    backgroundColor: COLORS.appBackground,
  },
  container: {
    flex: 1,
    marginTop: 15,
    height: 180,
    marginBottom: 15,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2.5,
    elevation: 4,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    marginTop: 10,
    width: 250,
  },
  incidentText: {
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
    height: 60,
  },
  statusButton: {
    borderRadius: 10,
    height: 32,
    width: 90,
    marginTop: 10,
    paddingTop: 5,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    color: 'white',
  },
  closedBackground: {
    backgroundColor: 'gray',
  },
  openBackground: {
    backgroundColor: 'green',
  },
  defaultBackground: {
    backgroundColor: 'white',
  },
  loaderContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: DEVICE.height/3,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});

export default UpdateIncidentsScreen;