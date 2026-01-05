import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  variant?: 'fixed' | 'inline';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', variant = 'fixed' }) => {
  const { toggleTheme, isDark } = useTheme();

  const baseClasses = variant === 'fixed' 
    ? 'fixed bottom-6 right-6 z-[100]' 
    : '';

  return (
    <button
      onClick={toggleTheme}
      className={`
        ${baseClasses}
        w-10 h-10 rounded-full flex items-center justify-center 
        transition-all duration-300 hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
        ${isDark 
          ? 'bg-slate-800 text-blue-400 hover:text-blue-300 border border-white/10 focus:ring-offset-black' 
          : 'bg-white text-blue-600 hover:text-blue-500 border border-black/10 shadow-sm focus:ring-offset-white'
        }
        ${className}
      `}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      role="switch"
      aria-checked={isDark}
    >
      {/* Sun icon for light mode */}
      <svg 
        className={`w-5 h-5 transition-all duration-300 absolute ${
          isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
        }`}
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="5"/>
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
      </svg>
      
      {/* Moon icon for dark mode */}
      <svg 
        className={`w-5 h-5 transition-all duration-300 absolute ${
          isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
        }`}
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth="2"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
    </button>
  );
};

export default ThemeToggle;
