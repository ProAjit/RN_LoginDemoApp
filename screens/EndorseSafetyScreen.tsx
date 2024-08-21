import React, { useState } from 'react';
import { View, TextInput, Text, Button, Image, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { launchCamera, CameraOptions } from 'react-native-image-picker';
import { submitSafetyEndorsement } from '../Networking/EndorseSafetyServices';

const { height } = Dimensions.get('window');

const EndorseSafetyScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [badgeNumber, setBadgeNumber] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'raiseIncident' | 'incidentsHistory'>('raiseIncident');

  const openCamera = () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      cameraType: 'back',
      quality: 1,
      includeBase64: true,
      saveToPhotos: false,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        Alert.alert('User cancelled image picker');
      } else if (response.errorCode) {
        Alert.alert('ImagePicker Error: camera_unavailable');
      } else if (response.assets) {
        const uri = response.assets[0].uri;
        setImage(uri || null);
      }
    });
  };

  const handleSubmit = async () => {
    if (location.trim() === '' || description.trim() === '') {
      Alert.alert('Error', 'Location and Description are mandatory fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await submitSafetyEndorsement(name, badgeNumber, location, description, image);

      console.log('Response:', response); // Print the complete response

      if (response?.result?.statusCode === 200) {
        Alert.alert('Success', response.result.message);
        handleCancel(); // Reset the form on success
      } else {
        Alert.alert('Error', 'There was an issue with your submission. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'There was an error submitting safety issue. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setName('');
    setBadgeNumber('');
    setLocation('');
    setDescription('');
    setImage(null);
  };

  const renderNewRequestContent = () => (
    <>
      <View style={styles.topView}>
        {image && <Image source={{ uri: image }} style={styles.imageView} />}
        <Button title="Take A Picture" onPress={openCamera} />
      </View>
      <View style={styles.bottomView}>
        <Text style={styles.label}>Name (optional)</Text>
        <TextInput style={styles.input} onChangeText={setName} value={name} placeholder="Employee Name" maxLength={50} autoCorrect={false} spellCheck={false} />

        <Text style={styles.label}>Badge Number (optional)</Text>
        <TextInput style={styles.input} onChangeText={setBadgeNumber} value={badgeNumber} keyboardType="numeric" placeholder="#000000" maxLength={6} autoCorrect={false} spellCheck={false} />

        <Text style={styles.label}>Location</Text>
        <TextInput style={styles.input} onChangeText={setLocation} value={location} placeholder="Issue Location" maxLength={255} autoCorrect={false} spellCheck={false} />

        <Text style={styles.label}>Description</Text>
        <TextInput style={[styles.input, styles.multilineInput]} onChangeText={setDescription} value={description} placeholder="Enter Description" autoCorrect={false} spellCheck={false} maxLength={255} multiline />
      </View>
    </>
  );

  const renderHistoryRequestsContent = () => (
    <View style={styles.historyView}>
      <Text style={styles.historyText}>ToDo: Here is list of old requests</Text>
    </View>
  );

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled
    >
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity
          style={[styles.topLeftButton, selectedTab === 'raiseIncident' ? styles.activeButton : styles.inactiveButton]}
          onPress={() => setSelectedTab('raiseIncident')}
        >
        <Text style={[styles.buttonText, selectedTab === 'raiseIncident' ? styles.activeButtonText : styles.inactiveButtonText]}>Raise Incident</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.topRightButton, selectedTab === 'incidentsHistory' ? styles.activeButton : styles.inactiveButton]}
          onPress={() => setSelectedTab('incidentsHistory')}
        >
        <Text style={[styles.buttonText, selectedTab === 'incidentsHistory' ? styles.activeButtonText : styles.inactiveButtonText]}>Incidents History</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {selectedTab === 'raiseIncident' ? renderNewRequestContent() : renderHistoryRequestsContent()}
      </View>

      {selectedTab === 'raiseIncident' && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Submitting...' : 'Submit'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.whiteButton} onPress={handleCancel} disabled={loading}>
            <Text style={styles.whiteButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  topButtonsContainer: {
    height: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 8,
    margin: 10,
  },
  topLeftButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    marginRight: -15,
    zIndex: 1, // Default zIndex
  },
  topRightButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    width: 80,
    marginLeft: -15,
    zIndex: 1, // Default zIndex
  },
  activeButton: {
    backgroundColor: 'rgba(2, 28, 52, 1.0)',
    zIndex: 2, // Increase zIndex for the active button
  },
  inactiveButton: {
    backgroundColor: '#fff',
    borderColor: 'rgba(2, 28, 52, 1.0)',
    borderWidth: 1,
    zIndex: 1, // Lower zIndex for the inactive button
  },
  activeButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  inactiveButtonText: {
    color: 'rgba(2, 28, 52, 1.0)',
    fontSize: 15,
    fontWeight: 'semibold',
  },
  topView: {
    height: height * 0.15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
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
    borderRadius: 2,
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
  historyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyText: {
    fontSize: 18,
    color: 'rgba(2, 28, 52, 1.0)',
  },
});

export default EndorseSafetyScreen;