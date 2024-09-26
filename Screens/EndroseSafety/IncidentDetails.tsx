import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { getIncidentsById } from '../../Networking/EndorseSafety/EndorseSafetyServices';
import { COLORS } from '../../Constants/GlobalData';
import { ScrollView } from 'react-native-gesture-handler';

const IncidentDetails = ({ route }) => {
  const [queriesDetails, setQueriesDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch training details when the component mounts
  useEffect(() => {
    const fetchIncidentDetails = async () => {
      try {
        const data = await getIncidentsById(route.params);
        console.log('\n====', data.Incident[0])
        setQueriesDetails(data.Incident[0]);  // Set the fetched data
      } catch (err) {
        setError('Failed to load training details');
      } finally {
        setLoading(false);
      }
    };
    fetchIncidentDetails();
  }, [route.params]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={COLORS.appThemeBlue} />
      </View>
    );
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      {queriesDetails ? (
        <ScrollView>
          {Object.entries(queriesDetails).map(([key, value]) => (
            <View key={key} style={styles.row}>
              <Text numberOfLines={2} style={styles.label}>{key}: {value}</Text>
            </View>
          ))}
        </ScrollView>
      ) : (
       <Text>No details found for Id#: {route.params}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.appBackground,
  },
  row: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'regular',
  },
  value: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IncidentDetails;