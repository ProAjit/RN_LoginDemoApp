import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const QueriesScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    Alert.alert('Submitted', `Name: ${name}, Email: ${email}, Phone: ${phone}, Title: ${title}, Type: ${type}, Description: ${description}`);
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
        <TextInput style={styles.input} value={name} onChangeText={setName} autoCorrect={false} spellCheck={false}/>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          maxLength={15}
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
          autoCorrect={false}
          spellCheck={false}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} autoCorrect={false} spellCheck={false}/>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Type</Text>
        <TextInput style={styles.input} value={type} onChangeText={setType} autoCorrect={false} spellCheck={false}/>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={description}
          onChangeText={setDescription}
          autoCorrect={false}
          spellCheck={false}
          multiline
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} />
        <Button title="Cancel" onPress={handleCancel} />
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
    height: 80,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
});

export default QueriesScreen;