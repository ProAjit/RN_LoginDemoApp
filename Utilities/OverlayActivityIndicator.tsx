import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS } from '../Constants/globalData';

const OverlayActivityIndicator = ({ show }) => {
  return (
    show && (
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color={COLORS.appThemeBlue} />
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