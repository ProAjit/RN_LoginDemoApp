import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, Image, StyleSheet, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import componentStyle from './styles/componentStyle';
import { NetworkStatusProvider, useNetworkStatus } from './Reachability/NetworkStatusContext';
import OverlayActivityIndicator from './Utilities/OverlayActivityIndicator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppSingleton from './AppSingleton/AppSingleton';

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
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  const setUserNameValue = () => {
    const singleton = AppSingleton.getInstance();
    singleton.setUserName(name);
  };

  const displayLoader = () => {
    if (name.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Please enter both username and password.');
    } else {
      setShow(true);
      setUserNameValue()
      setTimeout(() => {
      setShow(false);
      props.navigation.navigate("Main", { screen: 'Home', params: { name } });
     }, 3000);
    }
  };

  const forgotPasswordPressed = () => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, backgroundColor: '#F4F6FF' }}>
      <NetworkStatusProvider>
        <KeyboardAwareScrollView contentContainerStyle={componentStyle.scrollView}>
          <NetworkComponent />
          <View style={componentStyle.container}>
            <View style={logoStyles.outerContainer}>
              <View style={logoStyles.innerContainer}>
                <Image
                  source={require('/Users/ajitsatarkar/Documents/React_Native_Git/RN_LoginPOC/RN_LoginDemoApp/images/login/logo.png')}
                  style={logoStyles.logo}
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
              />
              <Text style={componentStyle.text}>Password</Text>
              <TextInput
                style={componentStyle.inputText}
                secureTextEntry={true}
                placeholder="Enter your password"
                onChangeText={setPassword}
              />
              <TouchableOpacity style={componentStyle.loginButton} onPress={displayLoader}>
                <Text style={componentStyle.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={componentStyle.forgotButton} onPress={forgotPasswordPressed}>
                <Text style={componentStyle.forgotButtonText}>Forgot Password</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </NetworkStatusProvider>
      <OverlayActivityIndicator show={show} />
    </KeyboardAvoidingView>
  );
};

const logoStyles = StyleSheet.create({
  outerContainer: {
    flex: 1, // Full screen
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: '#F4F6FF', // Background color for outer container
    marginTop: 150,
  },
  innerContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F6FF', // Background color for inner container

  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain', // Ensure the image fits within the dimensions
  },
});

export default LoginScreen;
