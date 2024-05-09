import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faHeart} from '@fortawesome/free-solid-svg-icons/faHeart'

export default function MeditationBox({ data, fav=true }) {

    const togglePlayPause = async () => {
        onPress(); // Chama a função passada por propriedade para alternar a visibilidade dos componentes
        // TODO: Redirect to the session page
    }

    const { title, description, author, sessions } = data;

    return (
        <View style={styles.boxShape}>
            <View style={styles.titleContainer}>
                <Text numberOfLines={2} ellipsizeMode="tail" style={styles.cardTitle}>{title}</Text>
            </View>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.cardContent}>{typeof description === 'string' ? description : ''}</Text>

            <Text style={styles.cardContent}>By: {author}</Text>

            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: "bold" }}>{sessions.length} Sessions</Text>
                
                {fav && 
                <TouchableOpacity style={styles.favoriteButton} onPress={togglePlayPause}>
                    <FontAwesomeIcon icon={faHeart} size={22} color={'#C2A5F7'}/>
                </TouchableOpacity>}

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
    titleContainer: {
        height: 60, // Adjust the height as needed
    },
    cardTitle: {
        fontSize: 22,
        color: '#fff',
        fontWeight: 'bold',
    },
    cardContent: {
        fontSize: 14,
        color: '#fff'
    },
    playPauseButton: {
        width: 32,
        height: 32,
        borderRadius: 25,
        backgroundColor: '#ffffff',
    },
    favoriteButton: {
        width: 32,
        height: 32,
        borderRadius: 25,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        position: 'absolute',
        width: 187,
        height: 187,
        right: -39,
        bottom: -46,
        zIndex: -1,
        transform: [{ rotate: '-42deg' }],
        opacity: 0.5
    },
});