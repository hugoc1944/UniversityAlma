import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import MeditationBox from '../elements/MeditationBox';
import CategoryNav from '../elements/CategoryNav';
import TopHeader from '../parents/TopHeader';
import HighlightedSession from '../elements/HighlightedSession';
import { useFavorites } from '../../contexts/FavoritesContext';
import PopUp from '../elements/PopUp';
import { useAdditionalButton } from '../../contexts/AdditionalButtonProvider';
import { useMeditations } from '../../contexts/MeditationsContext';

export default function HomePage({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showElements, setShowElements] = useState(true);
  const [showPopUp, setShowPopUp] = useState(false);
  const dataExemplo = { user: 'Carlos', heading: 'Welcome Back' };

  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { toggleButton, showButton } = useAdditionalButton();
  const { meditations } = useMeditations(); // Use the meditations context
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const toggleElements = () => {
    setShowElements(!showElements);
  };

  const onProfileClick = () => {
    setShowPopUp(!showPopUp);
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {showPopUp && <PopUp onCloseClick={onProfileClick} onMentorToggle={toggleButton} mentorOn={showButton} />}
        <View style={styles.vertScroll}>
          <TopHeader data={dataExemplo} onProfileClick={onProfileClick} />
          <CategoryNav onSelectCategory={handleCategorySelect} />
          <HighlightedSession key={0} onPress={toggleElements} />
        </View>
        <View style={styles.textCont}>
          <Text style={styles.textL}>Explore Meditations</Text>
          <Text style={styles.textR}>View All</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScrollContainer}
        >
          {meditations
            .filter(course => !selectedCategory || course.category === selectedCategory)
            .map((course, index) => {
              const isFavorite = favorites.some(fav => fav.id === course.id);
              const toggleFavorite = () => {
                if (isFavorite) {
                  removeFavorite(course.id);
                } else {
                  addFavorite(course.id);
                }
              };

              return (
                <MeditationBox
                  key={index}
                  data={course}
                  onPlay={() => {
                    const firstSessionMediaFile = course.sessions && course.sessions.length > 0 ? course.sessions[0].mediaFile : null;
                    navigation.navigate('CoursePage', { 
                      selectedMeditation: course, 
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
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  horizontalScrollContainer: {
    flexDirection: 'row',
    padding: 15,
    gap: 10
  },
  vertScroll: {
    alignItems: 'center',
  },
  textCont: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textL: {
    fontSize: 21,
    paddingLeft: 20,
    fontWeight: 'bold',
    color: '#081E3F'
  },
  textR: {
    fontSize: 15,
    paddingRight: 20,
    color: 'rgba(8, 30, 63, 0.5)'
  }
});
