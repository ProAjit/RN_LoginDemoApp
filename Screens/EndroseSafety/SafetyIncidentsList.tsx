import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, DEVICE, API } from '../../Constants/GlobalData';
import AppSingleton from '../../AppSingleton/AppSingleton';
const singleton = AppSingleton.getInstance();

interface DataItem {
  incidentId: string
  name: string;
  location: string;
  description: string;
  status: string;
  incidentdate: string;
  region: String
  badgeNumber: string;
}

const SafetyIncidentsList: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [show, setShow] = useState(false);

  // Function to call API and fetch data
  const fetchData = async () => {
    try {
      const getIncidentURL = API.TestBaseURL + '/getIncidentList?BadgeNumber=' + singleton.badgeNumber
      console.log('\nAPI call getIncidentURL', getIncidentURL);
      const response = await fetch(getIncidentURL);
      const json = await response.json();
      console.log('\nIncidentList SUCCESS');
      console.log('\nIncidentList JSON:', json);
      // Parse the response to map to DataItem format
      const parsedData: DataItem[] = json["Incidents"].map((incident: any) => ({
        badgeNumber: incident["Badgenumber"].trim(),
        name: incident["Name"].trim(),
        location: incident["Location"].trim(),
        description: incident["Description"].trim(),
        status: incident["incidentstatus"].trim(),
        region: incident["Region"].trim(),
        incidentdate: incident["incidentdate"].trim(),
        incidentId: incident["incidentid"].trim(),
      }));
      setData(parsedData);  // Set parsed data
      setShow(false);    // Set loading to false after data is fetched
    } catch (error) {
      // If the API call fails, load from local JSON file
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

    return (
      <View style={[styles.container]}>
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>
            Name: {item.name}
          </Text>
          <View style={[styles.innerContainer]}>
            <Text style={styles.badgeNumberText}>
              Incident Id: {item.incidentId}
            </Text>
            <TouchableOpacity
              style={[styles.statusButton,
              getStatusBackgroundColor(item.status)]}
            >
            <Text style={styles.statusText}> {item.status} </Text>
            </TouchableOpacity>
          </View>
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
    paddingHorizontal: 10,
  },
  container: {
    marginTop: 5,
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
    width: 120,
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

export default SafetyIncidentsList;