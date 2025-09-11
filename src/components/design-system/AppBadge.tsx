import React from 'react';
import { cn } from '../ui/utils';

interface AppBadgeProps {
  variant: 'verified' | 'hoa' | 'top-sharer';
  children: React.ReactNode;
  className?: string;
}

export function AppBadge({ variant, children, className }: AppBadgeProps) {
  const variantClasses = {
    'verified': "bg-[#2E7D32] text-white",
    'hoa': "bg-blue-600 text-white", 
    'top-sharer': "bg-[#FFB300] text-white"
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium",
      variantClasses[variant],
      className
    )}>
      {children}
    </span>
  );
}