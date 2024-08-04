import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface RowProps {
  title: string;
  onPress: () => void;
}

const Row: React.FC<RowProps> = ({ title, onPress }) => (
  <View style={styles.backGroundView}>
  <TouchableOpacity style={styles.row} onPress={onPress}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.arrow}> Next </Text>
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
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
  },
  arrow: {
    fontSize: 16,
    color: 'rgba(2, 28, 52, 1.0',
  },
});

export default Row;