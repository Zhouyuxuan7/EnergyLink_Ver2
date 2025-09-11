import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { cn } from '../ui/utils';

interface ListItemProps {
  avatar?: string;
  title: string;
  subtitle?: string;
  rightValue?: string;
  rightSubtext?: string;
  onClick?: () => void;
  className?: string;
}

export function ListItem({ 
  avatar, 
  title, 
  subtitle, 
  rightValue, 
  rightSubtext,
  onClick, 
  className 
}: ListItemProps) {
  return (
    <div 
      className={cn(
        "flex items-center py-3 px-4 hover:bg-gray-50 transition-colors",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {avatar && (
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={avatar} />
          <AvatarFallback>{title.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
      
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 truncate">{title}</p>
        {subtitle && (
          <p className="text-sm text-gray-500 truncate">{subtitle}</p>
        )}
      </div>
      
      {(rightValue || rightSubtext) && (
        <div className="text-right">
          {rightValue && (
            <p className="font-medium text-gray-900">{rightValue}</p>
          )}
          {rightSubtext && (
            <p className="text-sm text-gray-500">{rightSubtext}</p>
          )}
        </div>
      )}
    </div>
  );
}