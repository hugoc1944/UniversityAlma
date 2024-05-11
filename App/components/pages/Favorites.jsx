import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import MeditationBox from '../elements/MeditationBox';
import { readFromJsonFile, initializeFavoritesJson } from '../../fileUtils'
import AudioPlayer from '../elements/ProgressBar';
import SessionHeader from '../elements/SessionHeader';
import Volume from '../elements/Volume';
import Back from '../elements/Back';
import TopHeader from '../parents/TopHeader';
import CoursePage from './CoursePage';

export default function Favorites({ navigation }) {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [meditations, setMeditations] = useState([]);
  const [showElements, setShowElements] = useState(true); // Controle de visibilidade dos elementos

  const toggleElements = () => {
    setShowElements(!showElements); // Alterna a visibilidade dos elementos
  };

  useEffect(() => {
    async function fetchData() {
      await initializeFavoritesJson(); // Ensure favorites.json exists and initialized
  
      // Read favorites from JSON file
      try {
        const favorites = await readFromJsonFile('favorites.json');
        setFavoriteIds(favorites);
      } catch (error) {
        console.error('Error reading favorites:', error);
      }
  
      // Assuming meditationCourses.json is a JSON array
      try {
        const meditationCourses = require('../../dataFiles/meditationCourses.json');
        setMeditations(meditationCourses);
      } catch (error) {
        console.error('Error loading meditation courses:', error);
      }
    }
  
    fetchData();
  
    // Listen for changes in the JSON file and update the component
    const intervalId = setInterval(fetchData, 5000); // Check every 5 seconds (adjust as needed)
  
    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, []);
  

  const favoriteMeditations = meditations.filter(meditation =>
    favoriteIds.some(favorite => meditation.id === favorite.id)
  );

  const groupedMeditations = favoriteMeditations.reduce((acc, meditation) => {
    if (!acc[meditation.category]) {
      acc[meditation.category] = [];
    }
    acc[meditation.category].push(meditation);
    return acc;
  }, {});

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <TopHeader data={{ user: "Carlos", heading: "Your Favourites" }} />
      
      {Object.entries(groupedMeditations)
        .filter(([category, meditations]) => 
          meditations.some(meditation => favoriteIds.some(fav => fav.id === meditation.id)))
        .map(([category, meditations]) => (
          <View key={category} style={styles.container}>
            <Text style={styles.categoryText}>{category} Meditations</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScrollContainer}
            >
              {meditations
                .filter(meditation => favoriteIds.some(fav => fav.id === meditation.id))
                .map((meditation) => (
                  <MeditationBox 
                  key={meditation.id} 
                  data={meditation} 
                  onPlay={() => navigation.navigate('CoursePage', { selectedMeditation: meditation })}
              />
              ))}
            </ScrollView>
          </View>
        ))
      }
</ScrollView>)

  
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row'
  },
  horizontalScrollContainer: {
    flexDirection: 'row',
    padding: 15,
    gap: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  categoryText: {
    fontFamily: 'Roboto',
    fontSize: 21,
    fontWeight: 'bold',
    color: '#081E3F',
    paddingHorizontal: 20,
    paddingTop: 5
    
  }

})