
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../Screens/Dashboard/HomeScreen';
import LoginScreen from '../LoginScreen';
import AboutScreen from '../Screens/Dashboard/AboutScreen';
import QueriesScreen from '../Screens/Queries/QueriesScreen';
import ManagementMessagesScreen from '../Screens/TopManagementMessages/ManagementMessages';
import EndorseSafetyScreen from '../Screens/EndroseSafety/EndorseSafetyScreen';
import E_TrainingScreen from '../Screens/E-Training/E_TrainingScreen';
import ScheduleClassTraining from '../Screens/Training/ScheduleClassTraining';
import AdminScreen from '../Screens/Admin/AdminScreen';
import UpdateTrainingScreen from '../Screens/Admin/UpdateTrainingScreen';
import UpdateIncidentsScreen from '../Screens/Admin/UpdateIncidentsScreen';
import LinksScreen from '../Screens/Links/LinksScreen';
import SafetyNewsScreen from '../Screens/SafetyNews/SafetyNewsScreen';
import SafetyAlertsScreen from '../Screens/SafetyAlerts/SafetyAlertsScreen';
import TrainingDetails from '../Screens/Training/TrainingDetails';
import QueriesDetails from '../Screens/Queries/QueriesDetails';
import IncidentDetails from '../Screens/EndroseSafety/IncidentDetails';
import { CATEGORY, SCREEN_NAME, COLORS } from '../Constants/GlobalData';

const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name={SCREEN_NAME.dashboard} component={HomeScreen}
      options={{
        headerLeft: () => null,
        headerStyle: { backgroundColor: COLORS.appThemeBlue },
        headerTintColor: COLORS.white,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontSize: 18
        }
      }} />

    <Stack.Screen name={CATEGORY.topManangement} component={ManagementMessagesScreen}
      options={{
        headerStyle: { backgroundColor: COLORS.appThemeBlue },
        headerTintColor: COLORS.white,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontSize: 16
        }
      }} />

    <Stack.Screen name={CATEGORY.safetyIssue} component={EndorseSafetyScreen}
      options={{
        headerStyle: { backgroundColor: COLORS.appThemeBlue },
        headerTintColor: COLORS.white,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontSize: 16
        }
      }} />

    <Stack.Screen name={CATEGORY.scheduleTraining} component={ScheduleClassTraining}
      options={{
        headerStyle: { backgroundColor: COLORS.appThemeBlue },
        headerTintColor: COLORS.white,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontSize: 16
        }
      }} />

    <Stack.Screen name={CATEGORY.queries} component={QueriesScreen}
      options={{
        headerStyle: { backgroundColor: COLORS.appThemeBlue},
        headerTintColor: COLORS.white,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontSize: 16
        }
      }} />

    <Stack.Screen name={CATEGORY.eTraining} component={E_TrainingScreen}
      options={{
        headerStyle: { backgroundColor: COLORS.appThemeBlue },
        headerTintColor: COLORS.white,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontSize: 16
        }
      }} />

    <Stack.Screen name={CATEGORY.links} component={LinksScreen}
      options={{
        headerStyle: { backgroundColor: COLORS.appThemeBlue },
        headerTintColor: COLORS.white,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontSize: 16
        }
      }} />

    <Stack.Screen name={CATEGORY.safetyNews} component={SafetyNewsScreen}
      options={{
        headerStyle: { backgroundColor: COLORS.appThemeBlue },
        headerTintColor: COLORS.white,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontSize: 16
        }
      }} />

    <Stack.Screen name={CATEGORY.safetyAlert} component={SafetyAlertsScreen}
      options={{
        headerStyle: { backgroundColor: COLORS.appThemeBlue },
        headerTintColor: COLORS.white,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontSize: 16
        }
      }} />

    <Stack.Screen name={CATEGORY.admin} component={AdminScreen}
      options={{
        headerStyle: { backgroundColor: COLORS.appThemeBlue },
        headerTintColor: COLORS.white,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontSize: 16
        }
      }} />

    <Stack.Screen name={CATEGORY.about} component={AboutScreen}
      options={{
        headerStyle: { backgroundColor: COLORS.appThemeBlue },
        headerTintColor: COLORS.white,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontSize: 16
        }
      }} />

    <Stack.Screen name={SCREEN_NAME.updateTrainings} component={UpdateTrainingScreen}
      options={{
        headerStyle: { backgroundColor: COLORS.appThemeBlue },
        headerTintColor: COLORS.white,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontSize: 16
        }
      }} />

    <Stack.Screen name={SCREEN_NAME.updateIncidents} component={UpdateIncidentsScreen}
      options={{
        headerStyle: { backgroundColor: COLORS.appThemeBlue },
        headerTintColor: COLORS.white,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontSize: 16
        }
      }} />

    <Stack.Screen name={SCREEN_NAME.trainingDetails} component={TrainingDetails}
      options={{
        headerStyle: { backgroundColor: COLORS.appThemeBlue },
        headerTintColor: COLORS.white,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontSize: 16
        }
      }} />

    <Stack.Screen name={SCREEN_NAME.queriesDetails} component={QueriesDetails}
        options={{
          headerStyle: { backgroundColor: COLORS.appThemeBlue },
          headerTintColor: COLORS.white,
          headerBackTitleVisible: false,
          headerTitleStyle: {
          fontSize: 16
        }
      }} />

  <Stack.Screen name={SCREEN_NAME.incidentDetails} component={IncidentDetails}
          options={{
            headerStyle: { backgroundColor: COLORS.appThemeBlue },
            headerTintColor: COLORS.white,
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