import { View, Text, StyleSheet, ScrollView } from 'react-native'
import  {React, useState, useEffect} from 'react'

import Session from '../parents/Session'
import TopHeader from '../parents/TopHeader'
import MeditationBox from '../elements/MeditationBox'
export default function Favorites() {
  
  const favoriteIds = require('../../dataFiles/favorites.json');
  const meditations = require('../../dataFiles/meditationCourses.json'); 
  
  const favoriteMeditations = meditations.filter(meditation => {
    return favoriteIds.some(favorite => meditation.id === favorite.id);
  });

  const groupedMeditations = favoriteMeditations.reduce((acc, meditation) =>{
    if(!acc[meditation.category]){
      acc[meditation.category] = [];
    }
    acc[meditation.category].push(meditation);
    return acc;
  }, {});

  return (
    <View>
      <TopHeader data={{user: "Carlos", heading: "Your Favourites"}}/>
      
      {Object.entries(groupedMeditations).map(([category, meditations]) => (
        <View key={category} style={styles.container}>
          <Text style={styles.categoryText}>{category} Meditations</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={styles.scrollContainer}>
              {meditations.map(meditation => (
                  <MeditationBox data={meditation} fav={true}/>
              ))}
          </ScrollView>
        </View>
      ))}
    </View>
  )
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