import React from 'react';
import { View, Text, Linking, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { COLORS } from '../../Constants/globalData';

interface DataItem {
  title: string;
  url: string;
}

const data: DataItem[] = [
  { title: 'Link -> 1', url: 'https://react.dev/blog/2023/03/16/introducing-react-dev' },
  { title: 'Link -> 2', url: 'https://react.dev/blog/2023/03/16/introducing-react-dev' },
  { title: 'Link -> 3', url: 'https://react.dev/blog/2023/03/16/introducing-react-dev' },
  { title: 'Link -> 4', url: 'https://react.dev/blog/2023/03/16/introducing-react-dev' },
  { title: 'Link -> 5', url: 'https://react.dev/blog/2023/03/16/introducing-react-dev' },
];

const LinksScreen: React.FC = () => {
  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  const renderItem = ({ item }: { item: DataItem }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <TouchableOpacity onPress={() => openLink(item.url)}>
        <Text style={styles.link}>{item.url}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSeparator = () => (
    <View style={styles.separator} />
  );

  return (
    <View style={styles.mainContainer}>
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={renderSeparator}
      contentContainerStyle={styles.container}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.appBackground,
  },
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: 'rgba(2, 28, 52, 1.0)',
    borderWidth: 0.17,
  },
  item: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    tintColor: 'rgba(2, 28, 52, 1.0)'
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  separator: {
    height: 1,
    backgroundColor: '#CED0CE',
    marginVertical: 10,
  },
});

export default LinksScreen;