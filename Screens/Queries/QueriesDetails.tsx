import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { getQueryById } from '../../Networking/QueriesServices';
import { COLORS } from '../../Constants/GlobalData';
import { ScrollView } from 'react-native-gesture-handler';

const QueriesDetails = ({ route }) => {
  const [queriesDetails, setQueriesDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch training details when the component mounts
  useEffect(() => {
    console.log('\n=====QueriesDetails', route.params )
    const fetchQueryDetails = async () => {
      try {
        const data = await getQueryById(route.params);
        setQueriesDetails(data.Query);  // Set the fetched data
      } catch (err) {
        setError('Failed to load training details');
      } finally {
        setLoading(false);
      }
    };
    fetchQueryDetails();
  }, []);

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
      {queriesDetails ? (
        <ScrollView>
          {Object.entries(queriesDetails).map(([key, value]) => (
            <View key={key} style={styles.row}>
                  <Text style={{ fontWeight: 'bold' }}>{capitalizeFirstLetter(key)}</Text>: {value}
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

export default QueriesDetails;