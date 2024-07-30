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
    <Text style={{fontSize: 20}}> 
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
      <Pressable style={buttonStyles.button} onPress={openCamera}>
        {/* <ImageBackground
          source={require('/Users/ajitsatarkar/Documents/React_Native_Git/RN_LoginPOC/RN_LoginDemoApp/images/camera.png')}
          style={buttonStyles.image}
          imageStyle={{ borderRadius: 10 }} // Optional: round the corners of the image
        >
        </ImageBackground> */}
        <Text style={buttonStyles.buttonText}>Take A Picture</Text>
      </Pressable>
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
        <TouchableOpacity style={BottomButtonStyles.submitButton} onPress={() => Alert.alert('Submit Button Pressed!')}>
          <Text style={BottomButtonStyles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={BottomButtonStyles.cancelButton} onPress={() => Alert.alert('Cancel Button Pressed!')}>
          <Text style={BottomButtonStyles.buttonText}>Cancel</Text>
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
    margin: 10
  },
  buttonContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row'
  },
  submitButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(2, 28, 52, 1.0)',  // Button color
    margin: 1, // Small margin between buttons
    tintColor: 'white',
    borderRadius: 10,
    marginRight: 10,
  },
  cancelButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white',
    margin: 1, // Small margin between buttons
    borderColor: 'rgba(2, 28, 52, 1.0)',
    borderWidth: 0.5,
    tintColor: 'rgba(2, 28, 52, 1.0)',
    borderRadius: 10,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;