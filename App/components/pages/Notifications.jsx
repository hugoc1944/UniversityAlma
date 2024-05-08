import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import NotificationsScreen from '../elements/Notifications';


export default function Notifications() {
  return (
    <View style={styles.container}>
      <NotificationsScreen />
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});