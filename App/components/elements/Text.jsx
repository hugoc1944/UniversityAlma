import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';

const TextDetails = ({ data }) => {
    const { title, description, author, sessions } = data;
    const [modalVisible, setModalVisible] = useState(false);
    // Initialize with the first session's dynamically generated name
    const [currentSession, setCurrentSession] = useState(sessions.length ? { ...sessions[0], name: `Session 1` } : null);

    const handleSelectSession = (session, index) => {
        // Set the current session with a dynamically generated name
        setCurrentSession({ ...session, name: `Session ${index + 1}` });
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.author}>By: {author}</Text>
            <Text style={styles.description}>{description}</Text>
            <TouchableOpacity style={styles.sessionButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.sessions}>{currentSession ? currentSession.name : 'No Session'}</Text>
            </TouchableOpacity>
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
        bottom: 100,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#081E3F'
    },
    description: {
        textAlign: 'center',
        fontSize: 16,
        marginHorizontal: 50,
        color: '#333'
    },
    author: {
        textAlign: 'center',
        fontSize: 14,
        fontStyle: 'italic',
        color: '#666'
    },
    sessionButton: {
        marginTop: 10,
        backgroundColor: '#9BB1FD',
        padding: 10,
        borderRadius: 10,
    },
    sessions: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff'
    },
    modalView: {
        margin: 0,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        position: 'center',
        marginHorizontal: '20%',
        width: '60%',
        top: '50%',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    sessionItem: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#F0F0F0',
        marginTop: 10
    },
    sessionText: {
        color: '#333',
        fontSize: 12
    }
});

export default TextDetails;
