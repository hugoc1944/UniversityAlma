import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
import {React, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export default function PopUp({onCloseClick, onMentorToggle, mentorOn}) {

  return (
    <View style={styles.wrapper}>
      <View style={styles.box}>
        <TouchableOpacity onPress={onCloseClick} style={styles.icon}>
            <FontAwesomeIcon  size={32} icon={faXmark} color={"#081E3F"} />
        </TouchableOpacity>
        <Text style={styles.txt}>Mentor View</Text>
        <Button
            style={styles.btn}
            onPress={onMentorToggle}
            title={mentorOn ? "Turn On" : "Turn Off"}
            color="#C2A5F7"
            accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        zIndex: 999,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0, 0.7)',
        width: '100%',
        height: '100%',
        marginTop: '50px'
    },
    box: {
        width: '60%',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 5
    },
    txt: {
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 18
    },
    btn: {
        marginTop: 30,
    },
    icon: {
        position: 'absolute',
        zIndex: 10,
        top: 5,
        right: 5
    }

})