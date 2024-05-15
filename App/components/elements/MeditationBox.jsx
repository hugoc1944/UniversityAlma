import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFavorites } from '../../contexts/FavoritesContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';

export default function MeditationBox({ data, onPlay }) {
    const { favorites, addFavorite, removeFavorite } = useFavorites();
    const isFavorite = data && favorites.some(fav => fav.id === data.id);

    const toggleFavorite = () => {
        if (isFavorite) {
            removeFavorite(data.id);
        } else {
            addFavorite(data.id);
        }
    };

    // Ensure data and data.sessions are defined
    if (!data || !data.sessions) {
        return null; // Or return some placeholder UI
    }

    return (
        <View style={styles.boxShape}>
            <View style={styles.titleContainer}>
                <Text numberOfLines={2} ellipizeMode="tail" style={styles.cardTitle}>{data.title}</Text>
            </View>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.cardContent}>{typeof data.description === 'string' ? data.description : ''}</Text>
            <Text style={styles.cardContent}>By: {data.author}</Text>

            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: "bold" }}>{data.sessions.length} Sessions</Text>
                
                <TouchableOpacity 
                    style={styles.favoriteButton} 
                    onPress={toggleFavorite}
                >
                    <FontAwesomeIcon icon={faHeart} size={22} color={isFavorite ? '#C2A5F7' : '#EEEEEE'}/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.playPauseButton} onPress={onPlay}>
                    <Icon
                        name={'play-arrow'}
                        size={40}
                        bottom={4}
                        right={3}
                        color="#BBBBFF"
                    />
                </TouchableOpacity>
            </View>
            <Image source={require('../../assets/course/course_flower.png')} style={styles.image}></Image>
        </View>
    );
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
        justifyContent: 'center',
        alignItems: 'center'
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
