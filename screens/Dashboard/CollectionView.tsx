import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAddressCard, faMessage, faPersonShelter, faGraduationCap, faClipboardQuestion, 
  faBlog, faLink, faNewspaper, faBellSlash, faAddressBook, faUserTie, faPeoplePulling, faPeopleRoof } from '@fortawesome/free-solid-svg-icons';

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

const getIcon = (title: string) => {
  console.log(title)
  switch (title) {
    case 'TOP MANAGEMENT MESSAGES':
      return faMessage;
    case 'ENDORSE YOUR SAFETY ISSUE':
      return faPersonShelter;
    case 'SCHEDULE IN CLASS TRAINING':
      return faGraduationCap;
    case 'QUERIES':
      return faClipboardQuestion;
    case 'E-TRAINING':
      return faBlog;
    case 'LINKS':
      return faLink;
    case 'SAFETY NEWS':
      return faNewspaper;
    case 'SAFETY ALERTS':
      return faBellSlash;
    case 'ABOUT':
      return faAddressBook;
    case 'ADMIN':
      return faUserTie;
    default:
      return faAddressCard;
  }
};

const CollectionView: React.FC<CollectionViewProps> = ({ data, onItemPress }) => {

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity style={styles.item} onPress={() => onItemPress(item.title)}>
      <FontAwesomeIcon style={styles.iconStyle} icon={getIcon(item.title)} size={45} color='#fff' />
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
    height: 130,
  },
  item: {
    backgroundColor: 'rgba(2, 28, 52, 1.0)',  // Button color
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 8,
    width: itemWidth - 20, // Subtracting marginHorizontal to fit exactly
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'column',
  },
  title: {
    fontSize: 12,
    textAlign: 'center',
    color:'white',
    fontWeight: 'bold',
    marginTop: 10,
  },
  iconStyle: {
    marginTop: 10,
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 10,
    borderRadius: 30,
  },
});

export default CollectionView;

/*
// faMessage
// faPersonShelter
// faGraduationCap, faBuildingColumns
// faClipboardQuestion, faFileCircleQuestion
// faBlog, faSchoolCircleExclamation, faSchool,
// faLink
// faBellSlash, faBell
// faNewspaper, faEnvelope
// faUserTie
// faAddressBook
*/