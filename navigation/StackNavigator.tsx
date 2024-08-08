import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/Dashboard/HomeScreen';
import LoginScreen from '../LoginScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import AboutScreen from '../screens/AboutScreen';
import QueriesScreen from '../screens/Queries/Queris';
import ListViewScreen from '../screens/TopManagementMessages/ManagementMessages';
import EndorseSafetyScreen from '../screens/EndorseSafetyScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Queries" component={ListViewScreen} />
  </Stack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName: string;
        if (route.name === 'Home') {
          iconName = 'home-outline';
        } else if (route.name === 'Feedback') {
          iconName = 'chatbubble-ellipses-outline';
        } else if (route.name === 'About') {
          iconName = 'information-circle-outline';
        } else {
          iconName = 'alert-circle-outline'; // Fallback icon
        }
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
      headerStyle: {
         backgroundColor: 'rgba(2, 28, 52, 1.0)'
      },
      headerTintColor: '#fff',
      headerBackTitleVisible: false, // Hides the back button text
      headerTitleStyle: {
        fontSize: 20
      }
    })}
  >
    {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
    <Tab.Screen name="Home" component={HomeStack}/>
    <Tab.Screen name="Feedback" component={QueriesScreen} />
    <Tab.Screen name="About" component={ListViewScreen} />
    {/* // <Tab.Screen name="Endorse Safety Issue" component={EndorseSafetyScreen}/> */}
  </Tab.Navigator>
);

const StackNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Main" 
          component={TabNavigator} 
          options={{
            headerShown: false,
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
