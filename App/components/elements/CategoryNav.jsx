import React, { useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const categories = [
  { name: 'Calm', icon: require('../../assets/categoryNav/calm.png'), iconActive: require('../../assets/categoryNav/calm_active.png') },
  { name: 'Sleep', icon: require('../../assets/categoryNav/sleep.png'), iconActive: require('../../assets/categoryNav/sleep_active.png') },
  { name: 'Relax', icon: require('../../assets/categoryNav/relax.png'), iconActive: require('../../assets/categoryNav/relax_active.png') },
  { name: 'Focus', icon: require('../../assets/categoryNav/focus.png'), iconActive: require('../../assets/categoryNav/focus_active.png') },
  { name: 'Breathe', icon: require('../../assets/categoryNav/breath.png'), iconActive: require('../../assets/categoryNav/breath_active.png') }
];

export default function CategoryNav({ onSelectCategory }) {
  const [activeCategory, setActiveCategory] = useState(null);

  const handlePress = (index) => {
    setActiveCategory(index);
    onSelectCategory(categories[index].name); // Update the selected category
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={styles.categoryItem}
          onPress={() => handlePress(index)}
        >
          <View style={activeCategory === index ? styles.activeCircle : styles.nonActiveCircle}>
            <Image
              source={activeCategory === index ? category.iconActive : category.icon}
              style={styles.icon}
            />
          </View>
          <Text style={styles.text}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 25,
    height: 80,
    justifyContent: 'center'
  },
  icon: {
    width: 40,
    height: 40,
  },
  text: {
    fontSize: 18,
    color: '#555',
    marginTop: 10
  },
  activeCircle: {
    borderRadius: 40, // Raio para criar um círculo perfeito
    borderWidth: 2,
    borderColor: '#C2A5F7',
    backgroundColor: '#C2A5F7',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nonActiveCircle: {
    borderRadius: 40, // Raio para criar um círculo perfeito
    borderWidth: 2,
    borderColor: '#C2A5F7',
    backgroundColor: '#FFF', // Fundo branco para ícones não ativos
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
