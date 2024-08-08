import React, { useState, useRef } from 'react';
import { View, TextInput, Text, Button, Image, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { height } = Dimensions.get('window');

const EndorseSafetyScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [badgeNumber, setBadgeNumber] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const cameraRef = useRef<RNCamera | null>(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setImage(data.uri);
    }
  };

  const handleSubmit = () => {
    Alert.alert('Submitted', `Name: ${name}, Badge: ${badgeNumber}, Description: ${description}`);
  };

  const handleCancel = () => {
    setName('');
    setDescription('');
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled
    >
    <View style={styles.container}>
      <View style={styles.topView}>
        {image && <Image source={{ uri: image }} style={styles.imageView} />}
        <Button title="Take A Picture" onPress={takePicture} />
      </View>
      <View style={styles.bottomView}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input}  onChangeText={setName} value={name} placeholder="Name" maxLength={255} autoCorrect={false} spellCheck={false}/>
        <Text style={styles.label}>Badge Number</Text>
        <TextInput style={styles.input} onChangeText={setBadgeNumber} value={badgeNumber} placeholder="Badge Number" maxLength={255}  autoCorrect={false} spellCheck={false}/>
        <Text style={styles.label}>Locations</Text>
        <TextInput style={styles.input}  onChangeText={setLocation} value={location} placeholder="Locations" maxLength={255}  autoCorrect={false} spellCheck={false}/>
        <Text style={styles.label}>Description</Text>
        <TextInput style={[styles.input, styles.multilineInput]} onChangeText={setDescription} value={description} placeholder="Description"  autoCorrect={false} spellCheck={false} maxLength={255} multiline />
      </View>
    </View>
    <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.whiteButton} onPress={handleCancel}>
          <Text style={styles.whiteButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  topView: {
    height: height * 0.15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'yellow'
  },
  bottomView: {
    height: height * 0.65,
  },
  imageView: {
    width: 100,
    height: 100,
  },
  label: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 8,
  },
  multilineInput: {
    height: 60,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    height: 40,
    margin: 10,
  },
  button: {
    flex: 1,
    backgroundColor: 'rgba(2, 28, 52, 1.0)',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  whiteButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(2, 28, 52, 1.0)',
  },
  whiteButtonText: {
    color: 'rgba(2, 28, 52, 1.0)',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EndorseSafetyScreen;

//useRef hook to create a reference to the camera, 
//which is used in the takePicture function to capture the image. 
//The captured image’s URI is then set as the state for the image variable