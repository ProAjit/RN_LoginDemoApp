import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const QueriesScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (name.trim() === '' || email.trim() === '' || phone.trim() === '' || title.trim() === '' || type.trim() === '') {
      Alert.alert('Error', 'Please enter all fields.');
    } else {
      Alert.alert('Submitted', `Name: ${name}, Email: ${email}, Phone: ${phone}, Title: ${title}, Type: ${type}, Description: ${description}`);
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
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
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

export default QueriesScreen;
