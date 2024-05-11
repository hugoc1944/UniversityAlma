import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import AudioPlayer from '../elements/ProgressBar';
import SessionHeader from '../elements/SessionHeader';
import TextDetails from '../elements/Text';
import Volume from '../elements/Volume';
import Back from '../elements/Back';

const CoursePage = ({ route, navigation }) => {
  const { selectedMeditation } = route.params;

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <React.Fragment>
        <AudioPlayer />
        <SessionHeader />
        <Volume />
        <Back onPress={() => navigation.goBack()} />
        {selectedMeditation && <TextDetails data={selectedMeditation} />}
      </React.Fragment>
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
