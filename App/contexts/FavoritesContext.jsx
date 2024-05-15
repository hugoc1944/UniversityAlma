import React, { createContext, useContext, useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const loadFavorites = async () => {
            const filePath = `${FileSystem.documentDirectory}favorites.json`;
            const fileExists = await FileSystem.getInfoAsync(filePath);
            if (!fileExists.exists) {
                await FileSystem.writeAsStringAsync(filePath, JSON.stringify([]));
            }
            const data = await FileSystem.readAsStringAsync(filePath);
            setFavorites(JSON.parse(data));
        };

        loadFavorites();
    }, []);

    const addFavorite = async (id) => {
        if (!favorites.some(fav => fav.id === id)) {
            const updatedFavorites = [...favorites, { id }];
            setFavorites(updatedFavorites);
            await writeFavoritesToFile(updatedFavorites);
        }
    };

    const removeFavorite = async (id) => {
        const updatedFavorites = favorites.filter(fav => fav.id !== id);
        setFavorites(updatedFavorites);
        await writeFavoritesToFile(updatedFavorites);
    };

    const writeFavoritesToFile = async (favoritesData) => {
        const filePath = `${FileSystem.documentDirectory}favorites.json`;
        await FileSystem.writeAsStringAsync(filePath, JSON.stringify(favoritesData));
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
