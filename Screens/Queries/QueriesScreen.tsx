import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
  KeyboardAvoidingView, FlatList, TouchableWithoutFeedback, ActivityIndicator
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { submitQueriesData } from '../../Networking/QueriesServices';
import bottomButtonStyles from '../../Styles/bottomButtonStyles';
import { COLORS, DEVICE, REGIONS } from '../../Constants/GlobalData';
import AppSingleton from '../../AppSingleton/AppSingleton';
import { SCREEN_NAME } from '../../Constants/GlobalData';
const singleton = AppSingleton.getInstance();
import { useNavigation, NavigationProp } from '@react-navigation/native';
type QueryScreenNavigationProp = NavigationProp<{ QueryDetailsScreen: undefined }>;

const QueriesScreen = () => {
  const name = singleton.username;
  const email = singleton.eMail;
  const phone = singleton.mobileNumber;
  const title = singleton.title;
  const badgeId = singleton.badgeNumber;
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [region, setRegion] = useState(''); // State for selected region
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State for dropdown visibility
  const navigation = useNavigation<QueryScreenNavigationProp>();

  const handleSubmit = async () => {
    if (region.trim() === '' || subject.trim() === '' || description.trim() === '') {
      Alert.alert('Error', 'Please fill all mandatory fields.');
      return;
    }
    setLoading(true);
    try {
      const response = await submitQueriesData(name, email, phone, description, region, title, subject, badgeId)
      const queryId = response.QueryId as String
      console.log('\nsubmitQuery queryId', queryId);
      if (queryId) {
        Alert.alert('Success', `QueryId: ${queryId}`);
        navigation.navigate(SCREEN_NAME.queryDetails, queryId);  // Navigate on success
      } else {
        Alert.alert('Error', `Unable to submit data. Status code: ${response}`);
      }
      console.log('\nsubmitQuery SUCCESS');
      setTimeout(() => {
        handleCancel();
      }, 100); // Reset the form on success
    } catch (error) {
      Alert.alert('Error', 'There was an error submitting query. Please try again.');
      console.log(JSON.stringify(error))
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setSubject('')
    setDescription('');
    setRegion('');
    setIsDropdownVisible(false)
  };

  const handleScreenPress = () => {
    if (isDropdownVisible) {
      setIsDropdownVisible(false)
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

  return (
    <TouchableWithoutFeedback onPress={handleScreenPress}>
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: COLORS.appBackground }} behavior="padding">
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled
        >
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
            {/* <Ionicons name={isDropdownVisible ? 'chevron-up' : 'chevron-down'} size={20} color="#000" /> */}
          </TouchableOpacity>
          {isDropdownVisible && renderRegionDropdown()}


          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.staticInput}
              defaultValue={singleton.fullName}
              editable={false} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.staticInput}
              defaultValue={singleton.eMail}
              editable={false} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone number</Text>
            <TextInput
              style={styles.staticInput}
              defaultValue={singleton.mobileNumber}
              editable={false} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.staticInput}
              defaultValue={singleton.title}
              editable={false} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Subject</Text>
            <TextInput
              style={styles.input}
              value={subject}
              onChangeText={setSubject}
              autoCorrect={false}
              spellCheck={false}
              placeholder="Enter Subject"
              maxLength={255} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              value={description}
              onChangeText={setDescription}
              autoCorrect={false}
              spellCheck={false}
              placeholder="Enter Description"
              maxLength={255}
              multiline
            />
          </View>
          {loading && (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color={COLORS.appThemeBlue} />
            </View>)}
        </KeyboardAwareScrollView>
        <View style={bottomButtonStyles.buttonContainer}>
          <TouchableOpacity style={bottomButtonStyles.button} onPress={handleSubmit} disabled={loading}>
            <Text style={bottomButtonStyles.buttonText}>{loading ? 'Submitting...' : 'Submit'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={bottomButtonStyles.whiteButton} onPress={handleCancel} disabled={loading}>
            <Text style={bottomButtonStyles.whiteButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 15,
    backgroundColor: COLORS.appBackground,
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
    marginTop: 80,
    marginLeft: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  staticInput: {
    height: 40,
    paddingLeft: 0,
    backgroundColor: COLORS.appBackground,
  },
  inputGroup: {
    marginBottom: 12,
  },
  regionLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 8,
    backgroundColor: COLORS.white,
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
    top: DEVICE.height / 3,
    left: DEVICE.width / 2,
    zIndex: 10,
  },
});

export default QueriesScreen;
