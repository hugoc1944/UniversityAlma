import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import NotificationsScreen from '../elements/Notifications';


export default function UploadPage() {
  return (
    <View style={styles.container}>
      <Text>OLÁ HUGO SOU A UPLOAD PAGE</Text>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});