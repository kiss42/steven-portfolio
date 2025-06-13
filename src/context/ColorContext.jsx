import React, { createContext, useState, useContext, useEffect } from 'react';

const ColorContext = createContext();

export const useColor = () => useContext(ColorContext);

// Night Magic color scheme only
export const colorSchemes = {
  nightMagic: {
    background: '#0E0E0E',     // Deep black
    primary: '#305A79',        // Navy blue
    secondary: '#A8683F',      // Camel brown
    text: '#ECECEC',           // Soft white
    onPrimary: '#ffffff',
    onSecondary: '#000000',
  },
    lightPeaceful: {
    background: '#FFFFFF',
    primary: '#A0AEC0',      // dusty blue
    secondary: '#B6C5B1',    // sage green
    text: '#2D3748',         // deep indigo/navy
    onPrimary: '#ffffff',
    onSecondary: '#1a202c',  // contrast
  },
};

export const ColorProvider = ({ children }) => {
  const [colorScheme, setColorScheme] = useState(colorSchemes.nightMagic);

  useEffect(() => {
    const saved = localStorage.getItem('preferredColorScheme');
    if (saved && colorSchemes[saved]) {
      setColorScheme(colorSchemes[saved]);
    }
  }, []);

  const changeColorScheme = (schemeName) => {
    const scheme = colorSchemes[schemeName];
    if (scheme) {
      setColorScheme(scheme);
      localStorage.setItem('preferredColorScheme', schemeName);
    }
  };

  return (
    <ColorContext.Provider value={{ colorScheme, changeColorScheme }}>
      {children}
    </ColorContext.Provider>
  );
};
