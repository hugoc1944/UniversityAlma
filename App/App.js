import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';

import Navbar from './components/elements/Navbar';
import { FavoritesProvider } from './contexts/FavoritesContext';
import PopUp from './components/elements/PopUp';

export default function App() {
  return (
    <FavoritesProvider>
      <Navbar/>    
    </FavoritesProvider>

  );
}
