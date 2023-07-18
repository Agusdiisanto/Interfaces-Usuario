import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CommingSoon = () => {
  return (
    <View style={styles.container}>
      <View style={styles.commingSoonContainer}>
        <Text style={styles.heading}>Comming Soon...</Text>
        <Text style={styles.description}>We are designing these new implementations</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commingSoonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 20,
  },
  heading: {
    fontSize: 32,
    color: '#ff8800',
    marginBottom: 10,
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  description: {
    fontSize: 15,
    color: '#ffffff',
    marginBottom: 20,
  },
});

export default CommingSoon;