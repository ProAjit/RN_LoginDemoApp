import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FeedbackScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Feedback Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FeedbackScreen;
