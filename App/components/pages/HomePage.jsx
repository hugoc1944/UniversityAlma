import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import FourSquareButton from '../elements/CornerButton';
import ProfilePicture from '../elements/ProfilePicture';
import MeditationBox from '../elements/MeditationBox';
import meditationData from '../../dataFiles/meditationCourses.json';
import CategoryNav from '../elements/CategoryNav';
import AudioPlayer from '../elements/ProgressBar';
import SessionHeader from '../elements/SessionHeader';
import TextDetails from '../elements/Text';
import Volume from '../elements/Volume';
import TopHeader from '../parents/TopHeader';
import HighlightedSession from '../elements/HighlightedSession';
import Back from '../elements/Back';
import { useFavorites } from '../../contexts/FavoritesContext';
import CoursePage from './CoursePage';

export default function HomePage({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showElements, setShowElements] = useState(true);
  const [selectedMeditation, setSelectedMeditation] = useState(null);
  const dataExemplo = { user: 'Carlos', heading: 'Welcome Back' };

  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const toggleElements = () => {
    setShowElements(!showElements);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.vertScroll}>
        <TopHeader data={dataExemplo} />
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
        {meditationData
          .filter(course => !selectedCategory || course.category === selectedCategory)
          .map((course, index) => (
            <MeditationBox 
              key={index} 
              data={course}
              onPlay={() => navigation.navigate('CoursePage', { selectedMeditation: course })}
              fav={favorites.some(fav => fav.id === course.id)}
              toggleFavorite={() => {
                if (favorites.some(fav => fav.id === course.id)) {
                  removeFavorite(course.id);
                } else {
                  addFavorite(course.id);
                }
              }}
            />
          ))}
      </ScrollView>
    </ScrollView>
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
  },
});
