import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS } from '../../Constants/GlobalData';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      {/* Top Image */}
      <Image
        source={{ uri: '/Users/ajitsatarkar/Desktop/AwesomeProject/images/login/logo.png' }} // Replace with your image source
        style={styles.image}
      />

      {/* Ministry Text */}
      <Text style={styles.ministryText}>
        Ministry of National Guard Health Affairs {'\n'}Be Safe
      </Text>

      {/* Support Services Text */}
      <Text style={styles.supportText}>
        Support Services - Operations
        {'\n'}<Text style={styles.riyadhText}>Riyadh</Text>
      </Text>

      {/* Email Address Text */}
      <Text style={styles.emailText}>
        <Text style={styles.boldText}>Email Address:</Text>{' '}
        <Text style={styles.grayText}>test@ngha.com</Text>
      </Text>

      {/* Phone Number Text */}
      <Text style={styles.phoneText}>
        <Text style={styles.boldText}>Phone#</Text>{' '}
        <Text style={styles.grayText}>055003551</Text>{' '}
        <Text style={styles.boldText}>Ext#</Text>{' '}
        <Text style={styles.grayText}>41228</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: COLORS.appBackground,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 16,
    marginTop: 50,
  },
  ministryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 25,
  },
  supportText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'darkgray',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 25,
  },
  riyadhText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'darkgray',
    textAlign: 'center',
  },
  emailText: {
    fontSize: 14,
    color: '#000',
    marginBottom: 8,
    marginTop: 25,
  },
  phoneText: {
    fontSize: 14,
    color: '#000',
    marginTop: 25,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000',
  },
  grayText: {
    color: 'gray',
  },
});

export default AboutScreen;