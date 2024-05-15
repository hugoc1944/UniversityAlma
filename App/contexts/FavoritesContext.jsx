import React, { createContext, useContext, useState, useEffect } from 'react';
import { readFromJsonFile, writeToJsonFile, checkFileExists, initializeFavoritesJson } from '../fileUtils.js';

const FavoritesContext = createContext();

// Corrected `useFavorites` function
export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const loadFavorites = async () => {
            const fileExists = await checkFileExists('favorites.json');
            if (!fileExists) {
                await initializeFavoritesJson(); // Make sure to await the initialization
            }
            const data = await readFromJsonFile('favorites.json');
            setFavorites(data);
        };

        loadFavorites();
    }, []);

    const addFavorite = async (id) => {
        if (!favorites.some(fav => fav.id === id)) { // Prevent duplicates
            const updatedFavorites = [...favorites, { id }];
            setFavorites(updatedFavorites);
            await writeToJsonFile('favorites.json', updatedFavorites);
        }
    };

    const removeFavorite = async (id) => {
        const updatedFavorites = favorites.filter(fav => fav.id !== id);
        setFavorites(updatedFavorites);
        await writeToJsonFile('favorites.json', updatedFavorites);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
