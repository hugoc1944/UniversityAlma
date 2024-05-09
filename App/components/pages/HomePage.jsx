
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import FourSquareButton from '../elements/CornerButton';
import ProfilePicture from '../elements/ProfilePicture';
import MeditationBox from '../elements/MeditationBox';
import meditationData from '../../dataFiles/meditationCourses.json';
import CategoryNav from '../elements/CategoryNav'; // Update import path

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <View style={styles.container}>
    <CornerButton onPress={() => alert('Botão clicado')}/>
      <ProfilePicture imageUrl='https://storage.googleapis.com/sticker-prod/3BtTZYTk8OZCQ9mA21oX/9.png' />
      <CategoryNav onSelectCategory={handleCategorySelect} />
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
