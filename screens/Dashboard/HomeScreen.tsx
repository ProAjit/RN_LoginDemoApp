import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,  } from 'react-native';
import { SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import componentStyle from '../../styles/componentStyle';
import CollectionView from './CollectionView';

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
  { id: '6', title: 'SAFETY ALERTS' },
  { id: '6', title: 'SAFETY NEWS' },
];

const HomeScreen = (props: { route: any; navigation: { navigate: (arg0: string, arg1: { name: string; }) => void; }; }) => 
  {
  console.warn(props.route.params);
  const {name} = props.route.params;

  const handleItemPress = (id: string, title: string) => {
    console.warn(`Selected Item: ${id}`);
    props.navigation.navigate('ListViewScreen', { name: title });
    switch (id) {
      case 'TOP MANAGEMENT MESSAGES':
        props.navigation.navigate('ListViewScreen', { name: title });
        break;
      case 'QUERIES':
        props.navigation.navigate('QueriesScreen', { name: title });
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

    <View style={{alignItems: 'center', marginTop: 10}}>
    <Text style={{fontSize: 18}}>  Welcome : {name} </Text>
    
    <View style={homeStyles.collectionContainer}>
    <CollectionView data={data} onItemPress={(id: string) => handleItemPress(id, data.find(item => item.id === id)?.title ?? '')} />
    </View>
    <BottomButtonComponent />
    </View>

   </KeyboardAvoidingView>
   </SafeAreaView>
  );
};

const BottomButtonComponent = () => {
  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.buttonContainer}>
        <TouchableOpacity style={homeStyles.homeButton} onPress={() => Alert.alert('Home Button Pressed!')}>
          <Text style={homeStyles.buttonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={homeStyles.feedbackButton} onPress={() => Alert.alert('Feedback Button Pressed!')}>
          <Text style={homeStyles.buttonText}>Feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity style={homeStyles.aboutButton} onPress={() => Alert.alert('About Button Pressed!')}>
          <Text style={homeStyles.buttonText}>About</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const homeStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    height: 40,
    backgroundColor: 'white',
    marginBottom: 10,
    paddingBottom: 10,
  },
  buttonContainer: {
    height: 40,
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 10,
  },
  homeButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(2, 28, 52, 1.0)',  // Button color
    tintColor: 'white',
    borderRadius: 10,
    marginRight: 10,
  },
  feedbackButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(2, 28, 52, 1.0)',  // Button color
    tintColor: 'white',
    borderRadius: 10,
    marginRight: 10,
  },
  aboutButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(2, 28, 52, 1.0)',  // Button color
    tintColor: 'white',
    borderRadius: 10,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  collectionContainer: {
    height: '85%',
  },
});

export default HomeScreen;