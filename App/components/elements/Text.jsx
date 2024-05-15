import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const TextDetails = ({ data, onSessionChange }) => {
  const { title, description, author, sessions } = data;
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSession, setCurrentSession] = useState(sessions.length ? { ...sessions[0], name: `Session 1` } : null);

  const handleSelectSession = (session, index) => {
    setCurrentSession({ ...session, name: `Session ${index + 1}` });
    onSessionChange(session.sessionNum);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.sessionButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.sessions}>{currentSession ? currentSession.name : 'No Session'}</Text>
        <FontAwesomeIcon style={styles.downIcon} size={18} icon={faAngleDown} color={"#9BB1FD"} />
      </TouchableOpacity>
      <Text style={styles.author}>By: {author}</Text>
      <Text style={styles.description}>{description}</Text>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <FlatList
            data={sessions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity style={styles.sessionItem} onPress={() => handleSelectSession(item, index)}>
                <Text style={styles.sessionText}>{`Session ${index + 1}`}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    bottom: 115,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#081E3F',
    fontFamily: 'Open Sans',
    marginTop: 5,
    marginBottom: 0,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: 50,
    color: '#081E3F',
    fontFamily: 'Open Sans',
    opacity: 0.7,
  },
  author: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#081E3F',
    fontFamily: 'Open Sans',
    marginBottom: 10,
  },
  modalView: {
    margin: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    marginHorizontal: '20%',
    width: '60%',
    top: '50%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  sessionButton: {
    marginTop: 5,
    marginBottom: 1,
    flexDirection: 'row',
  },
  sessions: {
    textAlign: 'center',
    color: '#081E3F',
    fontSize: 16,
    fontFamily: 'Open Sans',
  },
  sessionItem: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
    marginTop: 10,
  },
  sessionText: {
    color: '#081E3F',
    fontSize: 12,
  },
  downIcon: {
    position: 'absolute',
    right: -20,
    top: 2,
  },
});

export default TextDetails;
