import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
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
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#F4F6FF'}} behavior="padding">
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled
    >
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} autoCorrect={false} spellCheck={false} placeholder="Enter Name" maxLength={255}/>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="Enter Email" 
          maxLength={255}
          autoCorrect={false}
          spellCheck={false}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Phone number</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="numeric"
          maxLength={15}
          placeholder='Enter Phone number'
          autoCorrect={false}
          spellCheck={false}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Title</Text>
        <TextInput 
        style={styles.input} 
        value={title} 
        onChangeText={setTitle} 
        placeholder="Enter Title" 
        maxLength={255}
        autoCorrect={false} 
        spellCheck={false}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Type</Text>
        <TextInput 
        style={styles.input} 
        value={type} 
        onChangeText={setType} 
        autoCorrect={false} 
        spellCheck={false} 
        placeholder="Enter Type" 
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 15,
    backgroundColor: '#F4F6FF',
  },
  inputGroup: {
    marginBottom: 12,
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
