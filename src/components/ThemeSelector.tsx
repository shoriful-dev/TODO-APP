import React from 'react';
import { Palette } from 'lucide-react';
import { Theme } from '../types/theme';

interface ThemeSelectorProps {
  themes: Theme[];
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export function ThemeSelector({ themes, currentTheme, onThemeChange }: ThemeSelectorProps) {
  return (
    <div className="absolute top-4 right-4">
      <div className="relative group">
        <button
          className="p-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-all flex items-center gap-2"
          aria-label="Theme settings"
        >
          <Palette style={{ color: currentTheme.colors.primary }} className="h-5 w-5" />
          <span className="text-sm text-gray-600">Theme</span>
        </button>
        
        <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
          {themes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => onThemeChange(theme)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
              style={{
                color: currentTheme.name === theme.name ? theme.colors.primary : '#374151'
              }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: theme.colors.primary }}
              />
              {theme.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}