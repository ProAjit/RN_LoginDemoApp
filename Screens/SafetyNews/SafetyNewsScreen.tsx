import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

const { width, height } = Dimensions.get('window');

const SafetyNewsScreen = () => {
  const handleDownload = async () => {
    const uri = 'https://www.sharedfilespro.com/shared-files/38/?sample.pdf';
    const fileUri = FileSystem.documentDirectory + 'sample.pdf';
    try {
      const { uri: downloadedUri } = await FileSystem.downloadAsync(uri, fileUri);
      console.log('Download completed:', downloadedUri);
      Alert.alert('Download completed');
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://farm2.staticflickr.com/1533/26541536141_41abe98db3_z_d.jpg' }}
        style={styles.image}
      />
      <Text style={styles.title}>Announcement</Text>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.description}>
          1. React State Management:
          {'\n'}- State and state management are essential aspects of a React application.
          {'\n'}- State can be managed using native hooks, external libraries, or third-party libraries.
          {'\n'}2. Zustand Overview:
          {'\n'}- Zustand is a compact, fast, and scalable state management library.
          {'\n'}- It is based on simplified flux principles and primarily makes use of hooks.
          {'\n'}3. Advantages of Zustand:
          {'\n'}- Zustand is faster than context and allows for specific state selection.
          {'\n'}- It does state merging by default and is extendable and less opinionated than other libraries.
          {'\n'}4. Zustand vs. Redux:
          {'\n'}- Comparing the architectural designs of Zustand and Redux shows the simplified nature of Zustand's diagram.
          {'\n'}- Zustand is a lightweight alternative to Redux for simple and lightweight state management.
        </Text>
      </ScrollView>
      <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
        <Text style={styles.downloadText}>Download Document</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: width * 0.9,
    height: height * 0.15,
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  scrollView: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  downloadButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(2, 28, 52, 1.0)',
    marginTop: 10,
    marginBottom: 20,
  },
  downloadText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default SafetyNewsScreen;