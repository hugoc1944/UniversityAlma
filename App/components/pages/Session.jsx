import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import AudioPlayer from '../elements/ProgressBar';
import SessionHeader from '../elements/SessionHeader';
import Volume from '../elements/Volume';
import { Audio } from 'expo-av';


export default function Session() {
  return (
    <View style={styles.container}>
        <SessionHeader />
        <AudioPlayer />
        <Volume />
        
      
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