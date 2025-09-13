import React from 'react';

interface AchievementCardProps {
  icon: string;
  title: string;
  description: string;
  progress: number; // 0-100
  unlocked?: boolean;
  variant?: 'default' | 'dark';
  className?: string;
}

export function AchievementCard({ 
  icon, 
  title, 
  description, 
  progress, 
  unlocked = false,
  variant = 'default',
  className = '' 
}: AchievementCardProps) {
  const isDark = variant === 'dark';
  
  const bgClass = isDark ? 'bg-[#111113] border-[#262626] hover:border-[#3a3a3d]' : 'bg-white border-gray-200 hover:border-gray-300';
  const titleClass = isDark ? 'text-[#f8fafc]' : 'text-gray-900';
  const descriptionClass = isDark ? 'text-[#64748b]' : 'text-gray-600';
  const progressBgClass = isDark ? 'bg-[#262626]' : 'bg-gray-200';
  const progressBarClass = unlocked 
    ? isDark ? 'bg-[#00ff88]' : 'bg-green-500'
    : isDark ? 'bg-[#fbbf24]' : 'bg-amber-500';
  const completedTextClass = isDark ? 'text-[#00ff88]' : 'text-green-600';

  return (
    <div className={`${bgClass} border rounded-lg p-6 transition-all hover:scale-105 cursor-pointer ${className}`}>
      {/* Header */}
      <div className="flex items-start space-x-3 mb-4">
        <div className="text-2xl">{icon}</div>
        <div className="flex-1">
          <h4 className={`font-semibold ${titleClass} mb-1`}>{title}</h4>
          <p className={`text-sm ${descriptionClass}`}>{description}</p>
        </div>
        {unlocked && (
          <div className="text-lg">✨</div>
        )}
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className={`text-sm ${descriptionClass}`}>Progress</span>
          <span className={`text-sm font-semibold ${titleClass}`}>{progress}%</span>
        </div>
        
        <div className={`w-full ${progressBgClass} rounded-full h-2`}>
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${progressBarClass}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Completion indicator */}
      {unlocked && (
        <div className="mt-4 text-center">
          <span className={`text-sm font-medium ${completedTextClass}`}>Completed!</span>
        </div>
      )}
    </div>
  );
}