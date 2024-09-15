import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, Alert } from 'react-native';
import RNFetchBlob from 'react-native-blob-util';
import { getETrainingData } from '../../Networking/E_Training/E_TrainingService';
const jsonFilePath = '/Users/ajitsatarkar/Documents/React_Native_Git/RN_LoginPOC/RN_LoginDemoApp/JsonFiles/eTrainingList.json';

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
        setTrainingData(responseData.Training);
        console.warn('getE_TrainingList SUCCESS');
        console.log('\n getE_TrainingList JSON:', responseData);  
      } catch (error) {
        console.error('Error fetching data:', error);
        const localData = require(jsonFilePath);
        setTrainingData(localData.Training);
        console.warn('getE_TrainingList local');
        setTimeout(() => {
      }, 100);
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
          Alert.alert('Download complete', `File saved to ${res.path()}`);
        })
        .catch((err) => {
          Alert.alert('Download error', 'Failed to download file.');
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

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={trainingData}
          keyExtractor={(item) => item.ContentId.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default E_TrainingScreen;