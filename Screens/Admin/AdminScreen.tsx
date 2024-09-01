import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

// Define the type for navigation
type AdminScreenNavigationProp = NavigationProp<{ UpdateTrainingScreen: undefined }>;

const AdminScreen: React.FC = () => {
  const navigation = useNavigation<AdminScreenNavigationProp>();

  const data = [
    { id: '1', title: 'Update incidents history' },
    { id: '2', title: 'Update trainings history' },
  ];

  const handlePress = (item: { id: string; title: string }) => {
    if (item.id === '2') {
      navigation.navigate('UpdateTrainingScreen');
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
    backgroundColor: '#F4F6FF',
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
    color: 'rgba(2, 28, 52, 1.0)',
  },
  icon: {
    color: 'rgba(2, 28, 52, 1.0)',
  },
});

export default AdminScreen;
