import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function HighlightedSession({ onPress, onPlay }) {
  return (
    <View style={styles.boxShape}>
      <View style={{ flexDirection: 'column', marginLeft: 20 }}>
        <Text style={styles.cardSubtitle}>Recommended</Text>
        <Text style={styles.cardTitle}>Calming Session</Text>
        <View style={styles.badge}>
          <Text style={{ fontWeight: "bold", fontSize: 12 }}>6 min</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 8, alignItems: "center", marginTop: 30 }}>
          <TouchableOpacity style={styles.playPauseButton} onPress={onPlay}>
          <FontAwesome5
                        name={'play'}
                        size={20}
                        right={-2}
                        color="#BBBBFF"
                    />
          </TouchableOpacity>
          <Text style={{ fontSize: 15, color: "#ffffff" }}>Play</Text>
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
    marginVertical: 25
  },
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
    width: 32,
        height: 32,
        borderRadius: 25,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
  }
});
