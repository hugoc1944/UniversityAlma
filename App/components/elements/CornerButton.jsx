import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faQuestionCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export default function CornerButton() {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.buttonContainer} onPress={handlePress}>
        <FontAwesomeIcon icon={faQuestionCircle} size={40} color="#C2A5F7" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleClose}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <FontAwesomeIcon icon={faTimesCircle} size={30} color="#C2A5F7" />
          </TouchableOpacity>
          <View style={styles.helpTextContainer}>
          <Text style={styles.helpText}>
            <Text style={styles.info}>Purpose: </Text>
            The HomePage component serves as the landing page for the University Alma App.
            {'\n'}{'\n'}
            <Text style={styles.info}>Components Used: </Text>
            It displays a category navigation section, and a highlighted meditation session.
            {'\n'}{'\n'}
            <Text style={styles.info}>Functionalities: </Text>
            Users can explore various meditations categorized by their type. 
            If they prefeer they can view all available meditations, facilitating their search.
            </Text>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    left: 20,
    top: 55,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  helpTextContainer: {
    backgroundColor: '#FDFDFE',
    borderRadius: 10,
    padding: 20,
  },
  helpText: {
    fontSize: 18,
    color: '#081E3F',
  },
  info: {
    fontSize: 18,
    color: '#081E3F',
    fontWeight: 'bold'
  }
});
