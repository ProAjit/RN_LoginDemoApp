import React from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import Row from './RowScreen';

const data = [
  { id: '1', title: 'CEO Message' },
  { id: '2', title: 'COO Message' },
  { id: '3', title: 'ED Operations Message' },
  { id: '4', title: 'DED SS Message' },
];

const ManagementMessagesScreen = () => {
  const handleRowPress = (title: string) => {
    Alert.alert(`Actual message to be shown for ${title}`);
    console.log(`Tapped on ${title}`);
  };

  const renderItem = ({ item }: { item: { id: string; title: string } }) => (
    <Row title={item.title} onPress={() => handleRowPress(item.title)} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ManagementMessagesScreen;