import React, {createContext, useContext, useState} from 'react';

const AdditionalButtonContext = createContext();

export const AdditionalButtonProvider = ({children}) => {
    const [showButton, setShowButton] = useState(false);

    const toggleButton = () => {
        setShowButton(prevState => !prevState);
    }

    return (<AdditionalButtonContext.Provider value={{showButton, toggleButton}}>
        {children}
    </AdditionalButtonContext.Provider>);
};

export const useAdditionalButton = () => {
    const context = useContext(AdditionalButtonContext);
    if(!context){
        throw new Error('useAdditionalButton must be used within a AdditionalButtonProvider');
    }
    return context;
}