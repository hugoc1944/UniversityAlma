import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import AudioPlayer from '../elements/ProgressBar';
import SessionHeader from '../elements/SessionHeader';
import TextDetails from '../elements/Text';
import Volume from '../elements/Volume';
import Back from '../elements/Back';

const CoursePage = ({ route, navigation }) => {
  const { selectedMeditation, sessionNum } = route.params;
  const [currentSessionNum, setCurrentSessionNum] = useState(sessionNum || 1);

  const currentSession = selectedMeditation.sessions.find(session => session.sessionNum === currentSessionNum);

  const handleSessionChange = (newSessionNum) => {
    setCurrentSessionNum(newSessionNum);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <AudioPlayer mediaFile={currentSession.mediaFile} sessionNum={currentSessionNum} />
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