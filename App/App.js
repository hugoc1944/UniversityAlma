import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';

import Navbar from './components/elements/Navbar';
import { FavoritesProvider } from './contexts/FavoritesContext';
import PopUp from './components/elements/PopUp';
import { AdditionalButtonProvider } from './contexts/AdditionalButtonProvider';


export default function App() {
  return (
    <FavoritesProvider>
      <AdditionalButtonProvider>
        <Navbar/>
      </AdditionalButtonProvider>   
    </FavoritesProvider>

  );
}
