import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../LoginScreen';

const Stack = createStackNavigator();

const StackNavigator: React.FC = () => {

  function rgba(arg0: number, arg1: number, arg2: number, arg3: number): string | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation<string | number> | import("react-native").OpaqueColorValue | undefined {
    throw new Error('Function not implemented.');
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" 
      screenOptions={{
        title:"Safety Management",
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: 'rgba(2, 28, 52, 1.0)'
        },
        headerTitleStyle: {
          fontSize: 20
        }
      }}
      >
        <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        />
        <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          title: "Endorse Safety Issue",
          headerBackTitleVisible: false, // Hides the back button text
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;