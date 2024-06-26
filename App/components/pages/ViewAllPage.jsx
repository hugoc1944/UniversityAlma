import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import MeditationBox from '../elements/MeditationBox';
import CategoryNav from '../elements/CategoryNav';
import TopHeader from '../parents/TopHeader';
import { useFavorites } from '../../contexts/FavoritesContext';
import PopUp from '../elements/PopUp';
import { useAdditionalButton } from '../../contexts/AdditionalButtonProvider';
import { useMeditations } from '../../contexts/MeditationsContext';
import { Back } from '../elements/Back';

export default function ViewAllPage({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const dataExemplo = { user: 'Carlos', heading: 'All Meditations' };

  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { toggleButton, showButton } = useAdditionalButton();
  const { meditations } = useMeditations();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
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
    <View style={styles.container}>
      {showPopUp && <PopUp onCloseClick={onProfileClick} onMentorToggle={toggleButton} mentorOn={showButton} />}
      <FlatList
        data={filteredMeditations}
        renderItem={renderMeditationBox}
        keyExtractor={(item, index) => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <TopHeader data={dataExemplo} onProfileClick={onProfileClick} page={'ViewAllPage'} />
            <CategoryNav onSelectCategory={handleCategorySelect} />
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 23.5,
  },
  meditationBoxContainer: {
    flex: 1,
    margin: 1.5, // Adjust the margin to create space between items
    maxWidth: '50%', // Ensuring two columns
    backgroundColor: '#fff',
  },
  textCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  textL: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#081E3F',
  },
  textR: {
    fontSize: 15,
    color: 'rgba(8, 30, 63, 0.5)',
  },
});
