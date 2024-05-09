import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import FourSquareButton from '../elements/CornerButton';
import ProfilePicture from '../elements/ProfilePicture';
import MeditationBox from '../elements/MeditationBox';
import meditationData from '../../dataFiles/meditationCourses.json';
import CategoryNav from '../elements/CategoryNav'; // Update import path
import AudioPlayer from '../elements/ProgressBar';
import SessionHeader from '../elements/SessionHeader';
import Volume from '../elements/Volume';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showElements, setShowElements] = useState(true); // Controle de visibilidade dos elementos

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const toggleElements = () => {
    setShowElements(!showElements); // Alterna a visibilidade dos elementos
  };

  return (
    <View style={styles.container}>
      <CategoryNav onSelectCategory={handleCategorySelect} />
      {showElements ? (
        <React.Fragment>
          <FourSquareButton onPress={() => alert('Botão clicado')} />
          <ProfilePicture imageUrl='https://storage.googleapis.com/sticker-prod/3BtTZYTk8OZCQ9mA21oX/9.png' />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={styles.scrollContainer}
          >
            {meditationData
              .filter(course => !selectedCategory || course.category === selectedCategory)
              .map((course, index) => (
                <MeditationBox key={index} data={course} onPress={toggleElements} />
              ))}
          </ScrollView>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <AudioPlayer />
          <SessionHeader />
          <Volume />
          
        </React.Fragment>
      )}
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    gap: 10
  },
});
