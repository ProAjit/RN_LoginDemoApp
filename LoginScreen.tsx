/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
import { TouchableOpacity, ActivityIndicator} from 'react-native';
// import navStyle from './styles/navStyle';
import componentStyle from './styles/componentStyle';
import { ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { red } from 'react-native-reanimated/lib/typescript/Colors';
// import { useNavigation } from '@react-navigation/native';

// const handlePress = (navigator) => {
//   console.warn('You have pressed the button!');
//   navigator.navigate('Home')
// };


const LoginScreen = (props) => {
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

  // const navigator = useNavigation()

  return (
    <SafeAreaView style={componentStyle.safeArea}>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={componentStyle.container}
    >
    <ScrollView contentContainerStyle={componentStyle.scrollView}>
    <View style={componentStyle.container}>
      <ImageBackground source={require('/Users/ajitsatarkar/Documents/Study/Demo/LoginDemoApp/images/backGround.png')}
      style={componentStyle.backgroundImage}>

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
     </View>

     {/* <Button title='Login'
     color="#841584"
     onPress={()=> props.navigation.navigate("Home")}>
     </Button> */}

     <ActivityIndicator size={60} color={"red"} animating={show} />
    
     <TouchableOpacity style={componentStyle.button} onPress={()=> displayLoader()}>
        <Text style={componentStyle.buttonText}>Login</Text>
     </TouchableOpacity>

     </ImageBackground>
    </View>
    </ScrollView>
   </KeyboardAvoidingView>
   </SafeAreaView>
  );
};

export default LoginScreen;
