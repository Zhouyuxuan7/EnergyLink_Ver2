import React from 'react';

interface HeatMapCellProps {
  neighborhood?: string;
  location?: string;
  activity?: 'low' | 'medium' | 'high';
  level?: 'low' | 'medium' | 'high';
  value?: string;
  variant?: 'default' | 'dark';
  className?: string;
}

export function HeatMapCell({ 
  neighborhood,
  location, 
  activity,
  level, 
  value,
  variant = 'default',
  className = '' 
}: HeatMapCellProps) {
  const isDark = variant === 'dark';
  const displayLocation = neighborhood || location || '';
  const activityLevel = activity || level || 'low';

  const getActivityStyles = () => {
    switch (activityLevel) {
      case 'high':
        return 'heat-energy-high text-black';
      case 'medium':
        return 'heat-energy-medium text-black';
      case 'low':
        return 'heat-energy-low text-white';
      default:
        return 'heat-energy-low text-white';
    }
  };

  const getActivityLabel = () => {
    switch (activityLevel) {
      case 'high': return 'High Activity (15+ kWh)';
      case 'medium': return 'Medium Activity (8-14 kWh)';
      case 'low': return 'Low Activity (<8 kWh)';
    }
  };

  return (
    <div 
      className={`aspect-square border-2 rounded-lg p-3 transition-all hover:scale-105 cursor-pointer ${getActivityStyles()} ${className}`}
      title={`${displayLocation}: ${getActivityLabel()}`}
    >
      <div className="h-full flex flex-col justify-between">
        <div className="text-xs font-medium truncate">
          {displayLocation}
        </div>
        {value && (
          <div className="text-sm font-semibold">
            {value}
          </div>
        )}
      </div>
    </div>
  );
}