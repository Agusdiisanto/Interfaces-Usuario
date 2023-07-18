import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

const FloatingButton = ({ action }) => (
  <TouchableOpacity style={styles.floatingButton} onPress={action} hitSlop={35}>
    <View style={[styles.crossLine, { transform: [{ rotate: '90deg' }] }]} />
    <View style={styles.crossLine} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  floatingButton: {
    backgroundColor: '#1C98F0',
    width: 55,
    height: 55,
    borderRadius: 50,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 15,
    bottom: 15,
    overflow: 'hidden',
    elevation: 5,
  },
  crossLine: {
    position: 'absolute',
    width: 2,
    height: '30%',
    backgroundColor: 'white',
  },
});

export default FloatingButton;
