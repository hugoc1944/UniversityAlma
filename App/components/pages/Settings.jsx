import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import  SettingsScreen  from '../elements/Settings.jsx'

export default function Settings() {
  return (
    <View style={styles.container}>
      <SettingsScreen />
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});


