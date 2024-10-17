import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { getTrainingScheduleById } from '../../Networking/Training/ClassTrainingServices';
import { COLORS, FormatDateUTC } from '../../Constants/GlobalData';
import { ScrollView } from 'react-native-gesture-handler';

const TrainingDetails = ({ route }) => {
  const { trainingRequestId } = route.params;  // Access the TrainingRequestId from route params
  const [trainingDetails, setTrainingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch training details when the component mounts
  useEffect(() => {
    const fetchTrainingDetails = async () => {
      try {
        const data = await getTrainingScheduleById(trainingRequestId);
        setTrainingDetails(data.TrainingSchedule);  // Set the fetched data
      } catch (err) {
        setError('Unable to load training details');
      } finally {
        setLoading(false);
      }
    };
    fetchTrainingDetails();
  }, [trainingRequestId]);

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

  const capitalizeFirstLetter = (text: string) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <View style={styles.container}>
      {trainingDetails ? (
        <ScrollView>
          {Object.entries(trainingDetails).map(([key, value]) => (
            <View key={key} style={styles.row}>
              <Text numberOfLines={2} style={styles.label}>
              <Text style={{ fontWeight: 'bold' }}> {capitalizeFirstLetter(key)}: </Text>
              <Text>{value}</Text>
              </Text>
            </View>
          ))} 
        </ScrollView>
      ) : (
        <Text>No details found for Id#: {trainingRequestId}</Text>
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

export default TrainingDetails;