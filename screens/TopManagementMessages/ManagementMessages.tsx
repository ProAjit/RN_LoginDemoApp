import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronUp, faChevronDown, faAnglesDown, faAnglesUp } from '@fortawesome/free-solid-svg-icons';

const data = [
  { id: 'CEO Message', title: 'Here is expanded view for showing actual CEO message' },
  { id: 'COO Message', title: 'Here is expanded view for showing actual COO message' },
  { id: 'ED Operations Message', title: 'Here is expanded view for showing actual ED Operations message' },
  { id: 'DED SS Message', title: 'Here is expanded view for showing actual DED SS Message message' },
];

const ManagementMessagesScreen = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleRowPress = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderItem = ({ item }: { item: { id: string; title: string } }) => {
    const isExpanded = expandedId === item.id;

    return (
      <TouchableOpacity onPress={() => handleRowPress(item.id)}>
        <View style={[styles.row, isExpanded && styles.expandedRow]}>
          <View style={styles.rowContent}>
          <Text style={styles.idText}>{item.id}</Text>
          {isExpanded && <Text style={styles.titleText}>{item.title}</Text>}
          </View>
          <FontAwesomeIcon 
          icon={isExpanded ? faAnglesUp : faAnglesDown} 
          size={16} 
          color='rgba(2, 28, 52, 1.0)'/>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={expandedId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FF',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 0.5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginTop: 15,
    margin: 10,
    borderRadius: 8,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2.5,
    // Shadow for Android
    elevation: 4,
  },
  rowContent: {
    flexDirection: 'column',
    flex: 1,  // Takes up available space in the row
  },
  expandedRow: {
    backgroundColor: '#fff',
  },
  idText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 14,
    marginTop: 10,  // Adds spacing between idText and titleText
    tintColor: 'rgba(2, 28, 52, 1.0)',
  },
  arrowIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,  // Adds spacing between text and icon
  },
});

export default ManagementMessagesScreen;























/*
Explanation:
rowContent View: The rowContent View is added inside the row View. It wraps both the idText and titleText, allowing them to be stacked vertically. When the row is expanded, the titleText is shown directly below the idText within the same view, maintaining the layout's consistency.

Flex Properties: The rowContent View uses flex: 1 to take up the remaining space within the row, ensuring that the idText and titleText are properly aligned on the left side, while the arrow icon stays on the right.

Margin and Padding Adjustments: The marginTop property is added to titleText to create spacing between the idText and the titleText when expanded, enhancing readability.

This should now display the title text within the same view when a row is expanded, keeping everything neatly within the same boundaries.
*/