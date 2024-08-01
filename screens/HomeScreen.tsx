import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity,  } from 'react-native';
import { SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import componentStyle from '../styles/componentStyle';
import { Pressable, ImageBackground } from 'react-native';
import buttonStyles from '../styles/buttonStyle';
import { launchCamera, CameraOptions, Asset } from 'react-native-image-picker';


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
    <PressableButton />
    </View>
   </KeyboardAvoidingView>
   </SafeAreaView>
  );;
};

const PressableButton = ()=> {
  return (
    <View style={buttonStyles.container}>
      {/* <Pressable style={buttonStyles.button} onPress={openCamera}>
        <Text style={buttonStyles.buttonText}>Take A Picture</Text>
      </Pressable> */}
      <BottomButtonComponent />
    </View>
  )
}
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
    <View style={BottomButtonStyles.container}>
      <View style={BottomButtonStyles.buttonContainer}>
        <TouchableOpacity style={BottomButtonStyles.homeButton} onPress={() => Alert.alert('Home Button Pressed!')}>
          <Text style={BottomButtonStyles.buttonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={BottomButtonStyles.feedbackButton} onPress={() => Alert.alert('Feedback Button Pressed!')}>
          <Text style={BottomButtonStyles.buttonText}>Feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity style={BottomButtonStyles.aboutButton} onPress={() => Alert.alert('About Button Pressed!')}>
          <Text style={BottomButtonStyles.buttonText}>About</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const BottomButtonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
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
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;