import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, FlatList } from 'react-native';
import MeditationBox from '../elements/MeditationBox';
import CategoryNav from '../elements/CategoryNav';
import TopHeader from '../parents/TopHeader';
import HighlightedSession from '../elements/HighlightedSession';
import { useFavorites } from '../../contexts/FavoritesContext';
import PopUp from '../elements/PopUp';
import { useAdditionalButton } from '../../contexts/AdditionalButtonProvider';
import { useMeditations } from '../../contexts/MeditationsContext';

export default function ViewAllPage({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showElements, setShowElements] = useState(true);
  const [showPopUp, setShowPopUp] = useState(false);
  const dataExemplo = { user: 'Carlos', heading: 'All Meditations' };

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

  const renderMeditationBox = ({ item, index }) => {
    const isFavorite = favorites.some(fav => fav.id === item.id);
    const toggleFavorite = () => {
      if (isFavorite) {
        removeFavorite(item.id);
      } else {
        addFavorite(item.id);
      }
    };

    return (
      <View style={styles.meditationBoxContainer}>
        <MeditationBox
          key={index}
          data={item}
          onPlay={() => {
            const firstSessionMediaFile = item.sessions && item.sessions.length > 0 ? item.sessions[0].mediaFile : null;
            navigation.navigate('CoursePage', { 
              selectedMeditation: item, 
              mediaFile: firstSessionMediaFile,
              isFavorite,
              toggleFavorite
            });
          }}
          fav={isFavorite}
          toggleFavorite={toggleFavorite}
        />
      </View>
    );
  };

  const filteredMeditations = meditations.filter(course => !selectedCategory || course.category === selectedCategory);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {showPopUp && <PopUp onCloseClick={onProfileClick} onMentorToggle={toggleButton} mentorOn={showButton} />}
        <View style={styles.vertScroll}>
          <TopHeader data={dataExemplo} onProfileClick={onProfileClick} />
          <CategoryNav onSelectCategory={handleCategorySelect} />
        </View>
        <FlatList
          data={filteredMeditations}
          renderItem={renderMeditationBox}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.verticalScrollContainer}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  verticalScrollContainer: {
    alignItems: 'flex-start',
    paddingLeft: 1.5,
    paddingVertical: 23.5,
    width: '100%',
  },
  vertScroll: {
    alignItems: 'center',
  },
  meditationBoxContainer: {
    margin: 1.5, // Adjust the margin to create space between items
    maxWidth: '50%', // Ensuring two columns
  },
  textCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  textL: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#081E3F'
  },
  textR: {
    fontSize: 15,
    color: 'rgba(8, 30, 63, 0.5)'
  },
});
