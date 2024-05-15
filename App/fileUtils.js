import * as FileSystem from 'expo-file-system';
import meditationData from './dataFiles/meditationCourses.json';

// Function to write JSON data to a file
export const writeToJsonFile = async (data, fileName) => {
  const jsonData = JSON.stringify(data);
  const filePath = `${FileSystem.documentDirectory}${fileName}`;
  try {
    await FileSystem.writeAsStringAsync(filePath, jsonData);
  } catch (error) {
    throw new Error(`Error writing to JSON file: ${error}`);
  }
};

// Function to read JSON data from a file
export const readFromJsonFile = async (fileName) => {
  const filePath = `${FileSystem.documentDirectory}${fileName}`;
  try {
    const fileContent = await FileSystem.readAsStringAsync(filePath);
    return JSON.parse(fileContent);
  } catch (error) {
    throw new Error(`Error reading from JSON file: ${error}`);
  }
};

export const checkFileExists = async (fileName) => {
  const filePath = `${FileSystem.documentDirectory}${fileName}`;
  try {
    const fileInfo = await FileSystem.getInfoAsync(filePath);
    return fileInfo.exists;
  } catch (error) {
    console.error("Failed to check file info:", error);
    return false;
  }
};

// Function to ensure favorites.json exists and is initialized
export const initializeFavoritesJson = async () => {
  const filePath = `${FileSystem.documentDirectory}favorites.json`;
  const fileExists = await FileSystem.getInfoAsync(filePath).then(info => info.exists);
  if (!fileExists) {
    await FileSystem.writeAsStringAsync(filePath, JSON.stringify([])); // Assuming it starts as an empty array
  }
};

// Function to ensure favorites.json exists and is initialized
export const initializeMeditationsJson = async () => {
  const filePath = `${FileSystem.documentDirectory}meditations.json`;
  const fileExists = await FileSystem.getInfoAsync(filePath).then(info => info.exists);
  if (!fileExists) {
    await FileSystem.writeAsStringAsync(filePath, JSON.stringify([])); // Assuming it starts as an empty array
  }
};

export const deleteJsonFile = async (fileName) => {
  const filePath = `${FileSystem.documentDirectory}${fileName}`;
  try {
    const fileInfo = await FileSystem.getInfoAsync(filePath);
    if (fileInfo.exists) {
      await FileSystem.deleteAsync(filePath);
      console.log(`File deleted successfully: ${fileName}`);
    } else {
      console.log(`File does not exist: ${fileName}`);
    }
  } catch (error) {
    throw new Error(`Error deleting JSON file: ${error}`);
  }
};