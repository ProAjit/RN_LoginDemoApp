/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
import { TouchableOpacity, ActivityIndicator} from 'react-native';
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

  return (
    // <SafeAreaView>
    <KeyboardAvoidingView >
    <ScrollView contentContainerStyle={componentStyle.scrollView}>
    <NetworkStatusProvider>
    <NetworkComponent/>
    <View style={componentStyle.container}>
    <ActivityIndicator size={60} color={"red"} animating={show}/>
    <View style={componentStyle.innerView}>
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
     <TouchableOpacity style={componentStyle.loginButton} onPress={()=> displayLoader()}>
        <Text style={componentStyle.buttonText}>Login</Text>
     </TouchableOpacity>
     </View>
     </View>
    </NetworkStatusProvider>
    </ScrollView>
   </KeyboardAvoidingView>
  //  </SafeAreaView>
  );
};

export default LoginScreen;
