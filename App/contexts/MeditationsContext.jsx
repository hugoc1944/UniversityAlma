import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkFileExists, initializeMeditationsJson, readFromJsonFile, writeToJsonFile, deleteJsonFile } from '../fileUtils.js';
import meditationData from '../dataFiles/meditationCourses.json';

const MeditationsContext = createContext();

export const useMeditations = () => useContext(MeditationsContext);

export const MeditationsProvider = ({ children }) => {
    const [meditations, setMeditations] = useState([]);

    useEffect(() => {
        const loadMeditations = async () => {
            const fileExists = await checkFileExists('meditations.json');
            if (!fileExists) {
                await initializeMeditationsJson(); // Make sure to await the initialization
            }
            const data = await readFromJsonFile('meditations.json');
            if (!data || data.length === 0) {
                await writeToJsonFile(meditationData, 'meditations.json');
            }
            const data2 = await readFromJsonFile('meditations.json');
            setMeditations(data2);
        };

        loadMeditations();
    }, []);

    const addMeditation = async (courseInfo) => {
        if (!meditations.some(med => med.id === courseInfo.id)) { // Prevent duplicates
            const updatedMeditations = [...meditations, courseInfo];
            setMeditations(updatedMeditations);
            await writeToJsonFile(updatedMeditations, 'meditations.json');
        }
    };
    

    const removeMeditation = async (id) => {
        const updatedMeditations = meditations.filter(med => med.id !== id);
        setMeditations(updatedMeditations);
        await writeToJsonFile('meditations.json', updatedMeditations);
    };

    return (
        <MeditationsContext.Provider value={{ meditations, addMeditation, removeMeditation }}>
            {children}
        </MeditationsContext.Provider>
    );
};
