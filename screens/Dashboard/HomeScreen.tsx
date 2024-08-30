import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import componentStyle from '../../styles/componentStyle';
import CollectionView from './CollectionView';
import ManagementMessagesScreen from '../TopManagementMessages/ManagementMessages';
import EndorseSafetyScreen from '../EndroseSafety/EndorseSafetyScreen';
import AppSingleton from '../../AppSingleton/AppSingleton';
import QueriesScreen from '../Queries/Queris';
import ScheduleClassTraining from '../ScheduleTraining/ScheduleClassTraining';
import E_TrainingScreen from '../E_TrainingScreen';
import PdfViewer from '../SafetyNews/PdfViewer';
import AboutScreen from './AboutScreen';

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
  { id: '9', title: 'ADMIN' },
  { id: '10', title: 'ABOUT' },
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
      case 'SCHEDULE IN CLASS TRAINING':
        props.navigation.navigate('SCHEDULE IN CLASS TRAINING', { ScheduleClassTraining });
        break;
      case 'QUERIES':
        props.navigation.navigate('QUERIES', { QueriesScreen });
        break;
      case 'E-TRAINING':
        props.navigation.navigate('E-TRAINING', { E_TrainingScreen });
        break;
      case 'LINKS':
       props.navigation.navigate('LINKS', { PdfViewer });
        break;
      case 'SAFETY NEWS':
        props.navigation.navigate('SAFETY NEWS', { PdfViewer });
        break;
      case 'SAFETY ALERTS':
        props.navigation.navigate('SAFETY ALERTS', { PdfViewer });
        break;
      case 'ADMIN':
        props.navigation.navigate('ADMIN', { PdfViewer });
        break;
      case 'ABOUT':
        props.navigation.navigate('ABOUT', { AboutScreen });
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
    marginTop: 10,
    marginBottom: -10,
  },
}); 

export default HomeScreen;


// UIColor(red: 19/255, green: 172/255, blue: 232/255, alpha: 1.0) - Sky Blue - #13ACE8
// UIColor(red: 211/255, green: 215/255, blue: 219/255, alpha: 1.0) - gray - #D3D7DB
// UIColor(red: 244/255, green: 246/255, blue: 255/255, alpha: 1.0) - background white F4F6FF