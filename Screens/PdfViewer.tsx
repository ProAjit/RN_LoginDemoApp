// https://morth.nic.in/sites/default/files/dd12-13_0.pdf
// https://www.sharedfilespro.com/shared-files/38/?sample.pdf

import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import Pdf from 'react-native-pdf';
import RNFetchBlob from 'react-native-blob-util';

const PdfViewer = () => {
  const [pdfPath, setPdfPath] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const pdfUrl = 'https://www.sharedfilespro.com/shared-files/38/?sample.pdf';

  useEffect(() => {
    const downloadPdf = async () => {
      try {
        const res = await RNFetchBlob.config({
          fileCache: true,
          appendExt: 'pdf',
        }).fetch('GET', pdfUrl);

        setPdfPath(res.path());
        setLoading(false);
      } catch (error) {
        console.error('Error downloading PDF:', error);
      }
    };

    downloadPdf();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color='rgba(2, 28, 52, 1.0)' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {pdfPath && (
        <Pdf
          source={{ uri: pdfPath }}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          style={styles.pdf}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F6FF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F6FF',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#F4F6FF',
  },
});

export default PdfViewer;