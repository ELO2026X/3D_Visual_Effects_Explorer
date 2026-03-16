import React from 'react';
import { EffectCategory } from '../types';

interface SidebarProps {
  effectCategories: EffectCategory[];
  selectedEffect: string | null;
  onSelectEffect: (effectName: string) => void;
  isLoading: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  effectCategories,
  selectedEffect,
  onSelectEffect,
  isLoading,
}) => {
  return (
    <div className="w-64 bg-gray-800 p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Effects Explorer</h2>
      <div className="space-y-4">
        {effectCategories.map((category) => (
          <div key={category.name}>
            <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
            <ul className="space-y-1">
              {category.effects.map((effect) => (
                <li key={effect.name}>
                  <button
                    className={`w-full text-left p-2 rounded-md transition-colors duration-200
                      ${selectedEffect === effect.name
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'hover:bg-gray-700'
                      }`}
                    onClick={() => onSelectEffect(effect.name)}
                    disabled={isLoading}
                  >
                    {effect.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
