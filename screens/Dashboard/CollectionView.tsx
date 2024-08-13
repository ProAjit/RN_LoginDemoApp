import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

interface Item {
  id: string;
  title: string;
}

interface CollectionViewProps {
  data: Item[];
  onItemPress: (title: string) => void;
}

const numColumns = 2;
const { width } = Dimensions.get('window');
const itemWidth = width / numColumns;

const CollectionView: React.FC<CollectionViewProps> = ({ data, onItemPress }) => {

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity style={styles.item} onPress={() => onItemPress(item.title)}>
      <Image source={require('/Users/ajitsatarkar/Documents/React_Native_Git/RN_LoginPOC/RN_LoginDemoApp/images/login/logo.png')} 
      style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.title}
      numColumns={numColumns}
      columnWrapperStyle={styles.row}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    height: 125,
  },
  item: {
    backgroundColor: 'rgba(2, 28, 52, 1.0)',  // Button color
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 4,
    width: itemWidth - 18, // Subtracting marginHorizontal to fit exactly
    alignItems: 'center',
    borderRadius: 5,
  },
  title: {
    fontSize: 12,
    textAlign: 'center',
    color:'white',
    fontWeight: 'bold',
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 10,
    borderRadius: 30,
  },
});

export default CollectionView;