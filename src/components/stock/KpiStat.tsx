import React from 'react';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';

interface KpiStatProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon?: LucideIcon;
  variant?: 'default' | 'compact' | 'dark';
  className?: string;
}

export function KpiStat({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon,
  variant = 'default',
  className = '' 
}: KpiStatProps) {
  const getTrendColor = (isDark = true) => {
    switch (trend) {
      case 'up': return 'metric-energy-value';
      case 'down': return isDark ? 'text-[#ef4444]' : 'text-red-600';
      default: return 'metric-energy-secondary';
    }
  };

  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="w-3 h-3" />;
    if (trend === 'down') return <TrendingDown className="w-3 h-3" />;
    return null;
  };

  const isDark = variant === 'dark';
  const bgClass = isDark ? 'dashboard-block' : 'content-clean';
  const titleClass = 'metric-energy-secondary';
  const valueClass = 'metric-energy-value';
  const sparklineColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)';

  return (
    <div className={`${bgClass} border rounded-lg p-4 ${className}`}>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className={`text-sm ${titleClass} uppercase tracking-wide`}>{title}</p>
          {Icon && <Icon className={`w-4 h-4 ${titleClass}`} />}
        </div>
        <div className="space-y-1">
          <p className={`text-2xl font-semibold ${valueClass}`}>{value}</p>
          <div className={`flex items-center space-x-1 text-sm ${getTrendColor(isDark)}`}>
            {getTrendIcon()}
            <span>{change}</span>
          </div>
        </div>
        
        {/* Mini sparkline placeholder */}
        <div className="mt-3 h-8 flex items-end space-x-1">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="w-1 rounded-sm"
              style={{ 
                height: `${Math.random() * 100 + 20}%`,
                backgroundColor: trend === 'up' 
                  ? 'var(--accent-energy-1)'
                  : trend === 'down' 
                    ? '#ef4444'
                    : sparklineColor
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}