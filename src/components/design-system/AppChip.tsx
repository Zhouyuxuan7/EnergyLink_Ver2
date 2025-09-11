import React from 'react';
import { cn } from '../ui/utils';

interface AppChipProps {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function AppChip({ children, selected = false, onClick, className }: AppChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center px-3 py-2 rounded-full text-sm font-medium transition-colors",
        selected 
          ? "bg-[#2E7D32] text-white" 
          : "bg-gray-100 text-gray-700 hover:bg-gray-200",
        className
      )}
    >
      {children}
    </button>
  );
}