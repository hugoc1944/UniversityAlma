import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import MeditationBox from '../elements/MeditationBox';
import { readFromJsonFile, initializeFavoritesJson } from '../../fileUtils'

export default function Favorites() {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [meditations, setMeditations] = useState([]);

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
    <View>
      {/* Your JSX code */}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row'
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    gap: 10,
    position: 'relative',
    right: 10,
    bottom: 3
  },
  container: {
    marginLeft: 22,
    marginBottom: 3
  },
  categoryText: {
    fontFamily: 'Roboto',
    fontSize: 21,
    fontWeight: 'bold',
    color: '#081E3F'
    
  }

})