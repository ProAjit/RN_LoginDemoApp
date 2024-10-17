import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { fetchAlertsData } from '../../Networking/SafetyAlerts/AlertsServices'; 
import { COLORS, FormatDate } from '../../Constants/GlobalData';

interface AlertData {
  titleEn: number;
  msgId: number;
  titleAr: string;
  detailsEn: string;
  detailsAr: string;
  effectiveStartDate: string;
  effectiveEndDate: string;
  status: string;
  createdBy: number;
  creationDate: string;
  lastUpdatedBy: number;
}

const SafetyAlertsScreen: React.FC = () => {
  const [data, setData] = useState<AlertData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch data from API on component mount
  useEffect(() => {
    const getData = async () => {
      try {
        const responseData = await fetchAlertsData();
        console.log('\nAlertList SUCCESS');
        console.log('\nAlertList JSON:', responseData);  
        setData(responseData.Alerts); // Set the fetched data
      } catch (error) {
        Alert.alert('Error fetching safety alerts data');
        console.error('\n', JSON.stringify(error));
        setTimeout(() => {
      }, 10);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  // Render each item in FlatList
  const renderItem = ({ item }: { item: AlertData }) => (
    <View style={styles.item}>
      <Text style={styles.title}>Message Id: {item.msgId}</Text>
      <Text numberOfLines={3} style={styles.description}>Description: {item.detailsEn}</Text>
      <Text style={styles.creationDate}>Created on: {FormatDate(item.creationDate)}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={COLORS.appThemeBlue} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.msgId.toString()}
        contentContainerStyle={styles.notificationContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    paddingVertical: 10,
    paddingHorizontal: '2.5%',
  },
  notificationContainer: {
    marginVertical: 8,
    width: '95%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
  },
  creationDate: {
    fontSize: 14,
    color: 'gray',
  },
  item: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SafetyAlertsScreen;
