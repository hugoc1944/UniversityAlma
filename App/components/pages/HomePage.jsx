import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import FourSquareButton from '../elements/CornerButton';
import ProfilePicture from '../elements/ProfilePicture';
import MeditationBox from '../elements/MeditationBox';
import meditationData from '../../dataFiles/meditationCourses.json';
import CategoryNav from '../elements/CategoryNav'; // Update import path
import TopHeader from '../parents/TopHeader';
import HighlightedSession from '../elements/HighlightedSession';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dataExemplo = {user: 'Carlos', heading: 'Welcome Back'};
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <View style={styles.container}>
      <TopHeader data={dataExemplo}/>
      <CategoryNav onSelectCategory={handleCategorySelect} />
      <HighlightedSession/>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.scrollContainer}
      >
        {meditationData
          .filter(course => !selectedCategory || course.category === selectedCategory)
          .map((course, index) => (
            <MeditationBox key={index} data={course} />
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    gap: 10
  },
});
