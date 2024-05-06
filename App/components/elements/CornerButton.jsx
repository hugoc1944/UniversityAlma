import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

export default function FourSquareButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <View style={styles.subButton} />
      <View style={styles.subButton} />
      <View style={styles.subButton} />
      <View style={styles.subButton} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    left: 20,
    top: 55,
    width: 40,
    height: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  subButton: {
    width: 15,
    height: 15,
    backgroundColor: '#C2A5F7',
    borderRadius: 5,
    margin: 2,
  }
});
