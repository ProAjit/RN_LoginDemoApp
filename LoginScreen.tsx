/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
import { TouchableOpacity, ActivityIndicator, Image, StyleSheet} from 'react-native';
import componentStyle from './styles/componentStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NetworkStatusProvider, useNetworkStatus } from './Reachability/NetworkStatusContext';

const NetworkComponent: React.FC = () => {
  const { isConnected } = useNetworkStatus();
  return (
    <View>
      <Text />
      {/* <Text>Network status: {isConnected ? 'Online' : 'Offline'}</Text> */}
    </View>
  );
};


const LoginScreen = (props: { navigation: { navigate: (arg0: string, arg1: { name: string; }) => void; }; }) => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)

  const displayLoader = () => {
    setShow(true)
    setTimeout(()=> {
      setShow(false)
      props.navigation.navigate("Home", {name})
    }, 3000)
  }

  const forgotPasswordPressed = () => {
    setShow(true)
    setTimeout(()=> {
      setShow(false)
    }, 3000)
  }

  return (
    // <SafeAreaView>
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={componentStyle.container}>
    <ScrollView contentContainerStyle={componentStyle.scrollView}>
    <NetworkStatusProvider>
    <NetworkComponent/>
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
      <Text style={componentStyle.textHeader}> MNG-HA Employee Self-Service </Text>
      <Text style={componentStyle.text}> Username </Text>
      <TextInput
      style={componentStyle.inputText}
      placeholder="Enter User Name here"
      onChangeText={(text)=>setName(text)}
      />
      <Text style={componentStyle.text}> Password </Text>
      <TextInput
      style={componentStyle.inputText}
      secureTextEntry={true}
      placeholder="Enter your password"
      onChangeText={setPassword}
      />
     <ActivityIndicator size={'large'} color={"darkgray"} animating={show}/>
     <TouchableOpacity style={componentStyle.loginButton} onPress={()=> displayLoader()}>
        <Text style={componentStyle.buttonText}>Login</Text>
     </TouchableOpacity>
     <TouchableOpacity style={componentStyle.forgotButton} onPress={()=> forgotPasswordPressed()}>
        <Text style={componentStyle.forgotButtonText}>Forgot Password</Text>
     </TouchableOpacity>
     </View>
     </View>
    </NetworkStatusProvider>
    </ScrollView>
   </KeyboardAvoidingView>
  //  </SafeAreaView>
  );
};

const logoStyles = StyleSheet.create({
  outerContainer: {
    flex: 1, // Full screen
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: '#f0f0f0', // Background color for outer container
    marginTop: 100,
  },
  innerContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Background color for inner container
    // borderRadius: 10, // Optional: for rounded corners
    // shadowColor: '#000', // Optional: for shadow effect
    // shadowOpacity: 0.25,
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 4,
    // elevation: 5, // For shadow on Android
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain', // Ensure the image fits within the dimensions
  },
});

export default LoginScreen;
