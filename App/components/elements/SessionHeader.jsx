import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

export default function SessionHeader({data}){

  return (
    <View style={styles.temp}>
      <View style={styles.headerShape}>
        <Image source={require('../../assets/course/yoga.png')} style={styles.image}></Image>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    headerShape: {
        width: 550,
        height: 600,
        borderRadius: 300,
        backgroundColor: '#9BB1FD',
        position: 'relative',
        bottom: 300,
        marginRight: -0,

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0
    },
    temp: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    image: {
      flex: 1,
      width: 200,
      height: 200,
      resizeMode: 'contain',
      top: 140
    }

})