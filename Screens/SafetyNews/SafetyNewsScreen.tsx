import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList, ActivityIndicator, Modal } from 'react-native';
import RNFetchBlob from 'react-native-blob-util';
import { COLORS, FormatDate } from '../../Constants/GlobalData';
import { fetchSafetyNews } from '../../Networking/SafetyNews/NewsService';
import { Platform } from 'react-native';
import Pdf from 'react-native-pdf'; // Import react-native-pdf for in-app PDF viewing
import FileViewer from 'react-native-file-viewer'; // Import to view the downloaded PDF

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
  const [downloading, setDownloading] = useState<boolean>(false);
  const [pdfUri, setPdfUri] = useState<string | null>(null); // State to store PDF URI
  const [isPdfVisible, setIsPdfVisible] = useState<boolean>(false); // State to control PDF visibility

  useEffect(() => {
    const getData = async () => {
      try {
        const responseData = await fetchSafetyNews();
        console.log('\nNewsList SUCCESS');
        console.log('\nNewsList JSON:', responseData);  
        setData(responseData); // Set the fetched data
      } catch (error) {
        Alert.alert('Error fetching safety news data:', JSON.stringify(error));
        setTimeout(() => {}, 10);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  // Handle download of PDF using RNFetchBlob
  const handleDownload = async (pdfUrl: string) => {
    setDownloading(true); // Show loading indicator during download
    const fileUri = `${RNFetchBlob.fs.dirs.DocumentDir}/safety_news.pdf`; // Define a file name
    try {
      const res = await RNFetchBlob.config({
        path: fileUri,
      }).fetch('GET', pdfUrl);

      setDownloading(false); // Hide loading indicator
      setPdfUri(res.path()); // Set the PDF URI to view within the app
      setIsPdfVisible(true); // Show PDF viewer modal
    } catch (error) {
      setDownloading(false); // Hide loading indicator in case of failure
      console.warn('Download failed', error);
      Alert.alert('Error', 'Failed to download the PDF. Please try again.');
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

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={COLORS.appThemeBlue} />
        <Text style={{ alignItems: 'center', marginTop: 20 }}>Loading...</Text>
      </View>
    );
  }

  if (downloading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={COLORS.appThemeBlue} />
        <Text style={{ alignItems: 'center', marginTop: 20 }}>Downloading file...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.msgId.toString()}
        contentContainerStyle={styles.notificationContainer}
      />

      {/* Modal to show PDF viewer */}
      {isPdfVisible && pdfUri && (
        <Modal visible={isPdfVisible} onRequestClose={() => setIsPdfVisible(false)} animationType="slide">
          <View style={styles.pdfContainer}>
            <TouchableOpacity onPress={() => setIsPdfVisible(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
            <Pdf
              source={{ uri: pdfUri, cache: true }}
              style={styles.pdf}
              onLoadComplete={(numberOfPages) => {
                console.log(`Number of pages: ${numberOfPages}`);
              }}
              onError={(error) => {
                console.log(error);
              }}
            />
          </View>
        </Modal>
      )}
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  pdfContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  closeButton: {
    color: COLORS.appThemeBlue,
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 10,
    fontWeight: 'bold',
  },
});

export default SafetyNewsScreen;