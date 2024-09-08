import React from 'react';
import { View, Text, Linking, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { COLORS } from '../../Constants/GlobalData';

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
    <View style={styles.container}>
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={renderSeparator}
      contentContainerStyle={styles.notificationContainer}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    paddingVertical: 10,
    paddingHorizontal: '2.5%',
  },
  notificationContainer: {
    backgroundColor: COLORS.white,
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
    width: '95%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  separator: {
    height: 1,
    backgroundColor: '#CED0CE',
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  item: {
    marginTop: 10,
    marginBottom: 10,
    width: '95%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default LinksScreen;