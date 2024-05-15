import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import MeditationBox from '../elements/MeditationBox';
import TopHeader from '../parents/TopHeader';
import { useFavorites } from '../../contexts/FavoritesContext';
import fullMeditationData from '../../dataFiles/meditationCourses.json';
import { useAdditionalButton } from '../../contexts/AdditionalButtonProvider';
import PopUp from '../elements/PopUp';


export default function Favorites({ navigation }) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
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

  //Mentor view
  const {toggleButton, showButton} = useAdditionalButton();
  //Pop Up & Mentor Toggle
  const [showPopUp, setShowPopUp] = useState(false);
  const onProfileClick = () => {
    setShowPopUp(!showPopUp);
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {showPopUp && <PopUp onCloseClick={onProfileClick} onMentorToggle={toggleButton} mentorOn={showButton}/>}
      <TopHeader data={{ user: "Carlos", heading: "Your Favourites" }} onProfileClick={onProfileClick}/>
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
                .map((meditation, index) => {
                  const isFavorite = favorites.some(fav => fav.id === meditation.id);
                  const toggleFavorite = () => {
                    if (isFavorite) {
                      removeFavorite(meditation.id);
                    } else {
                      addFavorite(meditation.id);
                    }
                  };
    
                  return (
                    <MeditationBox
                      key={index}
                      data={meditation}
                      onPlay={() => {
                        const firstSessionMediaFile = meditation.sessions && meditation.sessions.length > 0 ? meditation.sessions[0].mediaFile : null;
                        navigation.navigate('CoursePage', { 
                          selectedMeditation: meditation, 
                          mediaFile: firstSessionMediaFile,
                          isFavorite,
                          toggleFavorite
                        });
                      }}
                      fav={isFavorite}
                      toggleFavorite={toggleFavorite}
                    />
                  );
                })}
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
