import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Linking } from 'react-native';
import { fetchLinksData } from '../../Networking/Links/LinksServices';
import { COLORS, FormatDate } from '../../Constants/GlobalData';
const jsonFilePath = '/Users/ajitsatarkar/Documents/React_Native_Git/RN_LoginPOC/RN_LoginDemoApp/JsonFiles/linksList.json';

interface LinkData {
  Status: number;
  LinkId: number;
  Link1: string;
  Link2: string;
  Link3: string;
  Link4: string;
  Link5: string;
  LinkDescription: string;
  LinkDescriptionAr: string;
  EffectiveStartDate: string;
  EffectiveEndDate: string;
  createdBy: Number;
  CreationDate: string;
  LastUpdateDate: string;
  LastUpdatedBy: Number;
  Attribute1: string;
  Attribute2: string;
  Attribute3: string;
  Attribute4: string;
  Attribute5: string;
  ProcessFlag: string;
  ErrorMsg: string;
}

const LinksScreen: React.FC = () => {
  const [data, setData] = useState<LinkData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch data from API on component mount
  useEffect(() => {
    const getData = async () => {
      try {
        const responseData = await fetchLinksData();
        setData(responseData.Links); // Set the fetched data
        console.log('\nLinksList SUCCESS');
        console.log('\nIncidentList JSON:', responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // const localData = require(jsonFilePath);
        // setData(localData.Links); // Set the fetched data
        // console.log('\nLinksList local');
        setTimeout(() => {
        }, 10);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  // Handle opening links
  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  // Render each item in FlatList
  const renderItem = ({ item }: { item: LinkData }) => (
    <View style={styles.item}>
      <Text style={styles.title}>ID: {item.LinkId}</Text>
      <Text style={styles.description}>Description: {item.LinkDescription}</Text>
      <Text style={styles.creationDate}>Created on: {FormatDate(item.CreationDate)}</Text>
      {item.Link1 && (
        <TouchableOpacity onPress={() => openLink(item.Link1)}>
          <Text style={styles.link}>Click here to visit link</Text>
        </TouchableOpacity>
      )}
    </View>
  );

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
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.LinkId.toString()}
        contentContainerStyle={styles.notificationContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    paddingVertical: 10,
    paddingHorizontal: '2.5%',
  },
  notificationContainer: {
    marginVertical: 8,
    width: '95%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
  },
  creationDate: {
    fontSize: 14,
    color: 'gray',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 5,
    fontSize: 14,
  },
  item: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LinksScreen;