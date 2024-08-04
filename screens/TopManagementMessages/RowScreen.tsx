import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface RowProps {
  title: string;
  onPress: () => void;
}

const Row: React.FC<RowProps> = ({ title, onPress }) => (
  <TouchableOpacity style={styles.row} onPress={onPress}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.arrow}> Drill </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 16,
  },
  arrow: {
    fontSize: 16,
    color: '#000',
  },
});

export default Row;