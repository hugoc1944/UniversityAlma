import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react'

export default function HighlightedSession({onPress}){

  const togglePlayPause = async () => {
    onPress();
    // TODO: Redirect to the session page
  };

  return (
    <View style={styles.boxShape}>
      {/* Add text */}
      <View style={{flexDirection: 'column', marginLeft: 20}}>
        <Text style={styles.cardSubtitle}>Recommended</Text>
        <Text style={styles.cardTitle}>Calming Session</Text>
        <View style={styles.badge}>
            <Text style={{fontWeight: "bold", fontSize: 12}}>16 min</Text>
        </View>
        <View style={{flexDirection: 'row',  gap: 8, alignItems: "center", marginTop: 30}}>
        <TouchableOpacity style={styles.playPauseButton} onPress={togglePlayPause}>
          <Icon
            name={'play-arrow'}
            size={30}
            color="#000000"
          />
        </TouchableOpacity>
        <Text style={{fontSize: 15, color: "#ffffff"}}>Play</Text>
        </View>
      </View>
        
        
    <Image source={require('../../assets/course/calm_recom.png')} style={styles.image}></Image>
    </View>

  )
}

const styles = StyleSheet.create({
    boxShape: {
        width: 328,
        height: 190,
        borderRadius: 20,
        backgroundColor: '#9BB1FD',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30 
    },
    // temp: {
    //     // position: 'absolute',
    // },
    cardTitle: {
      fontSize: 24,
      color: '#fff',
      fontWeight: 'bold'
  },
    cardSubtitle: {
        fontSize: 16,
        color: '#fff'
    },
    image: {
        position: 'absolute',
        width: 141,
        height: 141,
        right: 10,
        bottom: 10,
        zIndex: -1
    },
    badge: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: 55,
        borderRadius: 10,
        padding: 2
    },
    playPauseButton: {
      width: 30,  
      height: 30,
      borderRadius: 25,  
      backgroundColor: '#ffffff',  
    }
    /* Recommended */
})