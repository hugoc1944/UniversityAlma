import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Modal } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function PopUp({ onCloseClick, onMentorToggle, mentorOn }) {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={true}
      onRequestClose={onCloseClick}
    >
      <View style={styles.wrapper}>
        <View style={styles.box}>
          <TouchableOpacity onPress={onCloseClick} style={styles.icon}>
            <FontAwesomeIcon size={32} icon={faXmark} color={"#081E3F"} />
          </TouchableOpacity>
          <Text style={styles.txt}>Mentor View</Text>
          <Button
            style={styles.btn}
            onPress={onMentorToggle}
            title={!mentorOn ? "Turn On" : "Turn Off"}
            color="#C2A5F7"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, 0.7)',
  },
  box: {
    width: '60%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 5,
  },
  txt: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
  btn: {
    marginTop: 30,
  },
  icon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});
