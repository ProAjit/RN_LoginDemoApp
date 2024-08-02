import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,  } from 'react-native';
import { SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import componentStyle from '../styles/componentStyle';
import { launchCamera, CameraOptions } from 'react-native-image-picker';
import CollectionView from './CollectionView';

const HomeScreen = (props) => {
  console.warn(props.route.params);
  const {name} = props.route.params;
  return (
    <SafeAreaView style={componentStyle.safeArea}>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={componentStyle.container}
    >
      
    <View style={{alignItems: 'center', marginTop: 10}}>
    <Text style={{fontSize: 18}}> 
      Welcome : {name}
    </Text>
    <View style={homeStyles.collectionContainer}>
     <CollectionView />
    </View>
    <BottomButtonComponent />
    </View>

   </KeyboardAvoidingView>
   </SafeAreaView>
  );
};

//   <Button title="Open Camera" onPress={() => Alert.alert('Camera Button Pressed!')} />

const openCamera = () => {
  const options: CameraOptions = {
    mediaType: 'photo',
    cameraType: 'back',
    saveToPhotos: true,
  };

  launchCamera(options, (response) => {
    if (response.didCancel) {
      Alert.alert('User cancelled image picker');
    } else if (response.errorCode) {
      //console.log('ImagePicker Error: ', response.errorCode);
      Alert.alert('ImagePicker Error:  camera_unavailable');
    } else if (response.assets) {
      const source = { uri: response.assets[0].uri };
      console.log('Image URI: ', source.uri);
      Alert.alert('Photo taken!', source.uri);
    }
  });
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
    marginBottom: 10
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