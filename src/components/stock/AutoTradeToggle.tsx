import React from 'react';
import { Zap, ZapOff } from 'lucide-react';

interface AutoTradeToggleProps {
  isEnabled: boolean;
  onToggle: () => void;
  variant?: 'pill' | 'switch';
  size?: 'sm' | 'md' | 'lg';
}

export function AutoTradeToggle({ 
  isEnabled, 
  onToggle, 
  variant = 'pill',
  size = 'md' 
}: AutoTradeToggleProps) {
  if (variant === 'pill') {
    return (
      <button
        onClick={onToggle}
        className={`
          inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium 
          transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 
          focus:ring-offset-2 focus:ring-primary
          ${isEnabled 
            ? 'bg-[#00ff88] text-[#0a0a0b] hover:bg-[#00ff88]/90' 
            : 'bg-gray-500 text-white hover:bg-gray-600'
          }
        `}
      >
        {isEnabled ? (
          <Zap className="w-4 h-4" />
        ) : (
          <ZapOff className="w-4 h-4" />
        )}
        <span>Auto-Trade: {isEnabled ? 'ON' : 'OFF'}</span>
      </button>
    );
  }

  // Switch variant
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
    <div className="flex items-center space-x-3">
      <span className="text-sm font-medium text-gray-700">Auto-Trade</span>
      <button
        onClick={onToggle}
        className={`
          relative inline-flex items-center ${sizeClasses[size]} 
          rounded-full border-2 border-transparent 
          transition-colors duration-200 ease-in-out focus:outline-none 
          focus:ring-2 focus:ring-offset-2 focus:ring-primary
          ${isEnabled 
            ? 'bg-[#00ff88]' 
            : 'bg-gray-200'
          }
        `}
        role="switch"
        aria-checked={isEnabled}
        aria-label={`Auto-trade is ${isEnabled ? 'enabled' : 'disabled'}`}
      >
        <span
          className={`
            ${thumbSizeClasses[size]} inline-block 
            bg-white rounded-full shadow transform ring-0 
            transition duration-200 ease-in-out
            flex items-center justify-center
            ${isEnabled ? 'translate-x-7' : 'translate-x-0'}
          `}
        >
          {isEnabled ? (
            <Zap className={`${iconSizeClasses[size]} text-[#00ff88]`} />
          ) : (
            <ZapOff className={`${iconSizeClasses[size]} text-gray-400`} />
          )}
        </span>
      </button>
    </div>
  );
}