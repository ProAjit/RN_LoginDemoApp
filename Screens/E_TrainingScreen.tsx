import React, { useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

const E_TrainingScreen = () => {
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator 
          style={styles.loader} 
          size="large" 
          color="#0000ff" 
        />
      )}
      <WebView 
        source={{ uri: 'https://olympics.com/en/paris-2024'}} 
        style={styles.webview} 
        onLoadEnd={() => setLoading(false)} // Hide the loader when the page has loaded
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    position: 'absolute', 
    top: '50%', 
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }], // Center the loader
  },
  webview: {
    flex: 1,
  },
});

export default E_TrainingScreen;