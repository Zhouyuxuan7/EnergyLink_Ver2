import React from 'react';
import { cn } from '../ui/utils';

interface StatusPillProps {
  status: 'matched' | 'paused' | 'error' | 'executing';
  children: React.ReactNode;
  className?: string;
}

export function StatusPill({ status, children, className }: StatusPillProps) {
  const statusClasses = {
    matched: "bg-green-100 text-green-800 border-green-200",
    paused: "bg-gray-100 text-gray-600 border-gray-200",
    error: "bg-red-100 text-red-800 border-red-200",
    executing: "bg-blue-100 text-blue-800 border-blue-200"
  };

  return (
    <span className={cn(
      "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border",
      statusClasses[status],
      className
    )}>
      {children}
    </span>
  );
}