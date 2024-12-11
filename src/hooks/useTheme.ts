import { useState, useEffect } from 'react';
import { Theme, defaultThemes } from '../types/theme';

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return saved ? JSON.parse(saved) : defaultThemes[0];
  });

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(currentTheme));
    
    // Update CSS variables when theme changes
    document.documentElement.style.setProperty('--color-primary', currentTheme.colors.primary);
    document.documentElement.style.setProperty('--color-secondary', currentTheme.colors.secondary);
    document.documentElement.style.setProperty('--color-accent', currentTheme.colors.accent);
    document.documentElement.style.setProperty('--color-background', currentTheme.colors.background);
    document.documentElement.style.setProperty('--color-text', currentTheme.colors.text);
  }, [currentTheme]);

  return {
    currentTheme,
    setCurrentTheme,
    themes: defaultThemes
  };
}