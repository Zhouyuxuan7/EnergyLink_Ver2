import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export function ThemeToggle({ isDark, onToggle, size = 'md' }: ThemeToggleProps) {
  const sizeClasses = {
    sm: 'w-12 h-6',
    md: 'w-14 h-7',
    lg: 'w-16 h-8'
  };

  const thumbSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5', 
    lg: 'w-6 h-6'
  };

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4'
  };

  return (
    <button
      onClick={onToggle}
      className={`
        relative inline-flex items-center ${sizeClasses[size]} 
        bg-gray-200 rounded-full border-2 border-transparent 
        transition-colors duration-200 ease-in-out focus:outline-none 
        focus:ring-2 focus:ring-offset-2 focus:ring-primary
        ${isDark ? 'bg-[#1a1a1d]' : 'bg-gray-200'}
      `}
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span
        className={`
          ${thumbSizeClasses[size]} inline-block 
          bg-white rounded-full shadow transform ring-0 
          transition duration-200 ease-in-out
          flex items-center justify-center
          ${isDark ? 'translate-x-7' : 'translate-x-0'}
        `}
      >
        {isDark ? (
          <Moon className={`${iconSizeClasses[size]} text-[#0a0a0b]`} />
        ) : (
          <Sun className={`${iconSizeClasses[size]} text-[#FFB300]`} />
        )}
      </span>
    </button>
  );
}