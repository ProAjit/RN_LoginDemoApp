import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TrainingDetails = ({ route  }) => {
  const { trainingRequestId } = route.params;  // Access the TrainingRequestId from route params

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Training Request ID:</Text>
      <Text style={styles.value}>{trainingRequestId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default TrainingDetails;