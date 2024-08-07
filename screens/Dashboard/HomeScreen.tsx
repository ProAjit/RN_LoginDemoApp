import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import componentStyle from '../../styles/componentStyle';
import CollectionView from './CollectionView';

interface Item {
  id: string;
  title: string;
}

const data: Item[] = [
  { id: '1', title: 'TOP MANAGEMENT MESSAGES' },
  { id: '2', title: 'ENDORSE YOUR SAFETY ISSUE' },
  { id: '3', title: 'SCHEDULE IN CLASS TRAINING' },
  { id: '4', title: 'QUERIES' },
  { id: '5', title: 'E-TRAINING' },
  { id: '6', title: 'LINKS' },
  { id: '7', title: 'SAFETY ALERTS' },
  { id: '8', title: 'SAFETY NEWS' },
];

const HomeScreen = (props: { route: any; navigation: { navigate: (screen: string, params?: any) => void }; }) => {
  const { name } = props.route.params;

  const handleItemPress = (id: string, title: string) => {
    switch (title) {
      case 'TOP MANAGEMENT MESSAGES':
      case 'QUERIES':
        props.navigation.navigate('ListViewScreen', { name: title });
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
          <Text style={{ fontSize: 18 }}>Welcome: {name}</Text>
          <View style={homeStyles.collectionContainer}>
            <CollectionView 
              data={data} 
              onItemPress={(id: string) => handleItemPress(id, data.find(item => item.id === id)?.title ?? '')} 
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
  },
});

export default HomeScreen;
