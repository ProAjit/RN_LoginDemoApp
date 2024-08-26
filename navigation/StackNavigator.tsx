import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../Screens/Dashboard/HomeScreen';
import LoginScreen from '../LoginScreen';
import FeedbackScreen from '../Screens/Dashboard/FeedbackScreen';
import AboutScreen from '../Screens/Dashboard/AboutScreen';
import QueriesScreen from '../Screens/Queries/Queris';
import ManagementMessagesScreen from '../Screens/TopManagementMessages/ManagementMessages';
import EndorseSafetyScreen from '../Screens/EndroseSafety/EndorseSafetyScreen';
import E_TrainingScreen from '../Screens/E_TrainingScreen';
import ScheduleClassTraining from '../Screens/ScheduleTraining/ScheduleClassTraining';
import PdfViewer from '../Screens/PdfViewer';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator>

    <Stack.Screen name="Safety 24/7" component={HomeScreen} 
      options={{ headerLeft: () => null , 
      headerStyle: {backgroundColor: 'rgba(2, 28, 52, 1.0)'},
      headerTintColor: '#fff',
      headerBackTitleVisible: false,
      headerTitleStyle: {
        fontSize: 18
      }}}/>
      
    <Stack.Screen name="TOP MANAGEMENT MESSAGES" component={ManagementMessagesScreen} 
     options={{  
      headerStyle: {backgroundColor: 'rgba(2, 28, 52, 1.0)'},
      headerTintColor: '#fff',
      headerBackTitleVisible: false,
      headerTitleStyle: {
        fontSize: 16
      }}}/>

    <Stack.Screen name="ENDORSE YOUR SAFETY ISSUE" component={EndorseSafetyScreen} 
      options={{  
      headerStyle: {backgroundColor: 'rgba(2, 28, 52, 1.0)'},
      headerTintColor: '#fff',
      headerBackTitleVisible: false,
      headerTitleStyle: {
        fontSize: 16
      }}}/>

    <Stack.Screen name="SCHEDULE IN CLASS TRAINING" component={ScheduleClassTraining} 
      options={{  
      headerStyle: {backgroundColor: 'rgba(2, 28, 52, 1.0)'},
      headerTintColor: '#fff',
      headerBackTitleVisible: false,
      headerTitleStyle: {
        fontSize: 16
      }}}/>

    <Stack.Screen name="QUERIES" component={QueriesScreen} 
      options={{  
      headerStyle: {backgroundColor: 'rgba(2, 28, 52, 1.0)'},
      headerTintColor: '#fff',
      headerBackTitleVisible: false,
      headerTitleStyle: {
        fontSize: 16
      }}}/>

    <Stack.Screen name="E-TRAINING" component={E_TrainingScreen} 
      options={{  
      headerStyle: {backgroundColor: 'rgba(2, 28, 52, 1.0)'},
      headerTintColor: '#fff',
      headerBackTitleVisible: false,
      headerTitleStyle: {
        fontSize: 16
      }}}/>

    <Stack.Screen name="SAFETY NEWS" component={PdfViewer} 
      options={{  
      headerStyle: {backgroundColor: 'rgba(2, 28, 52, 1.0)'},
      headerTintColor: '#fff',
      headerBackTitleVisible: false,
      headerTitleStyle: {
        fontSize: 16
      }}}/>

  </Stack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName: string;
        if (route.name === 'Home') {
          iconName = 'home-outline';
        } else if (route.name === 'FEEDBACK') {
          iconName = 'chatbubble-ellipses-outline';
        } else if (route.name === 'ABOUT') {
          iconName = 'information-circle-outline';
        } else {
          iconName = 'alert-circle-outline'; // Fallback icon
        }
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'rgba(2, 28, 52, 1.0)',
      headerStyle: {
         backgroundColor: '#F4F6FF',
      },
      headerTintColor: '#F4F6FF',
      headerBackTitleVisible: false, // Hides the back button text
      headerTitleStyle: {
        fontSize: 16
      },
      headerShown: true,
    })}
  >
    <Tab.Screen name="Home" component={HomeStack} 
    options={{ headerShown: false, headerTitleStyle: { fontSize: 20} }}/>
    <Tab.Screen name="Feedback" component={FeedbackScreen} 
    options={{ headerTitleStyle: { fontSize: 20} }}/>
    <Tab.Screen name="About" component={AboutScreen} 
    options={{ headerTitleStyle: { fontSize: 20} }}/>
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
