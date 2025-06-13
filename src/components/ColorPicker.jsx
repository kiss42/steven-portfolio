import React, { useState } from 'react';
import { useColor, colorSchemes } from '../context/ColorContext';
import { Palette } from 'lucide-react';

const ColorPicker = () => {
  const { colorScheme, changeColorScheme } = useColor();
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { name: 'nightMagic', label: 'Night Magic', color: colorSchemes.nightMagic?.primary },
    { name: 'lightPeaceful', label: 'Light Peaceful', color: colorSchemes.lightPeaceful?.primary },
  ];

  return (
    <div className="fixed bottom-10 right-6 z-50">
      {isOpen && (
        <div className="bg-[#0E0E0E] text-white p-4 rounded-xl shadow-lg mb-3 w-56">
          <h4 className="font-semibold text-lg mb-2">Choose Theme</h4>
          <div className="flex gap-3 justify-center flex-wrap">
            {options.map(({ name, color }) => (
              <button
                key={name}
                onClick={() => changeColorScheme(name)}
                className="w-8 h-8 rounded-full border-2 transition-all duration-300"
                style={{
                  backgroundColor: color,
                  borderColor:
                    colorScheme === colorSchemes[name] ? '#fff' : 'transparent',
                }}
                title={name}
              />
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 rounded-xl shadow-lg text-white bg-[#305A79] hover:scale-105 transition-all"
        title="Toggle Color Theme"
      >
        <Palette />
      </button>
    </div>
  );
};

export default ColorPicker;
