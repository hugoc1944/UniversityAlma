import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import MeditationBox from '../elements/MeditationBox';
import TopHeader from '../parents/TopHeader';
import { useFavorites } from '../../contexts/FavoritesContext';
import fullMeditationData from '../../dataFiles/meditationCourses.json';

export default function Favorites({ navigation }) {
  const { favorites } = useFavorites();
  const dataExemplo = { user: 'Carlos', heading: 'Your Favorites' };

  // Filter full meditation data to include only favorites
  const favoriteMeditations = fullMeditationData.filter(meditation =>
    favorites.some(fav => fav.id === meditation.id)
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
      <TopHeader data={{ user: "Carlos", heading: "Your Favourites" }} mentorOn={true}/>
      {Object.entries(groupedMeditations)
        .filter(([category, meditations]) => 
          meditations.some(meditation => favorites.some(fav => fav.id === meditation.id)))
        .map(([category, meditations]) => (
          <View key={category} style={styles.container}>
            <Text style={styles.categoryText}>{category} Meditations</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContainer}
          >
              {meditations
                .filter(meditation => favorites.some(fav => fav.id === meditation.id))
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
});
