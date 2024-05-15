import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faQuestionCircle, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function CornerButton({ currentScreen }) {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleClose = () => {
    console.log('Close button pressed'); // Debugging line
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
          <View style={styles.helpTextContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <FontAwesomeIcon icon={faXmark} size={30} color="#081E3F" />
            </TouchableOpacity>
            {currentScreen === 'HomePage' ? (
  <Text style={styles.helpText}>
    <Text style={styles.info}>Purpose: </Text>
    The Home page is the landing page of the University Alma App.
    {'\n'}{'\n'}
    <Text style={styles.info}>Elements Displayed: </Text>
    A category navigation section (that controls the meditation courses shown) and a highlighted meditation session.
    {'\n'}{'\n'}
    <Text style={styles.info}>Functionalities: </Text>
    Users can explore various meditations categorized by their type. They can also add or remove meditation courses from their favorites.
  </Text>
) : currentScreen === 'Favorites' ? (
  <Text style={styles.helpText}>
    <Text style={styles.info}>Purpose: </Text>
    The Favorites page presents the user's favorite courses.
    {'\n'}{'\n'}
    <Text style={styles.info}>Elements Displayed: </Text>
    The meditation courses that the user has marked as favorites.
    {'\n'}{'\n'}
    <Text style={styles.info}>Functionalities: </Text>
    Users can access the materials of their favorited courses and remove courses from their favorites.
  </Text>
) : currentScreen === 'Settings' ? (
  <Text style={styles.helpText}>
    <Text style={styles.info}>Purpose: </Text>
    The Settings page allows users to configure their app settings.
    {'\n'}{'\n'}
    <Text style={styles.info}>Elements Displayed: </Text>
    Various user settings options.
    {'\n'}{'\n'}
    <Text style={styles.info}>Functionalities: </Text>
    Users can change their settings and access detailed information about the app that is not available elsewhere.
  </Text>
) : currentScreen === 'Notifications' ? (
  <Text style={styles.helpText}>
    <Text style={styles.info}>Purpose: </Text>
    The Notifications page informs users about new courses and updates.
    {'\n'}{'\n'}
    <Text style={styles.info}>Elements Displayed: </Text>
    Notification boxes with the latest app and course updates.
    {'\n'}{'\n'}
    <Text style={styles.info}>Functionalities: </Text>
    Users can view all updates and read the details.
  </Text>
) : (
  <View>
    {/* Default content or empty view */}
  </View>
)}

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
        zIndex: 10,
        top: 10,
        right: 10
  },
  helpTextContainer: {
    backgroundColor: '#FDFDFE',
    borderRadius: 10,
    padding: 20,
    paddingRight: 40
  },
  helpText: {
    fontSize: 18,
    color: '#081E3F',
  },
  info: {
    fontSize: 18,
    color: '#081E3F',
    fontWeight: 'bold',
  },
});
