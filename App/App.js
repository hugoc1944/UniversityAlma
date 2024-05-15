import React from 'react';

import Navbar from './components/elements/Navbar';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { MeditationsProvider } from './contexts/MeditationsContext';
import { AdditionalButtonProvider } from './contexts/AdditionalButtonProvider';


export default function App() {
  return (
    <MeditationsProvider>
      <FavoritesProvider>
        <AdditionalButtonProvider>
          <Navbar/>
        </AdditionalButtonProvider>   
      </FavoritesProvider>
    </MeditationsProvider>

  );
}
