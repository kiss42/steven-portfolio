import React, { useState } from 'react';
import { useColor, colorSchemes } from '../context/ColorContext';
import { Palette } from 'lucide-react';

const ColorPicker = () => {
  const { changeColorScheme, colorScheme } = useColor();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <div
        className={`transition-all duration-300 ${
          open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        } bg-gray-900 text-white rounded-xl p-4 w-48 shadow-lg mb-3`}
      >
        <p className="text-sm font-bold mb-2">Choose Color Scheme</p>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(colorSchemes).map(([key, scheme]) => (
            <button
              key={key}
              onClick={() => changeColorScheme(key)}
              className={`w-10 h-10 rounded-full border-2 ${
                scheme.primary === colorScheme.primary ? 'ring-2 ring-white' : 'border-transparent'
              }`}
              style={{ backgroundColor: scheme.primary }}
              title={key}
            />
          ))}
        </div>
      </div>

      <button
        onClick={() => setOpen(!open)}
        className="bg-purple-600 hover:bg-purple-700 p-3 rounded-full shadow-md transition"
      >
        <Palette className="text-white" />
      </button>
    </div>
  );
};

export default ColorPicker;
