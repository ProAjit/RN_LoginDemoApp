import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, Image, StyleSheet, Alert, } from 'react-native';
import componentStyle from './Styles/componentStyle';
import { NetworkStatusProvider, useNetworkStatus } from './Reachability/NetworkStatusContext';
import OverlayActivityIndicator from './Utilities/OverlayActivityIndicator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppSingleton from './AppSingleton/AppSingleton';
import { COLORS, IMAGES } from './Constants/GlobalData';
import { Buffer } from 'buffer';
import * as Keychain from 'react-native-keychain';
import { loginApi, profileApi, adminUserCheckAPI } from './Networking/Login/LoginService';  // Import both APIs

const NetworkComponent: React.FC = () => {
  const { isConnected } = useNetworkStatus();
  return (
    <View>
      <Text />
       <Text>Network status: {isConnected ? 'Online' : 'Offline'}</Text> 
    </View>
  );
};

interface UserData {
  Username: string;
  IsAdmin: boolean;
  RegionOne: string;
  RegionTwo: string;
  RegionThree: string;
  RegionFour: string;
  RegionFive: string;
  RoleOne: string;
  RoleTwo: string;
  RoleThree: string;
}

const LoginScreen = (props: { navigation: { navigate: (arg0: string, arg1?: any) => void; }; }) => {
  const [name, setName] = useState('IMRANM');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const singleton = AppSingleton.getInstance();
  const [data, setData] = useState<UserData[]>([]);
  // const [name, setName] = useState('safety_mobile_user');
  // const [password, setPassword] = useState('xSur3!eLzP');

  useEffect(() => {
    const clinetName = 'safety_mobile_user'
    const clinetPassword = 'xSur3!eLzP'
    const credentials = `${clinetName}:${clinetPassword}`;
    const encodedCredentials = Buffer.from(credentials).toString('base64');
    console.log('\n ===== ')
    console.log('Authorization: Basic', encodedCredentials)
    console.log('\n ===== ')
    saveCredentials(encodedCredentials) 
  });

  const loginApiCall = async () => {
    console.log('\nloginApiCall');

    if (name.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Please enter both username and password.');
    } else {
      setShow(true); // Show loading indicator
      try {
        console.log('\nLogin Api Call started');
        const loginResponse = await loginApi(name, password); // Call the login API
        console.log('\nLogin Only User Data', loginResponse.data);

        if (loginResponse.data.InFuture1 && loginResponse.data.Fullname) {
          const onlyName = loginResponse.data.Fullname.split(/\d+/)[0].trim();  // Extract name
          console.log('\nLogin Api onlyName', onlyName);

          // Set values to AppSingleton
          singleton.setUserName(onlyName);
          singleton.setFullName(onlyName);
          singleton.setBadgeNumber(loginResponse.data.Fullname);
          singleton.setMobileNumber(loginResponse.data.MobileNumber);

          const [session_id, session_token] = loginResponse.data.InFuture1.split('~');
          console.log('\nLogin Api session_id', session_id);
          console.log('\nLogin Api session_token', session_token);

          // On successful login, call both profileApiCall and adminUserCheckApiCall concurrently
          Promise.all([
             profileApiCall(session_id, session_token),
            adminUserCheckApiCall(session_id, session_token)
          ]).then(() => {
            // After both APIs complete, navigate to Home
            props.navigation.navigate("Main", { screen: 'Home', params: { name } });
          }).catch(error => {
            Alert.alert('Error in one of the API call');
            console.log('\n', JSON.stringify(error));
          });
        } else {
          Alert.alert('Login failed', 'Please check your credentials.');
        }
      } catch (error) {
        Alert.alert('Network error');
        console.error('\nLogin API Error', JSON.stringify(error));
      } finally {
        setShow(false); // Hide loading indicator
      }
    }
  };

  const saveCredentials = async (encodedCredentials: string) => {
    try {
      // Save the credentials to the keychain
      await Keychain.setGenericPassword('auth', encodedCredentials);
      console.log('Credentials saved successfully');
    } catch (error) {
      console.error('Could not save credentials', error);
    }
  };

  const profileApiCall = async (session_id: string, session_token: string) => {
    console.log('\nProfile Api Call started');
    const profileResp = await profileApi(name, session_id, session_token);
    console.log('\nUser Only Profile Data', profileResp);
    singleton.setTitle(profileResp.position);
    singleton.setEmail(profileResp.empEmail);
  }

  const adminUserCheckApiCall = async (session_id: string, session_token: string) => {
    console.log('\nAdmin User Check API Call started');
    const adminCheckRespData = await adminUserCheckAPI(name, session_id, session_token);
    console.log('\nAdmin User Check API response', adminCheckRespData);
    setData(adminCheckRespData); // Set the fetched data
    // You can store any necessary data from this API in singleton or handle it as needed
    singleton.setBeSafeIsAdmin(adminCheckRespData.IsAdmin);
    singleton.setRegion(adminCheckRespData.region);
  }

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
                  resizeMode="cover"
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