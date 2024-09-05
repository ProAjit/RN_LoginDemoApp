import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Alert, Linking } from 'react-native';
import Pdf from 'react-native-pdf';
import RNFetchBlob from 'react-native-blob-util';
import { faLink,faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { COLORS } from '../../Constants/globalData';

const { height, width } = Dimensions.get('window');

const E_TrainingScreen = () => {

  const handleDownload = (url: string) => {
    if (url.includes('youtube.com')) {
      // Open YouTube link in external browser
      Linking.openURL(url).catch(err => console.error('Error opening YouTube link:', err));
    } else {
      // Download PDF or PPT file
      const { config, fs } = RNFetchBlob;
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          title: 'Document Download',
          description: 'Downloading the file',
          path: fs.dirs.DownloadDir + '/sample.pdf', // Specify the path where the file should be saved
        }
      };

      config(options)
        .fetch('GET', url)
        .then((res) => {
          Alert.alert('Download complete', 'File downloaded successfully.');
        })
        .catch(error => {
          console.error('File download error:', error);
        });
    }
  };

  const youtubeLink = 'https://www.youtube.com/watch?v=hzzCveeczSQ&list=PLC3y8-rFHvwhiQJD1di4eRVN30WWCXkg1';
  const pdfLink = 'https://www.sharedfilespro.com/shared-files/38/?sample.pdf';

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}> 
       <Text style={styles.title}>React Native Tutorial</Text>
       <TouchableOpacity style={styles.button} onPress={() => handleDownload(youtubeLink)}>
       <View style={styles.iconContainer}>
        <FontAwesomeIcon icon={faPlay} size={15} color="#F4F6FF" />
        </View>
       </TouchableOpacity>
      </View>
      <ScrollView style={styles.descriptionContainer}>
        <Text style={styles.description}>
        ✦
Introduction to React Native for beginners
00:02
The series covers learning the different concepts of React Native from scratch.
The introductory video explores what React Native is, why it's worth learning, and the prerequisites to get started.
{'\n'}{'\n'}✦
React Native is an open source framework for building mobile apps.
00:33
React Native allows for cross-platform development using React fundamentals and advanced topics.
It supports features such as React hooks, TypeScript, Redux, router, testing, material UI, style components, storybook, query, table, formic, hook form, and rendering behavior.
{'\n'}{'\n'}✦
React Native leverages JavaScript to access platform-specific APIs and define UI components.
01:07
React is a library for building user interfaces, paired with React Dom for web apps and a framework like React Native for Native mobile apps.
It allows for creating applications with platform-specific functionality while maintaining a consistent and efficient development process.
{'\n'}{'\n'}✦
Understanding the benefits of learning React Native.
01:36
React Native simplifies app development for both iOS and Android.
It eliminates the need for expertise in multiple programming languages.
{'\n'}{'\n'}✦
React Native enables seamless app development for both Android and iOS platforms
02:11
Developers can create an app that works seamlessly on both platforms
Learning React Native involves a minimal learning curve and is in high demand in the job market
{'\n'}{'\n'}✦
React Native enables businesses to save time and costs by using a single team for iOS and Android development.
02:42
Proficiency in React Native can extend to web app development, further increasing cost and time savings.
Top companies like Microsoft, Meta, Tesla, Pinterest, and Discord use React Native for mobile app development, making it a valuable skill to add to your skill set.
{'\n'}{'\n'}✦
Understanding JavaScript and React fundamentals is essential.
03:15
Function components, props, state, JSX, and hooks are prerequisites.
An extensive tutorial series covering react is available for beginners to advanced levels.
{'\n'}{'\n'}✦
Complete beginner to expert in React Native
03:43
Source code for the series is on the GitHub repository linked in the description
Stay tuned for the next video as we start learning various concepts of React Native
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.appBackground,
  },
  button: {
    width: 30,
    height: 30,
    backgroundColor: '#000', // Set the background color if you want
    borderRadius: 15, // Make it circular
  },
  iconContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  image: {
    height: height * 0.15,
    width: width * 0.9,
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  descriptionContainer: {
    height: height * 0.75,
    marginBottom: 20,
    padding: 10,
  },
  description: {
    fontSize: 14,
    textAlign: 'justify',
    paddingBottom: 20,
  },
  downloadButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(2, 28, 52, 1.0)',
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 50,
    marginRight: 50,
  },
  downloadText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default E_TrainingScreen;