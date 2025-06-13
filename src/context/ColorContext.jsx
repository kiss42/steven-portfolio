import React, { createContext, useState, useContext, useEffect } from 'react';

const ColorContext = createContext();

export const useColor = () => useContext(ColorContext);

// Color schemes
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
    primary: '#A0AEC0',        // Dusty blue
    secondary: '#B6C5B1',      // Sage green
    text: '#2D3748',           // Deep indigo/navy
    onPrimary: '#ffffff',
    onSecondary: '#1a202c',
  },
};

export const ColorProvider = ({ children }) => {
  const [colorScheme, setColorScheme] = useState(colorSchemes.nightMagic);
  const [schemeName, setSchemeName] = useState('nightMagic');

  useEffect(() => {
    const saved = localStorage.getItem('preferredColorScheme');
    if (saved && colorSchemes[saved]) {
      setColorScheme(colorSchemes[saved]);
      setSchemeName(saved);
    }
  }, []);

  useEffect(() => {
    // Dynamically update browser theme color
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
      themeMeta.setAttribute('content', colorScheme.primary);
    }
  }, [colorScheme]);

  const changeColorScheme = (name) => {
    const scheme = colorSchemes[name];
    if (scheme) {
      setColorScheme(scheme);
      setSchemeName(name);
      localStorage.setItem('preferredColorScheme', name);
    }
  };

  return (
    <ColorContext.Provider value={{ colorScheme, changeColorScheme, schemeName }}>
      {children}
    </ColorContext.Provider>
  );
};
