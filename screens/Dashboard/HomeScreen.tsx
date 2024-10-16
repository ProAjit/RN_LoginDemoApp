import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import componentStyle from '../../Styles/componentStyle';
import CollectionView from './CollectionView';
import AppSingleton from '../../AppSingleton/AppSingleton';

import ManagementMessagesScreen from '../TopManagementMessages/ManagementMessages';
import EndorseSafetyScreen from '../EndroseSafety/EndorseSafetyScreen';
import QueriesScreen from '../Queries/QueriesScreen';
import ScheduleClassTraining from '../Training/ScheduleClassTraining';
import E_TrainingScreen from '../E-Training/E_TrainingScreen';
import AboutScreen from './AboutScreen';
import AdminScreen from '../Admin/AdminScreen';
import LinksScreen from '../Links/LinksScreen';
import SafetyNewsScreen from '../SafetyNews/SafetyNewsScreen';
import SafetyAlertsScreen from '../SafetyAlerts/SafetyAlertsScreen';
import { HomeCategoriesArr, Item } from '../../Constants/GlobalData';
import { CATEGORY } from '../../Constants/GlobalData';

const HomeScreen = (props: { route: any; navigation: { navigate: (screen: string, params?: any) => void }; }) => {
  const shareInstance = AppSingleton.getInstance();
  const name = shareInstance.getUserName();
  const [alertsVisited, setAlertsVisited] = useState(false);
  // Filtering data based on beSafeIsAdmin before passing to CollectionView
  const filteredCategoriesData = shareInstance.beSafeIsAdmin
    ? HomeCategoriesArr // If admin, show all categories including ADMIN
    : HomeCategoriesArr.filter((item) => item.title !== CATEGORY.admin); // Remove ADMIN if user not admin

  const handleItemPress = (id: string, title: string) => {
    switch (id) {
      case CATEGORY.topManangement:
        props.navigation.navigate(CATEGORY.topManangement, { ManagementMessagesScreen });
        break;
      case CATEGORY.safetyIssue:
        props.navigation.navigate(CATEGORY.safetyIssue, { EndorseSafetyScreen });
        break;
      case CATEGORY.scheduleTraining:
        props.navigation.navigate(CATEGORY.scheduleTraining, { ScheduleClassTraining });
        break;
      case CATEGORY.queries:
        props.navigation.navigate(CATEGORY.queries, { QueriesScreen });
        break;
      case CATEGORY.eTraining:
        props.navigation.navigate(CATEGORY.eTraining, { E_TrainingScreen });
        break;
      case CATEGORY.links:
        props.navigation.navigate(CATEGORY.links, { LinksScreen });
        break;
      case CATEGORY.safetyNews:
        props.navigation.navigate(CATEGORY.safetyNews, { SafetyNewsScreen });
        break;
      case CATEGORY.safetyAlert:
        props.navigation.navigate(CATEGORY.safetyAlert, { SafetyAlertsScreen });
        setAlertsVisited(true);  // Mark alerts as visited
        break;
      case CATEGORY.admin:
        props.navigation.navigate(CATEGORY.admin, { AdminScreen });
        break;
      case CATEGORY.about:
        props.navigation.navigate(CATEGORY.about, { AboutScreen });
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={componentStyle.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={componentStyle.container}
      >
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <Text style={{ fontSize: 18 }}>Welcome {name} </Text>
          <View style={homeStyles.collectionContainer}>
            <CollectionView
              data={filteredCategoriesData}
              alertsVisited={alertsVisited}
              onItemPress={(id: string) => handleItemPress(id, filteredCategoriesData.find(item => item.id === id)?.title ?? '')}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const homeStyles = StyleSheet.create({
  collectionContainer: {
    height: '95%',
    marginTop: 10,
    marginBottom: -10,
  },
});

export default HomeScreen;