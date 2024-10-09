import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import componentStyle from './Styles/componentStyle';
import { NetworkStatusProvider, useNetworkStatus } from './Reachability/NetworkStatusContext';
import OverlayActivityIndicator from './Utilities/OverlayActivityIndicator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppSingleton from './AppSingleton/AppSingleton';
import { COLORS, IMAGES } from './Constants/GlobalData';
import { loginApi, profileApi } from './Networking/Login/LoginService';

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

  const loginApiCall = async () => {
    console.log('\nloginApiCall');

    if (name.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Please enter both username and password.');
    } else {
      setShow(true); // Show loading indicator
      try {
        console.log('\nLogin Api Call started');
        const userResp = await loginApi(name, password); // Call the login API
        console.log('\nLogin Only User Data', userResp.data);

        if (userResp.data.InFuture1 && userResp.data.Fullname) {
          // Check for session_id and session_token
          const onlyName = userResp.data.Fullname.split(/\d+/)[0].trim();  // Split by number and take the first part
          console.log('\nLogin Api onlyName', onlyName);
          const [session_id, session_token] = userResp.data.InFuture1.split('~');
          console.log('\nLogin Api session_id', session_id);
          console.log('\nLogin Api session_token', session_token);

          // On successful login, call the profileApi
          console.log('\nProfile Api Call started');
          const profileResp = await profileApi(name, session_id, session_token);
          console.log('\nUser Only Profile Data', profileResp);
          // // Handle employee profile response
          console.log('\nEmployee Profile', `\nName: ${profileResp.employeeName}\nEmail: ${profileResp.empEmail}`);
          const singleton = AppSingleton.getInstance();

          // Set values to AppSingleton
          singleton.setUserName(onlyName);
          singleton.setFullName(onlyName);
          singleton.setBadgeNumber(userResp.data.Fullname);
          singleton.setMobileNumber(userResp.data.MobileNumber);
          //singleton.setToken(userResp.data.InFuture4);
          singleton.setTitle(profileResp.position)
          singleton.setEmail(profileResp.empEmail)
          // Navigate to Home screen with params
          console.log('\nEmp Badge number', singleton.badgeNumber);
          props.navigation.navigate("Main", { screen: 'Home', params: { name } });
        } else {
          console.error('Login failed', 'Please check your credentials.');
        }
      } catch (error) {
        console.error('Error while loginApi data:', JSON.stringify(error));
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
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: COLORS.appBackground }} behavior="padding">
      <KeyboardAwareScrollView
        contentContainerStyle={componentStyle.scrollContainer}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled>
        <NetworkStatusProvider>
          <NetworkComponent />
          <View style={componentStyle.container}>
            <View style={logoStyles.outerContainer}>
              <View style={logoStyles.innerContainer}>
              <Image
              source={{ uri: IMAGES.logo }}
              style={logoStyles.logo}
              resizeMode="cover" // You can change this to 'contain' or other options as needed
              />
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