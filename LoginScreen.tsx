import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, Image, StyleSheet, Alert} from 'react-native';
import componentStyle from './Styles/componentStyle';
import { NetworkStatusProvider, useNetworkStatus } from './Reachability/NetworkStatusContext';
import OverlayActivityIndicator from './Utilities/OverlayActivityIndicator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppSingleton from './AppSingleton/AppSingleton';
import { COLORS } from './Constants/GlobalData';
import { loginApi } from './Networking/Login/LoginService';

const NetworkComponent: React.FC = () => {
  const { isConnected } = useNetworkStatus();
  return (
    <View>
      <Text />
      {/* <Text>Network status: {isConnected ? 'Online' : 'Offline'}</Text> */}
    </View>
  );
};

const LoginScreen = (props: { navigation: { navigate: (arg0: string, arg1?: any) => void; }; }) => {
  const [name, setName] = useState('IMRANM');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  // LoginScreen.tsx
const loginApiCall = async () => {
  if (name.trim() === '' || password.trim() === '') {
    Alert.alert('Error', 'Please enter both username and password.');
  } else {
    setShow(true); // Show loading indicator
    try {
      const response = await loginApi(name, password); // Call the login API
      console.log('\nLogin successful', response);

      // Get the singleton instance
      const singleton = AppSingleton.getInstance();
      // Set values to AppSingleton
      singleton.setUserName(response.username);
      singleton.setFullName(response.fullName);
      singleton.setBadgeNumber(response.fullName); // Assuming the badgeNumber is part of the fullName here
      singleton.setMobileNumber(response.mobileNumber);
      singleton.setToken(response.token);
      console.log('\nUser Data', singleton);

      // Navigate to Home screen with params
      props.navigation.navigate("Main", { screen: 'Home', params: { name } });
    } catch (error) {
      console.log('Login Error', error);
      Alert.alert('Login Failed', 'Please check your username and password.');
    } finally {
      setShow(false); // Hide loading indicator
    }
  }
};

  const forgotPasswordPressed = () => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 300);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: COLORS.appBackground}} behavior="padding">
      <KeyboardAwareScrollView
        contentContainerStyle={componentStyle.scrollContainer}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled>        
        <NetworkStatusProvider>
          <NetworkComponent />
          <View style={componentStyle.container}>
            <View style={logoStyles.outerContainer}>
              <View style={logoStyles.innerContainer}>
                { <Image
                  source={require('/Users/ajitsatarkar/Documents/React_Native_Git/RN_LoginPOC/RN_LoginDemoApp/images/login/logo.png')}
                  style={logoStyles.logo}
                /> }
              </View>
            </View>
            <View style={componentStyle.innerView}>
              <Text style={componentStyle.textHeader}>MNG-HA Employee Self-Service</Text>
              <Text style={componentStyle.text}>Username</Text>
              <TextInput
                style={componentStyle.inputText}
                placeholder="Enter User Name here"
                onChangeText={(text) => setName(text)}
                defaultValue={name}
              />
              <Text style={componentStyle.text}>Password</Text>
              <TextInput
                style={componentStyle.inputText}
                secureTextEntry={true}
                placeholder="Enter your password"
                onChangeText={setPassword}
                defaultValue={password}
              />
              <TouchableOpacity style={componentStyle.loginButton} onPress={loginApiCall}>
                <Text style={componentStyle.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={componentStyle.forgotButton} onPress={forgotPasswordPressed}>
                <Text style={componentStyle.forgotButtonText}>Forgot Password</Text>
              </TouchableOpacity>
            </View>
          </View>
        </NetworkStatusProvider>
      </KeyboardAwareScrollView>
      <OverlayActivityIndicator show={show} />
    </KeyboardAvoidingView>
  );
};

const logoStyles = StyleSheet.create({
  outerContainer: {
    flex: 1, // Full screen
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: COLORS.appBackground, // Background color for outer container
    marginTop: 80,
  },
  innerContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.appBackground, // Background color for inner container
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain', // Ensure the image fits within the dimensions
  },
});

export default LoginScreen;