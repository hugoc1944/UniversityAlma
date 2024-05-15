import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AudioPlayer from '../elements/ProgressBar';
import SessionHeader from '../elements/SessionHeader';
import TextDetails from '../elements/Text';
import Volume from '../elements/Volume';
import Back from '../elements/Back';
import { useFavorites } from '../../contexts/FavoritesContext';

const CoursePage = ({ route, navigation }) => {
  const { selectedMeditation } = route.params;
  const [currentSessionNum, setCurrentSessionNum] = useState(1); // Always start at session 1
  const [isSessionChanging, setIsSessionChanging] = useState(false);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  useFocusEffect(
    React.useCallback(() => {
      // Reset the session number to 1 when the screen is focused
      setCurrentSessionNum(1);
    }, [])
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setIsSessionChanging(true); // Set to true when the page changes
    });

    return unsubscribe;
  }, [navigation]);

  const currentSession = selectedMeditation.sessions.find(session => session.sessionNum === currentSessionNum);

  const handleSessionChange = (newSessionNum) => {
    setIsSessionChanging(true);
    setCurrentSessionNum(newSessionNum);
  };

  const handleAudioPause = () => {
    setIsSessionChanging(false);
  };

  const isFavorite = favorites.some(fav => fav.id === selectedMeditation.id);
  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(selectedMeditation.id);
    } else {
      addFavorite(selectedMeditation.id);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {currentSession ? (
        <>
          <AudioPlayer 
            mediaFile={currentSession.mediaFile} 
            isSessionChanging={isSessionChanging} 
            onAudioPause={handleAudioPause}
            toggleFavorite={toggleFavorite}
            favorites={favorites} // Pass favorites to AudioPlayer
            meditationId={selectedMeditation.id} // Pass the meditation ID
          />
          <SessionHeader sessionNum={currentSessionNum} />
          <Volume />
          <Back onPress={() => navigation.goBack()} />
          {selectedMeditation && <TextDetails data={selectedMeditation} currentSessionNum={currentSessionNum} onSessionChange={handleSessionChange} />}
        </>
      ) : (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No session found for the selected number.</Text>
          <Back onPress={() => navigation.goBack()} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default CoursePage;
