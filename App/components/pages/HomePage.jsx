import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MeditationBox from '../elements/MeditationBox';
import meditationData from '../../dataFiles/meditationCourses.json';
import CategoryNav from '../elements/CategoryNav';
import TopHeader from '../parents/TopHeader';
import HighlightedSession from '../elements/HighlightedSession';
import { useFavorites } from '../../contexts/FavoritesContext';
import PopUp from '../elements/PopUp';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

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

  //Pop Up & Mentor Toggle
  const [showPopUp, setShowPopUp] = useState(false);
  const onProfileClick = () => {
    setShowPopUp(!showPopUp);
  }
  const [mentorOn, setMentorOn] = useState(false);
  const activateMentor = () => {
    setMentorOn(!mentorOn);
  }
  return (
    <>
      
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>

          {showPopUp && <PopUp onCloseClick={onProfileClick} onMentorToggle={activateMentor} mentorOn={mentorOn}/>}
          <View style={styles.vertScroll}>
            <TopHeader data={dataExemplo} onProfileClick={onProfileClick} mentorOn={mentorOn}/>
            <CategoryNav  onSelectCategory={handleCategorySelect} />
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