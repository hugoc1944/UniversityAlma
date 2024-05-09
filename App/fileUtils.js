import * as FileSystem from 'expo-file-system';

// Function to write JSON data to a file
export const writeToJsonFile = async (data, filePath) => {
  const jsonData = JSON.stringify(data);
  try {
    await FileSystem.writeAsStringAsync(filePath, jsonData);
  } catch (error) {
    throw new Error(`Error writing to JSON file: ${error}`);
  }
};

// Function to read JSON data from a file
export const readFromJsonFile = async (filePath) => {
  try {
    const fileContent = await FileSystem.readAsStringAsync(filePath);
    return JSON.parse(fileContent);
  } catch (error) {
    throw new Error(`Error reading from JSON file: ${error}`);
  }
};