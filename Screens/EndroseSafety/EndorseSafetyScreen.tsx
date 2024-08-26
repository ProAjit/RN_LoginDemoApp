import React, { useState } from 'react';
import { View, TextInput, Text, Button, Image, TouchableOpacity, 
  StyleSheet, Dimensions, Alert, KeyboardAvoidingView, SafeAreaView, 
  Platform} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { launchCamera, CameraOptions } from 'react-native-image-picker';
import { submitSafetyEndorsement } from '../../Networking/EndorseSafetyServices';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import SafetyIncidentsList from './SafetyIncidentsList';
// import PrivacySnapshot from 'react-native-privacy-snapshot'; // Import the library

const { height } = Dimensions.get('window');

const data = [
  { badgeNumber: 111111, name: 'Employee Name 1', location: 'Riyadh office', status: 'Accepted' },
  { badgeNumber: 222222, name: 'Employee Name 2', location: 'Pune office', status: 'Under Review' },
  { badgeNumber: 333333, name: 'Employee Name 3', location: 'Noida Office', status: 'Submitted' },
  { badgeNumber: 444444, name: 'Employee Name 4', location: 'India office', status: 'Approved' },
  { badgeNumber: 555555, name: 'Employee Name 5', location: 'UAE office', status: 'Closed' },
  { badgeNumber: 666666, name: 'Employee Name 6', location: 'KSA Office', status: 'Rejected' },
];

const EndorseSafetyScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [badgeNumber, setBadgeNumber] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

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
    <View style={styles.container}>
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
    </View>
  );

  const renderHistoryRequestsContent = () => (
    <View style={styles.historyContainer}>
    <SafetyIncidentsList data={data} />
    </View>
  );

  // useEffect(() => {
  //   if (Platform.OS === 'ios') {
  //     if (PrivacySnapshot) {
  //       PrivacySnapshot.enabled(true); // Enable privacy snapshot for iOS
  //     } else {
  //       Alert.alert('Error', 'PrivacySnapshot module is null');
  //     }
  //   }

  //   return () => {
  //     if (Platform.OS === 'ios') {
  //       if (PrivacySnapshot) {
  //         PrivacySnapshot.enabled(false); // Disable privacy snapshot when leaving the screen
  //       }
  //     }
  //   };
  // }, []);

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor:'#F4F6FF',}} behavior="padding">
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled>
      <View style={styles.segmentedControlContainer}>
        <SegmentedControl
          values={['Raise Incident', 'Incidents History']}
          selectedIndex={selectedIndex}
          onChange={(event) => {
            setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
          }}
          style={styles.segmentedControl}
          tintColor="rgba(2, 28, 52, 1.0)"
          fontStyle={{ fontSize: 16, fontWeight: 'bold', color: '#fff'}}
          backgroundColor="rgba(230, 230, 230, 1.0)"
        />
      </View>

      <View>
        {selectedIndex === 0 ? renderNewRequestContent() : renderHistoryRequestsContent()}
      </View>
      </KeyboardAwareScrollView>
      {selectedIndex === 0 && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Submitting...' : 'Submit'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.whiteButton} onPress={handleCancel} disabled={loading}>
            <Text style={styles.whiteButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
   );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#F4F6FF',
    flexDirection: 'column',
  },
  historyContainer: {
    flex: 1,
    padding: 2,
    marginTop: 5,
    backgroundColor: '#F4F6FF',
  },
  segmentedControlContainer: {
    marginVertical: 10,
    paddingHorizontal: 40,
  },
  segmentedControl: {
    height: 35,
    borderColor: 'black',
    borderWidth: 0.2,
  },
  topView: {
    height: height * 0.15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 0.5,
    borderRadius: 5,
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
    borderWidth: 0.5,
    borderRadius: 5,
    paddingLeft: 8,
    backgroundColor: '#fff',
  },
  multilineInput: {
    height: 60,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    height: 40,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#F4F6FF',
  },
  button: {
    flex: 1,
    backgroundColor: 'rgba(2, 28, 52, 1.0)',
    padding: 10,
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
    padding: 10,
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
  },
  historyText: {
    fontSize: 18,
    color: 'rgba(2, 28, 52, 1.0)',
  },
});

export default EndorseSafetyScreen;