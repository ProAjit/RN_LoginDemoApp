import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { COLORS, DEVICE, API } from '../../Constants/GlobalData';
import { updateIncidentStatus } from '../../Networking/EndorseSafety/EndorseSafetyServices';
import AppSingleton from '../../AppSingleton/AppSingleton';
const singleton = AppSingleton.getInstance();

interface DataItem {
  incidentId: Number
  name: string;
  location: string;
  description: string;
  status: string;
  incidentdate: string;
  region: String
  badgeNumber: string;
}

const UpdateIncidentsScreen: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [show, setShow] = useState(false);

  // Function to call API and fetch data
  const fetchData = async () => {
    try {
      const getIncidentURL = API.TestAdminBaseURL + '/getIncidentByRegion?Region=' + singleton.region
      console.log('\nAPI call getIncidentURL', getIncidentURL);
      const response = await fetch(getIncidentURL);
      const json = await response.json();
      const parsedData: DataItem[] = json["Incidents"].map((incident: any) => ({
        badgeNumber: incident["Badgenumber"].trim(),
        name: incident["Name"].trim(),
        location: incident["Location"].trim(),
        description: incident["Description"].trim(),
        status: incident["incidentstatus"].trim(),
        region: incident["Region"].trim(),
        incidentdate: incident["incidentdate"].trim(),
        incidentId: Number(incident["incidentid"].trim()),
      }));
      setData(parsedData);
      console.log('\nDATA set', data);
      setShow(false);
    } catch (error) {
      console.log('\nAPI call failed, loading local JSON:', error);
      setTimeout(() => {
        setShow(false);
      }, 10);
    }
  };

  useEffect(() => {
    setShow(true)
    fetchData();  // Call the API when the component mounts
  }, []);

  const updateStatus = async (item: DataItem) => {

    if (!item.incidentId) {
      console.error('Incident not found');
      return;
    }

    // Create the request body for the API
    const incidentData = {
      incidentid: item.incidentId.toString(),
      Name: item.name,
      Badgenumber: item.badgeNumber,
      Location: item.location,
      Description: item.description,
      incidentstatus: 'Closed', // Status being updated here
      assignedto: 8, // Example value, you can adjust this
      actiontaken: 'testing an update',
      remarks: 'testing an update',
      Imageuri: ' ', // Assuming no image for now
      Region: item.region,
    };

    // Call the API to update the status
    const success = await updateIncidentStatus(incidentData);
    if (success) {
      // Refresh the incident list on success
      fetchData();
    } else {
      Alert.alert('Failed to update the incident status');
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