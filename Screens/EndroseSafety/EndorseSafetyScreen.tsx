import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, Image, TouchableOpacity, 
  StyleSheet, Dimensions, Alert, KeyboardAvoidingView, SafeAreaView, 
  Platform, Switch} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { launchCamera, CameraOptions } from 'react-native-image-picker';
import { submitSafetyEndorsement } from '../../Networking/EndorseSafetyServices';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import SafetyIncidentsList from './SafetyIncidentsList';
import bottomButtonStyles from '../../styles/bottomButtonStyles';

const { height } = Dimensions.get('window');

const data = [
  { badgeNumber: 111111, name: 'Employee Name 1', description:'', location: 'Riyadh office', status: 'Open' },
  { badgeNumber: 222222, name: 'Employee Name 2', description:'', location: 'Pune office', status: 'Closed' },
  { badgeNumber: 333333, name: 'Employee Name 3', description:'', location: 'Noida Office', status: 'Open' },
  { badgeNumber: 444444, name: 'Employee Name 4', description:'', location: 'India office', status: 'Closed' },
  { badgeNumber: 555555, name: 'Employee Name 5', description:'', location: 'UAE office', status: 'Open' },
  { badgeNumber: 666666, name: 'Employee Name 6', description:'', location: 'KSA Office', status: 'Closed' },
];

const EndorseSafetyScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [badgeNumber, setBadgeNumber] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isShareDataEnabled, setIsShareDataEnabled] = useState(true); // State for the switch

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

      {/* New Switch View */}
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Share my data</Text>
        <Switch
          value={isShareDataEnabled}
          onValueChange={(value) => setIsShareDataEnabled(value)}
          style={styles.switch}
        />
      </View>

      <View style={styles.bottomView}>
        {isShareDataEnabled && (
          <>
            <Text style={styles.label}>Name (optional)</Text>
            <TextInput
              style={styles.staticInput}
              onChangeText={setName}
              placeholder='Logged User Name'
              editable={false}
            />

            <Text style={styles.label}>Badge Number (optional)</Text>
            <TextInput
              style={styles.staticInput}
              onChangeText={setBadgeNumber}
              placeholder='Logged User Badge'
              keyboardType="numeric"
              editable={false}
            />
          </>
        )}

        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          onChangeText={setLocation}
          value={location}
          placeholder="Issue Location"
          maxLength={255}
          autoCorrect={false}
          spellCheck={false}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          onChangeText={setDescription}
          value={description}
          placeholder="Enter Description"
          autoCorrect={false}
          spellCheck={false}
          maxLength={255}
          multiline
        />
      </View>
    </View>
  );

  const renderHistoryRequestsContent = () => (
    <View style={styles.historyContainer}>
      <SafetyIncidentsList data={data} />
    </View>
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#F4F6FF' }} behavior="padding">
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled
      >
        <View style={styles.segmentedControlContainer}>
          <SegmentedControl
            values={['Raise Incident', 'Incidents History']}
            selectedIndex={selectedIndex}
            onChange={(event) => {
              setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
            }}
            style={styles.segmentedControl}
            tintColor="rgba(2, 28, 52, 1.0)"
            fontStyle={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}
            backgroundColor="rgba(230, 230, 230, 1.0)"
          />
        </View>

        <View>
          {selectedIndex === 0 ? renderNewRequestContent() : renderHistoryRequestsContent()}
        </View>
      </KeyboardAwareScrollView>
      {selectedIndex === 0 && (
        <View style={bottomButtonStyles.buttonContainer}>
          <TouchableOpacity style={bottomButtonStyles.button} onPress={handleSubmit} disabled={loading}>
            <Text style={bottomButtonStyles.buttonText}>{loading ? 'Submitting...' : 'Submit'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={bottomButtonStyles.whiteButton} onPress={handleCancel} disabled={loading}>
            <Text style={bottomButtonStyles.whiteButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 15,
    marginBottom: 0,
  },
  switchLabel: {
    fontSize: 16,
    paddingRight: 15,
  },
  bottomView: {
    height: height * 0.50,
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
  staticInput: {
    height: 40,
    paddingLeft: 0,
    backgroundColor: '#F4F6FF',
  },
  switch: {
    transform: [{ scaleX: 0.85 }, { scaleY: 0.8 }], // Adjust the scale to fit within the wrapper
  },
  multilineInput: {
    height: 60,
  },
});

export default EndorseSafetyScreen;