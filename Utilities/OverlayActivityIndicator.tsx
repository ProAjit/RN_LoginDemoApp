import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const OverlayActivityIndicator = ({ show }) => {
  return (
    show && (
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color='rgba(2, 28, 52, 1.0)' />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    zIndex: 1,
  },
});

export default OverlayActivityIndicator;