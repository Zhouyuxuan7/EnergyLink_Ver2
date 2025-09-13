import React from 'react';

interface ActivityItemProps {
  icon: string;
  text: string;
  time: string;
  type?: 'trade' | 'milestone' | 'community' | 'user';
  variant?: 'default' | 'dark';
  className?: string;
}

export function ActivityItem({ 
  icon, 
  text, 
  time, 
  type = 'trade',
  variant = 'default',
  className = '' 
}: ActivityItemProps) {
  const isDark = variant === 'dark';

  const getTypeStyles = () => {
    switch (type) {
      case 'trade':
        return isDark ? 'border-l-[#00ff88]' : 'border-l-green-500';
      case 'milestone':
        return isDark ? 'border-l-[#fbbf24]' : 'border-l-amber-500';
      case 'community':
        return isDark ? 'border-l-[#3b82f6]' : 'border-l-blue-500';
      case 'user':
        return isDark ? 'border-l-[#8b5cf6]' : 'border-l-purple-500';
      default:
        return isDark ? 'border-l-[#64748b]' : 'border-l-gray-400';
    }
  };

  const bgClass = isDark ? 'bg-[#111113] border-[#262626] hover:border-[#3a3a3d]' : 'bg-gray-50 border-gray-200 hover:border-gray-300';
  const textClass = isDark ? 'text-[#f8fafc]' : 'text-gray-900';
  const timeClass = isDark ? 'text-[#64748b]' : 'text-gray-600';

  return (
    <div className={`flex items-start space-x-3 p-3 ${bgClass} border border-l-4 rounded-lg transition-colors ${getTypeStyles()} ${className}`}>
      {/* Icon */}
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
        <span className="text-lg">{icon}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm ${textClass} leading-relaxed`}>{text}</p>
        <p className={`text-xs ${timeClass} mt-1`}>{time}</p>
      </div>
    </div>
  );
}