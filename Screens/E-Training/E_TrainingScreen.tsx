import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Alert, Linking } from 'react-native';
import Pdf from 'react-native-pdf';
import RNFetchBlob from 'react-native-blob-util';

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
      <Image
        source={{ uri: 'https://farm4.staticflickr.com/3075/3168662394_7d7103de7d_z_d.jpg' }}
        style={styles.image}
      />
      <Text style={styles.title}>Training Title</Text>
      <ScrollView style={styles.descriptionContainer}>
        <Text style={styles.description}>
          This is a static description related to the title. It will scroll if the content exceeds the allocated space. 
          You can replace this text with any other content. {'\n'}This is a static description related to the title. It will scroll if the content exceeds the allocated space. 
          You can replace this text with any other content. {'\n'}This is a static description related to the title. It will scroll if the content exceeds the allocated space. 
          You can replace this text with any other content. {'\n'}This is a static description related to the title. It will scroll if the content exceeds the allocated space. 
          You can replace this text with any other content. {'\n'}This is a static description related to the title. It will scroll if the content exceeds the allocated space. 
          You can replace this text with any other content. {'\n'}This is a static description related to the title. It will scroll if the content exceeds the allocated space. 
          You can replace this text with any other content.
        </Text>
      </ScrollView>
      <TouchableOpacity style={styles.downloadButton} onPress={() => handleDownload(youtubeLink)}> 
        <Text style={styles.downloadText}>Open Link</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F4F6FF',
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
    marginBottom: 10,
    padding: 10,
  },
  description: {
    fontSize: 14,
    textAlign: 'justify',
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