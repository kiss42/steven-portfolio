import React from 'react';
import Home from './components/Home';
import ColorPicker from './components/ColorPicker';
import { ColorProvider } from './context/ColorContext';

const App = () => {
  return (
    <ColorProvider>
      <div className="font-sans min-h-screen transition-colors duration-300">
        <ColorPicker />
        <Home />
      </div>
    </ColorProvider>
  );
};

export default App;
