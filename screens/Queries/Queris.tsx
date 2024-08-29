import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, 
  KeyboardAvoidingView, FlatList, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { submitQueriesData } from '../../Networking/QueriesServices';
import bottomButtonStyles from '../../styles/bottomButtonStyles';

const QueriesScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [region, setRegion] = useState(''); // State for selected region
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State for dropdown visibility
  const regionsData = ['Riyadh', 'Jeddah', 'Macca', 'Madina', 'Hessa'];

  const handleSubmit = async () => {
    if (name.trim() === '' || email.trim() === '' || phone.trim() === '' || title.trim() === '' || type.trim() === '') {
      Alert.alert('Error', 'Please enter values in all fields.');
      return;
    }

    setLoading(true); // Show loader

    try {
      const data = {
        name,
        email,
        phone,
        description,
        type,
        title,
      };
      const response = await submitQueriesData(data);
      // Check the status code and show a message
      if (response.status === 200) {
        Alert.alert('Success', 'Data submitted successfully.');
        handleCancel();
      } else {
        Alert.alert('Error', `Failed to submit data. Status code: ${response.status}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to submit training data.');
    } finally {
      setTimeout(() => {
        setLoading(false); // Hide loader after 0.5 seconds
      }, 500);
    }
  };

  const handleCancel = () => {
    setName('');
    setEmail('');
    setPhone('');
    setTitle('');
    setType('');
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
        data={regionsData}
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
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#F4F6FF'}} behavior="padding">
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
        placeholder='Logged User Name'
        editable={false}/>
      </View>      

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
        style={styles.staticInput}
        placeholder='Logged User Email'
        editable={false}/>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Phone number</Text>
        <TextInput
        style={styles.staticInput}
        placeholder='Logged User Phone'
        editable={false}/>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Title</Text>
        <TextInput
        style={styles.staticInput}
        placeholder='Logged User Designation'
        editable={false}/>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Subject</Text>
        <TextInput 
        style={styles.input} 
        value={type} 
        onChangeText={setType} 
        autoCorrect={false} 
        spellCheck={false} 
        placeholder="Enter Subject" 
        maxLength={255}/>
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
    backgroundColor: '#F4F6FF',
  },
  dropdownContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    zIndex: 1000,
    height: 200, // Height for all 5 items
    width: '99%', // Full width of the parent container
    marginTop: 80,
    marginLeft: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  dropdownInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  regionText: {
    fontSize: 16,
  },
  dropdownItem: {
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownItemText: {
    fontSize: 16,
  },
  staticInput: {
    height: 40,
    paddingLeft: 0,
    backgroundColor: '#F4F6FF',
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
    backgroundColor: '#fff',
  },
  multilineInput: {
    height: 60,
  },
});

export default QueriesScreen;
