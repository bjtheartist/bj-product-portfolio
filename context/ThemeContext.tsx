import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

type Theme = 'dark' | 'light' | 'color';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  cycleTheme: () => void;
  isDark: boolean;
  isColor: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Initialize from localStorage or system preference (SSR safe)
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('temsvision-theme') as Theme;
      if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light' || savedTheme === 'color')) {
        return savedTheme;
      }
      // Check system preference
      if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    }
    return 'dark';
  });

  useEffect(() => {
    // Update document class and save preference
    const root = document.documentElement;
    root.classList.remove('dark', 'light', 'color');
    root.classList.add(theme);

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      const themeColors: Record<Theme, string> = {
        dark: '#000000',
        light: '#ffffff',
        color: '#1e40af', // blue-800
      };
      metaThemeColor.setAttribute('content', themeColors[theme]);
    }

    localStorage.setItem('temsvision-theme', theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem('temsvision-theme');
      // Only auto-switch if user hasn't manually set a preference
      if (!savedTheme) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const cycleTheme = useCallback(() => {
    setTheme(prev => {
      switch (prev) {
        case 'dark':
          return 'light';
        case 'light':
          return 'color';
        case 'color':
          return 'dark';
        default:
          return 'dark';
      }
    });
  }, []);

  const isDark = theme === 'dark';
  const isColor = theme === 'color';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, cycleTheme, isDark, isColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
