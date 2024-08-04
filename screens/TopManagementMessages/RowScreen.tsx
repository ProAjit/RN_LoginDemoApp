import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface RowProps {
  title: string;
  onPress: () => void;
}

const Row: React.FC<RowProps> = ({ title, onPress }) => (
  <View style={styles.backGroundView}>
  <TouchableOpacity style={styles.row} onPress={onPress}>
    <Text style={styles.title}>{title}</Text>
    <Icon name="chevron-forward" size={24} color='rgba(2, 28, 52, 1.0' style={styles.arrow} />
  </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  backGroundView: {
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'lightgray',
    borderRadius: 7,
  },
  title: {
    fontSize: 16,
    fontWeight: 'heavy',
    tintColor: 'rgba(2, 28, 52, 1.0',
  },
  arrow: {
    fontSize: 16,
  },
});

export default Row;