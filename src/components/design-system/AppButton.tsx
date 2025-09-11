import React from 'react';
import { Button } from '../ui/button';
import { cn } from '../ui/utils';

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

export function AppButton({ 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'left',
  children, 
  className,
  disabled,
  ...props 
}: AppButtonProps) {
  const baseClasses = "rounded-xl transition-all duration-200 active:scale-[0.98] min-h-[44px] flex items-center justify-center gap-2";
  
  const variantClasses = {
    primary: "bg-[#2E7D32] text-white hover:bg-[#1B5E20] active:bg-[#1B5E20] disabled:bg-gray-300 disabled:text-gray-500",
    secondary: "border-2 border-[#2E7D32] text-[#2E7D32] bg-white hover:bg-gray-50 active:bg-gray-100 disabled:border-gray-300 disabled:text-gray-400",
    tertiary: "text-[#2E7D32] bg-transparent hover:bg-gray-50 active:bg-gray-100 disabled:text-gray-400"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="w-5 h-5 flex-shrink-0">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="w-5 h-5 flex-shrink-0">{icon}</span>
      )}
    </button>
  );
}