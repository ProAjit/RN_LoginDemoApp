
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../Screens/Dashboard/HomeScreen';
import LoginScreen from '../LoginScreen';
import FeedbackScreen from '../Screens/Dashboard/FeedbackScreen';
import AboutScreen from '../Screens/Dashboard/AboutScreen';
import QueriesScreen from '../Screens/Queries/Queris';
import ManagementMessagesScreen from '../Screens/TopManagementMessages/ManagementMessages';
import EndorseSafetyScreen from '../Screens/EndroseSafety/EndorseSafetyScreen';
import E_TrainingScreen from '../Screens/E_TrainingScreen';
import ScheduleClassTraining from '../Screens/ScheduleTraining/ScheduleClassTraining';
import PdfViewer from '../Screens/SafetyNews/PdfViewer';
import AdminScreen from '../Screens/Admin/AdminScreen';
import UpdateTrainingScreen from '../Screens/Admin/UpdateTrainingScreen';
import UpdateIncidentsScreen from '../Screens/Admin/UpdateIncidentsScreen';

const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Safety 24/7" component={HomeScreen}
      options={{
        headerLeft: () => null,
        headerStyle: { backgroundColor: 'rgba(2, 28, 52, 1.0)' },
        headerTintColor: '#fff',
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontSize: 18
        }
      }} />

    <Stack.Screen name="TOP MANAGEMENT MESSAGES" component={ManagementMessagesScreen}
      options={{
        headerStyle: { backgroundColor: 'rgba(2, 28, 52, 1.0)' },
        headerTintColor: '#fff',
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontSize: 16
        }
      }} />

    <Stack.Screen name="ENDORSE YOUR SAFETY ISSUE" component={EndorseSafetyScreen}
      options={{
        headerStyle: { backgroundColor: 'rgba(2, 28, 52, 1.0)' },
        headerTintColor: '#fff',
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontSize: 16
        }
      }} />

    <Stack.Screen name="SCHEDULE IN CLASS TRAINING" component={ScheduleClassTraining}
      options={{
        headerStyle: { backgroundColor: 'rgba(2, 28, 52, 1.0)' },
        headerTintColor: '#fff',
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontSize: 16
        }
      }} />

    <Stack.Screen name="QUERIES" component={QueriesScreen}
      options={{
        headerStyle: { backgroundColor: 'rgba(2, 28, 52, 1.0)' },
        headerTintColor: '#fff',
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontSize: 16
        }
      }} />

    <Stack.Screen name="E-TRAINING" component={E_TrainingScreen}
      options={{
        headerStyle: { backgroundColor: 'rgba(2, 28, 52, 1.0)' },
        headerTintColor: '#fff',
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontSize: 16
        }
      }} />

    <Stack.Screen name="LINKS" component={PdfViewer}
      options={{
        headerStyle: { backgroundColor: 'rgba(2, 28, 52, 1.0)' },
        headerTintColor: '#fff',
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontSize: 16
        }
      }} />

    <Stack.Screen name="SAFETY NEWS" component={PdfViewer}
      options={{
        headerStyle: { backgroundColor: 'rgba(2, 28, 52, 1.0)' },
        headerTintColor: '#fff',
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontSize: 16
        }
      }} />

    <Stack.Screen name="SAFETY ALERTS" component={PdfViewer}
      options={{
        headerStyle: { backgroundColor: 'rgba(2, 28, 52, 1.0)' },
        headerTintColor: '#fff',
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontSize: 16
        }
      }} />

    <Stack.Screen name="ADMIN" component={AdminScreen}
      options={{
        headerStyle: { backgroundColor: 'rgba(2, 28, 52, 1.0)' },
        headerTintColor: '#fff',
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontSize: 16
        }
      }} />

    <Stack.Screen name="ABOUT" component={AboutScreen}
      options={{
        headerStyle: { backgroundColor: 'rgba(2, 28, 52, 1.0)' },
        headerTintColor: '#fff',
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontSize: 16
        }
      }} />

    <Stack.Screen name="UpdateTrainingScreen" component={UpdateTrainingScreen}
      options={{
        headerStyle: { backgroundColor: 'rgba(2, 28, 52, 1.0)' },
        headerTintColor: '#fff',
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontSize: 16
        }
      }} />

    <Stack.Screen name="UpdateIncidentsScreen" component={UpdateIncidentsScreen}
      options={{
        headerStyle: { backgroundColor: 'rgba(2, 28, 52, 1.0)' },
        headerTintColor: '#fff',
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontSize: 16
        }
      }} />

  </Stack.Navigator>
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
          component={HomeStack}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;