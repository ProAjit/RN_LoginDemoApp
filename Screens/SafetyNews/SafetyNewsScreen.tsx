// src/screens/SafetyNewsScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import RNFetchBlob from 'react-native-blob-util';
import { COLORS, FormatDate } from '../../Constants/GlobalData';
import { fetchSafetyNews } from '../../Networking/SafetyNews/NewsService';
const jsonFilePath = '/Users/ajitsatarkar/Documents/React_Native_Git/RN_LoginPOC/RN_LoginDemoApp/JsonFiles/newsList.json';

interface NewsData {
  titleEn: string;
  detailsEn: string;
  msgId: number;
  titleAr: string;
  detailsAr: string;
  effectiveStartDate: string;
  effectiveEndDate: string;
  status: string;
  createdBy: number;
  creationDate: string;
  lastUpdateDate: string;
  lastUpdatedBy: number;
  attribute1: string;
  attribute2: string;
  attribute3: string;
  attribute4: string;
  attribute5: string;
  processFlag: string;
  errorMsg: string;
}

const SafetyNewsScreen = () => {
  const [data, setData] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const responseData = await fetchSafetyNews();
        setData(responseData.ActiveNews); // Set the fetched data
        console.warn('getNewsList SUCCESS');
        console.log('\n getNewsList JSON:', responseData);  
      } catch (error) {
        console.error('Error fetching data:', error);
        const localData = require(jsonFilePath);
        setData(localData.ActiveNews); // Set the fetched data
        console.warn('getLinksList local');
        setTimeout(() => {
      }, 100);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  // Handle download of PDF using RNFetchBlob
  const handleDownload = async (pdfUrl: string) => {
    const fileUri = RNFetchBlob.fs.dirs.DocumentDir + '/sample.pdf';
    try {
      const res = await RNFetchBlob.config({
        path: fileUri,
      }).fetch('GET', pdfUrl);
      Alert.alert('Download completed');
    } catch (error) {
      Alert.alert('Download failed');
    }
  };

  const renderNewsItem = ({ item }: { item: NewsData }) => (
    <View style={styles.newsItem}>
      <Text style={styles.title}>Message ID: {item.msgId}</Text>
      <Text numberOfLines={3} style={styles.newsDetails}>Description: {item.detailsEn}</Text>
      <Text style={styles.creationDate}>Created on: {FormatDate(item.creationDate)}</Text>
      {item.attribute2 && (
        <TouchableOpacity onPress={() => handleDownload(item.attribute2)}>
          <Text style={styles.downloadLink}>Download PDF</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.msgId.toString()}
        contentContainerStyle={styles.notificationContainer}
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
  notificationContainer: {
    marginVertical: 8,
    width: '95%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  scrollView: {
    paddingBottom: 20,
  },
  newsItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  newsDetails: {
    fontSize: 16,
    marginBottom: 10,
  },
  downloadLink: {
    fontSize: 16,
    color: COLORS.appThemeBlue,
    textDecorationLine: 'underline',
  },
  creationDate: {
    fontSize: 14,
    color: 'gray',
  },
});

export default SafetyNewsScreen;