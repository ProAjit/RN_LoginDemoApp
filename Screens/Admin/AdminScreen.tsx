import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { COLORS } from '../../Constants/GlobalData';

// Define the type for navigation
type AdminScreenNavigationProp = NavigationProp<{ UpdateIncidentsScreen: undefined, UpdateTrainingScreen: undefined }>;

const AdminScreen: React.FC = () => {
  const navigation = useNavigation<AdminScreenNavigationProp>();

  const data = [
    { id: '1', title: 'Update incidents history' },
    { id: '2', title: 'Update trainings history' },
  ];

  const handlePress = (item: { id: string; title: string }) => {
    if (item.id === '1') {
      navigation.navigate('Update Incidents'); 
    } else {
      navigation.navigate('Update Trainings');
    }
    // Add more conditions here if you need to navigate to different screens
  };

  const renderItem = ({ item }: { item: { id: string; title: string } }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handlePress(item)}>
      <Text style={styles.itemText}>{item.title}</Text>
      <FontAwesomeIcon icon={faChevronRight} style={styles.icon} />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  itemText: {
    fontSize: 18,
    color: COLORS.appThemeBlue,
  },
  icon: {
    color: COLORS.appThemeBlue,
  },
});

export default AdminScreen;
