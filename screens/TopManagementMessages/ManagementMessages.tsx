import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAnglesDown, faAnglesUp } from '@fortawesome/free-solid-svg-icons';
import { COLORS } from '../../Constants/GlobalData';

const data = [
  { id: 'CEO Message', title: 'Here is expanded view for showing actual CEO message' },
  { id: 'COO Message', title: 'Here is expanded view for showing actual COO message' },
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
          color={COLORS.appThemeBlue} />
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
    backgroundColor: COLORS.appBackground,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 0.5,
    borderColor: '#ccc',
    backgroundColor: COLORS.white,
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
    backgroundColor: COLORS.white,
  },
  idText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 14,
    marginTop: 10,  // Adds spacing between idText and titleText
    tintColor: COLORS.appThemeBlue,
  },
  arrowIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,  // Adds spacing between text and icon
  },
});

export default ManagementMessagesScreen;