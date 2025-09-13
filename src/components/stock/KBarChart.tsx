import React from 'react';
import { Circle } from 'lucide-react';

interface KBarChartProps {
  title: string;
  timeframe: '24H' | '7D' | '30D';
  onTimeframeChange: (timeframe: '24H' | '7D' | '30D') => void;
  currentPrice: string;
  priceChange: string;
  priceChangePercent: string;
  variant?: 'state_1' | 'state_2' | 'state_3' | 'state_4' | 'state_5' | 'state_6';
  className?: string;
}

export function KBarChart({ 
  title, 
  timeframe,
  onTimeframeChange,
  currentPrice,
  priceChange,
  priceChangePercent,
  variant = 'state_1',
  className = '' 
}: KBarChartProps) {
  const timeframes = ['24H', '7D', '30D'] as const;
  
  // Generate different bar heights based on variant
  const getBarHeights = () => {
    const baseHeights = [40, 65, 55, 80, 45, 90, 35, 75, 60, 85, 50, 70];
    const variantOffset = variant === 'state_1' ? 0 : 
                         variant === 'state_2' ? 5 :
                         variant === 'state_3' ? -3 :
                         variant === 'state_4' ? 8 :
                         variant === 'state_5' ? -5 : 10;
    
    return baseHeights.map(h => Math.max(20, Math.min(100, h + variantOffset)));
  };

  const barHeights = getBarHeights();
  const isPositive = !priceChange.startsWith('-');

  return (
    <div className={`bg-[#111113] border border-[#262626] rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-[#f8fafc]">{title}</h3>
          <div className="flex items-center space-x-1 text-sm text-[#00ff88]">
            <Circle className="w-2 h-2 fill-current" />
            <span>LIVE</span>
          </div>
        </div>
        
        {/* Timeframe selector */}
        <div className="flex items-center space-x-1 bg-[#1a1a1d] rounded-lg p-1">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => onTimeframeChange(tf)}
              className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                timeframe === tf
                  ? 'bg-[#00ff88] text-[#0a0a0b]'
                  : 'text-[#64748b] hover:text-[#f8fafc]'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Price info */}
      <div className="mb-6">
        <div className="flex items-baseline space-x-3">
          <span className="text-3xl font-bold text-[#f8fafc]">{currentPrice}</span>
          <span className={`text-lg font-medium ${isPositive ? 'text-[#00ff88]' : 'text-[#ef4444]'}`}>
            {priceChange} ({priceChangePercent})
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 flex items-end justify-between space-x-1 border-b border-[#262626] pb-4">
        {barHeights.map((height, i) => (
          <div key={i} className="flex-1 flex flex-col items-center">
            {/* Wick (high/low) */}
            <div className="w-px bg-[#64748b] h-2 mb-1" />
            
            {/* Bar body */}
            <div
              className={`w-full rounded-sm ${isPositive ? 'bg-[#00ff88]' : 'bg-[#ef4444]'}`}
              style={{ height: `${height}%` }}
            />
            
            {/* Wick (low) */}
            <div className="w-px bg-[#64748b] h-1 mt-1" />
          </div>
        ))}
      </div>

      {/* Baseline and axis */}
      <div className="flex justify-between text-xs text-[#64748b] mt-2">
        {Array.from({ length: 6 }, (_, i) => {
          const hour = timeframe === '24H' ? `${i * 4}h` : 
                      timeframe === '7D' ? `Day ${i + 1}` : 
                      `Week ${i + 1}`;
          return <span key={i}>{hour}</span>;
        })}
      </div>
    </div>
  );
}