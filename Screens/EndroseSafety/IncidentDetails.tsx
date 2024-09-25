import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { getIncidentsById } from '../../Networking/EndorseSafety/EndorseSafetyServices';
import { COLORS } from '../../Constants/GlobalData';

const IncidentDetails = ({ route }) => {
  const { incidentId } = route.params;  // Access the incidentId from route params
  const [queriesDetails, setQueriesDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch training details when the component mounts
  useEffect(() => {
    const fetchIncidentDetails = async () => {
      try {
        const data = await getIncidentsById(incidentId);
        setQueriesDetails(data.Incident);  // Set the fetched data
      } catch (err) {
        setError('Failed to load training details');
      } finally {
        setLoading(false);
      }
    };
    fetchIncidentDetails();
  }, [incidentId]);

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
        <>
          {Object.entries(queriesDetails).map(([key, value]) => (
            <View key={key} style={styles.row}>
              <Text style={styles.label}>{key}: {value.toString()}</Text>
            </View>
          ))}
        </>
      ) : (
       <Text>No details found for Id#: {incidentId}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.appBackground,
    marginTop: 20,
  },
  row: {
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    marginTop: 5,
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