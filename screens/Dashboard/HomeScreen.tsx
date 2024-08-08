import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import componentStyle from '../../styles/componentStyle';
import CollectionView from './CollectionView';
import ManagementMessagesScreen from '../TopManagementMessages/ManagementMessages';
import EndorseSafetyScreen from '../EndorseSafetyScreen';
import AppSingleton from '../../AppSingleton/AppSingleton';
import QueriesScreen from '../Queries/Queris';

interface Item {
  id: string;
  title: string;
}

const data: Item[] = [
  { id: '1', title: 'TOP MANAGEMENT MESSAGES' },
  { id: '2', title: 'ENDORSE YOUR SAFETY ISSUE' },
  { id: '3', title: 'SCHEDULE IN CLASS TRAINING' },
  { id: '4', title: 'QUERIES' },
  { id: '5', title: 'E-TRAINING' },
  { id: '6', title: 'LINKS' },
  { id: '7', title: 'SAFETY ALERTS' },
  { id: '8', title: 'SAFETY NEWS' },
];

const HomeScreen = (props: { route: any; navigation: { navigate: (screen: string, params?: any) => void }; }) => {
  const shareInstance = AppSingleton.getInstance();
  const name = shareInstance.getUserName();

  const handleItemPress = (id: string, title: string) => {
    console.log('id:', id); 

    switch (id) {
      case 'TOP MANAGEMENT MESSAGES':
        props.navigation.navigate('TOP MANAGEMENT MESSAGES', { ManagementMessagesScreen });
        break;
      case 'ENDORSE YOUR SAFETY ISSUE':
        props.navigation.navigate('ENDORSE YOUR SAFETY ISSUE', { EndorseSafetyScreen });
        break;
      case 'QUERIES':
        props.navigation.navigate('QUERIES', { QueriesScreen });
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={componentStyle.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={componentStyle.container}
      >
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <Text style={{ fontSize: 18 }}> Welcome: {name} </Text> 
          <View style={homeStyles.collectionContainer}>
            <CollectionView 
              data={data} 
              onItemPress={(id: string) => handleItemPress(id, data.find(item => item.id === id)?.title ?? '')} 
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const homeStyles = StyleSheet.create({
  collectionContainer: {
    height: '95%',
  },
});

export default HomeScreen;
