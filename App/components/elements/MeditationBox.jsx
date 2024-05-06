import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react'

export default function MeditationBox({data}){

    const togglePlayPause = async () => {
        // TODO: Redirect to the session page
    }

  return (
      <View style={styles.boxShape}>
       <Text style={styles.cardTitle}>Listen & Relax</Text>
       <Text style={styles.cardContent}>A combination of 5 sessions of listening for your mind</Text>
       <Text style={styles.cardContent}>By: Tomás Dias</Text>

<View style={{flexDirection: 'row', marginTop: 20, justifyContent: "space-between", alignItems: "center"}}>
       <Text style={{color: '#fff', fontSize: 16, fontWeight: "bold"}}>5 Sessions</Text>
       <TouchableOpacity style={styles.playPauseButton} onPress={togglePlayPause}>
          <Icon
            name={'play-arrow'}
            size={30}
            color="#000000"
          />
        </TouchableOpacity>
</View>
<Image source={require('../../assets/course/course_flower.png')} style={styles.image}></Image>

      </View>
  )
}

const styles = StyleSheet.create({
    boxShape: {
        width: 192,
        height: 192,
        borderRadius: 20,
        backgroundColor: '#9BB1FD',
        flexDirection: 'column',
        padding: 20,
        overflow: 'hidden'
    },
    cardTitle: {
        fontSize: 22,
        color: '#fff',
        fontWeight: 'bold'
    },
    cardContent: {
        fontSize: 14,
        color: '#fff'
    },
    playPauseButton: {
        width: 30,  
        height: 30,
        borderRadius: 25,  
        backgroundColor: '#ffffff',  
      },
      image: {
        position: 'absolute',
        width: 187,
        height: 187,
        right: -39,
        bottom: -46,
        zIndex: -1,
        transform: [{rotate: '-42deg'}],
        opacity: 0.5
    },
})