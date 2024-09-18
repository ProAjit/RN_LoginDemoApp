import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import RNFetchBlob from 'react-native-blob-util';
import { getETrainingData } from '../../Networking/E_Training/E_TrainingService';
import { COLORS } from '../../Constants/GlobalData';

interface ETrainingItem {
  ContentId: number;
  ContentTitle: string;
  ContentDescription: string;
  Status: string;
  Attachment1: string | null;
  Attachment2: string | null;
  Attachment3: string | null;
}

const E_TrainingScreen = () => {
  const [trainingData, setTrainingData] = useState<ETrainingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const responseData = await getETrainingData();
        console.log('\nE_TrainingList SUCCESS');
        console.log('\nE_TrainingList JSON:', responseData);  
        setTrainingData(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // const localData = require(jsonFilePath);
        // setTrainingData(localData);
        // console.log('\nE_TrainingList local');
        setTimeout(() => {
      }, 10);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleAttachmentPress = (attachment: string | null) => {
    if (!attachment) return;
    if (attachment.includes('youtube') || attachment.includes('http')) {
      // Open video link in browser
      Linking.openURL(attachment).catch((err) => Alert.alert('Error', 'Failed to open link.'));
    } else {
      // Download file
      RNFetchBlob.config({
        fileCache: true,
        appendExt: 'pdf',
      })
        .fetch('GET', attachment)
        .then((res) => {
          console.warn('File Download complete', `File saved to ${res.path()}`);
        })
        .catch((err) => {
          console.warn('File Download error', 'Failed to download file.');
        });
    }
  };

  const renderItem = ({ item }: { item: ETrainingItem }) => {
    return (
      <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.ContentTitle}</Text>
        <Text>{item.ContentDescription}</Text>
        <Text>Status: {item.Status}</Text>
        
        {/* Check for attachments */}
        {(item.Attachment1 || item.Attachment2 || item.Attachment3) && (
          <View style={{ marginTop: 10 }}>
            {item.Attachment1 && (
              <TouchableOpacity onPress={() => handleAttachmentPress(item.Attachment1)}>
                <Text style={{ color: 'blue' }}>Attachment 1</Text>
              </TouchableOpacity>
            )}
            {item.Attachment2 && (
              <TouchableOpacity onPress={() => handleAttachmentPress(item.Attachment2)}>
                <Text style={{ color: 'blue', marginTop: 10 }}>Attachment 2</Text>
              </TouchableOpacity>
            )}
            {item.Attachment3 && (
              <TouchableOpacity onPress={() => handleAttachmentPress(item.Attachment3)}>
                <Text style={{ color: 'blue', marginTop: 10 }}>Attachment 3</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={COLORS.appThemeBlue} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
          data={trainingData}
          keyExtractor={(item) => item.ContentId.toString()}
          renderItem={renderItem}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.appBackground,
  },
  loader: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  },
});

export default E_TrainingScreen;