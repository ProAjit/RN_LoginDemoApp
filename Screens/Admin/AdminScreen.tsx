import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const AdminScreen = () => {
  const data = [
    { id: '1', title: 'Update incident history' },
    { id: '2', title: 'Update training history' },
  ];

  const renderItem = ({ item }: { item: { id: string; title: string } }) => (
    <TouchableOpacity style={styles.itemContainer}>
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
  container:{
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
    backgroundColor: '#F4F6FF',
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
