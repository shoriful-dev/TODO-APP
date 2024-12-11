export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface Theme {
  name: string;
  colors: ThemeColors;
}

export const defaultThemes: Theme[] = [
  {
    name: 'Default Blue',
    colors: {
      primary: '#3b82f6',
      secondary: '#6b7280',
      accent: '#22c55e',
      background: '#f3f4f6',
      text: '#111827'
    }
  },
  {
    name: 'Purple Dream',
    colors: {
      primary: '#8b5cf6',
      secondary: '#6b7280',
      accent: '#ec4899',
      background: '#f5f3ff',
      text: '#1e1b4b'
    }
  },
  {
    name: 'Forest',
    colors: {
      primary: '#059669',
      secondary: '#6b7280',
      accent: '#0d9488',
      background: '#f0fdf4',
      text: '#064e3b'
    }
  }
];