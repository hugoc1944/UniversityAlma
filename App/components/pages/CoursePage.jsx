import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import AudioPlayer from '../elements/ProgressBar';
import SessionHeader from '../elements/SessionHeader';
import TextDetails from '../elements/Text';
import Volume from '../elements/Volume';
import Back from '../elements/Back';

const CoursePage = ({ route, navigation }) => {
  const { selectedMeditation, sessionNum, isFavorite, toggleFavorite } = route.params;
  const [currentSessionNum, setCurrentSessionNum] = useState(sessionNum || 1);
  const [isSessionChanging, setIsSessionChanging] = useState(false);

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

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <AudioPlayer 
        mediaFile={currentSession.mediaFile} 
        isSessionChanging={isSessionChanging} 
        onAudioPause={handleAudioPause}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
      />
      <SessionHeader />
      <Volume />
      <Back onPress={() => navigation.goBack()} />
      {selectedMeditation && <TextDetails data={selectedMeditation} onSessionChange={handleSessionChange} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});

export default CoursePage;
