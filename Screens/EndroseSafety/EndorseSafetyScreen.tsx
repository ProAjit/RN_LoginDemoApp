import React, { useState } from 'react';
import { View, TextInput, Text, ActivityIndicator, Image, TouchableOpacity,
  StyleSheet, Alert, KeyboardAvoidingView, Switch, 
  FlatList, TouchableWithoutFeedback} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { launchCamera, CameraOptions } from 'react-native-image-picker';
import { submitSafetyEndorsement } from '../../Networking/EndorseSafety/EndorseSafetyServices';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import SafetyIncidentsList from './SafetyIncidentsList';
import bottomButtonStyles from '../../Styles/bottomButtonStyles';
import segmentStyle from '../../Styles/segmentStyle';
import { COLORS, DEVICE, REGIONS } from '../../Constants/GlobalData';
import AppSingleton from '../../AppSingleton/AppSingleton';
import { SCREEN_NAME } from '../../Constants/GlobalData';
import { useNavigation, NavigationProp } from '@react-navigation/native';
type IncidentScreenNavigationProp = NavigationProp<{ IncidentDetailsScreen: undefined }>;

const EndorseSafetyScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null); // State for storing image name
  const [name, setName] = useState('');
  const [badgeNumber, setBadgeNumber] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isShareDataEnabled, setIsShareDataEnabled] = useState(true); // State for the switch
  const [region, setRegion] = useState(''); // State for selected region
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State for dropdown visibility
  const singleton = AppSingleton.getInstance();
  const navigation = useNavigation<IncidentScreenNavigationProp>();

  // Camera launch logic
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
        const uri = response.assets[0].base64;
        const fileName = response.assets[0].fileName;
        setImage(uri || null);
        setImageName(fileName || null); // Save the image name
      }
    });
  };

  const handleSubmit = async () => {
    if (region.trim() === '' || location.trim() === '' || description.trim() === '') {
      Alert.alert('Error', 'Please fill mandatory fields.');
      return;
    }

    setLoading(true);
  
    try {
      // Prepare image data in base64 format if image is present
      let base64Image = null;
      if (image) {
        base64Image = image.startsWith('data:image/') ? image : `${image}`;
      }
  
      // Call the API with the base64 image data and image name
      const response = await submitSafetyEndorsement(singleton.username, singleton.badgeNumber, location, description, region, base64Image, imageName);
      const incidentId = response.IncidentId as String;
      if (incidentId) {
        Alert.alert('Success', `IncidentId: ${incidentId}`);
        navigation.navigate(SCREEN_NAME.incidentDetails, incidentId);  // Navigate on success
      } else {
        Alert.alert('Error', `Failed to submit data. Status code: ${response}`);
      }
      setTimeout(() => {
        handleCancel();
      }, 300);
    } catch (error) {
      Alert.alert('Error', 'Failed to submit data.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setLocation('');
    setDescription('');
    setImage(null);
    setRegion('');
    setIsDropdownVisible(false);
  };

  const handleScreenPress = () => {
    if (isDropdownVisible) {
      setIsDropdownVisible(false);
    }
  };

  const handleRegionSelect = (selectedRegion: React.SetStateAction<string>) => {
    setRegion(selectedRegion);
    setIsDropdownVisible(false);
  };

  const renderRegionDropdown = () => (
    <View style={styles.dropdownContainer}>
      <FlatList
        data={REGIONS.data}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => handleRegionSelect(item)}>
            <Text style={styles.dropdownItemText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const renderNewRequestContent = () => (
    <TouchableWithoutFeedback onPress={handleScreenPress}>
    <View style={styles.container}>
      {/* Region Dropdown */}
      <Text style={styles.regionLabel}>Region</Text>
      <TouchableOpacity
        style={styles.dropdownInput}
        onPress={() => setIsDropdownVisible(!isDropdownVisible)}>
        <TextInput
          placeholder='Select a Region'
          editable={false}
          style={styles.regionText}>{region}
        </TextInput>
      </TouchableOpacity>
      {isDropdownVisible && renderRegionDropdown()}

        <View style={styles.topView}>
          {image && <Image source={{ uri: `data:image/jpeg;base64,${image}` }} style={styles.imageView} />}
          <TouchableOpacity style={bottomButtonStyles.cameraButton} onPress={openCamera}>
            <Text style={bottomButtonStyles.buttonText}>Take A Picture</Text>
          </TouchableOpacity>
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
              defaultValue={singleton.username}
              editable={false}
            />

            <Text style={styles.label}>Badge Number (optional)</Text>
            <TextInput
              style={styles.staticInput}
              onChangeText={setBadgeNumber}
              defaultValue={singleton.badgeNumber}
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
      {loading && (
        <View style={styles.loader}>
        <ActivityIndicator size="large" color={COLORS.appThemeBlue} />
        </View>)}
    </View>
    </TouchableWithoutFeedback>
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: COLORS.appBackground }} behavior="padding">
      <View style={segmentStyle.segmentedControlContainer}>
        <SegmentedControl
          values={['Raise Incident', 'Incidents History']}
          selectedIndex={selectedIndex}
          onChange={(event) => {
            setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
          }}
          style={segmentStyle.segmentedControl}
          tintColor="rgba(2, 28, 52, 1.0)"
          fontStyle={{ fontSize: 16, fontWeight: 'bold', color: COLORS.white }}
          backgroundColor="rgba(230, 230, 230, 1.0)"
        />
      </View>

      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled >
        <View style={styles.container}>
          {selectedIndex === 0 ? renderNewRequestContent() : <SafetyIncidentsList />}
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
    padding: 5,
    backgroundColor: COLORS.appBackground,
    flexDirection: 'column',
  },
  dropdownContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    zIndex: 1000,
    height: 220, // Height for all 5 items
    width: '99%', // Full width of the parent container
    marginTop: 70,
    marginLeft: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  dropdownInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: COLORS.white,
    height: 40,
  },
  regionText: {
    fontSize: 16,
  },
  dropdownItem: {
    padding: 10,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownItemText: {
    fontSize: 16,
  },
  historyContainer: {
    flex: 1,
    marginTop: 5,
    marginBottom: 25,
    backgroundColor: COLORS.appBackground,
  },
  topView: {
    height: DEVICE.height * 0.15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: COLORS.white,
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
    height: DEVICE.height * 0.50,
  },
  imageView: {
    width: 150,
    height: 100,
  },
  regionLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingLeft: 8,
    backgroundColor: COLORS.white,
  },
  staticInput: {
    height: 40,
    paddingLeft: 0,
    backgroundColor: COLORS.appBackground,
  },
  switch: {
    transform: [{ scaleX: 0.85 }, { scaleY: 0.8 }], // Adjust the scale to fit within the wrapper
  },
  multilineInput: {
    height: 60,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: DEVICE.height/3,
    left:  DEVICE.width/2,
    zIndex: 10,
  },
});

export default EndorseSafetyScreen;