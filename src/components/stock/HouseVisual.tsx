import React, { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface HouseVisualProps {
  name: string;
  energyTraded: number; // kWh
  co2Saved: number; // kg
  isTopContributor: boolean;
  className?: string;
}

export function HouseVisual({ name, energyTraded, co2Saved, isTopContributor, className = '' }: HouseVisualProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Determine number of trees and solar panels based on energy traded
  const getVisualElements = () => {
    if (energyTraded >= 200) {
      return { trees: 4, solarPanels: 2, activity: 'high' };
    } else if (energyTraded >= 100) {
      return { trees: 3, solarPanels: 1, activity: 'high' };
    } else if (energyTraded >= 50) {
      return { trees: 2, solarPanels: 1, activity: 'medium' };
    } else if (energyTraded >= 20) {
      return { trees: 1, solarPanels: 0, activity: 'medium' };
    } else {
      return { trees: 0, solarPanels: 0, activity: 'low' };
    }
  };

  const { trees, solarPanels, activity } = getVisualElements();

  const HouseIcon = () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      className={`transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}
      style={{ 
        filter: isTopContributor ? 'drop-shadow(0 0 8px var(--accent-energy-1))' : 'none'
      }}
    >
      {/* House base */}
      <rect
        x="8"
        y="16"
        width="16"
        height="12"
        fill={isTopContributor ? 'var(--accent-energy-1)' : 'var(--txt-muted)'}
        className="transition-all duration-300"
      />
      {/* Roof */}
      <polygon
        points="6,16 16,8 26,16"
        fill={isTopContributor ? 'var(--accent-energy-2)' : 'var(--txt-primary)'}
        className="transition-all duration-300"
      />
      {/* Door */}
      <rect
        x="14"
        y="20"
        width="4"
        height="8"
        fill="var(--bg-page)"
        className="transition-all duration-300"
      />
      {/* Windows */}
      <rect
        x="10"
        y="18"
        width="2"
        height="2"
        fill="var(--bg-page)"
        className="transition-all duration-300"
      />
      <rect
        x="20"
        y="18"
        width="2"
        height="2"
        fill="var(--bg-page)"
        className="transition-all duration-300"
      />
    </svg>
  );

  const TreeIcon = ({ size = 16 }: { size?: number }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      className="transition-all duration-500"
      style={{ 
        animation: isHovered ? 'pulse 1s ease-in-out infinite' : 'none'
      }}
    >
      {/* Tree trunk */}
      <rect x="7" y="10" width="2" height="6" fill="#8B4513" />
      {/* Tree leaves */}
      <circle cx="8" cy="8" r="4" fill="#228B22" />
    </svg>
  );

  const SolarPanelIcon = ({ size = 12 }: { size?: number }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      className="transition-all duration-500"
      style={{ 
        animation: isHovered ? 'pulse 1s ease-in-out infinite' : 'none'
      }}
    >
      {/* Solar panel */}
      <rect x="1" y="1" width="10" height="8" fill="#FFD700" stroke="#FFA500" strokeWidth="0.5" />
      {/* Grid lines */}
      <line x1="6" y1="1" x2="6" y2="9" stroke="#FFA500" strokeWidth="0.3" />
      <line x1="1" y1="5" x2="11" y2="5" stroke="#FFA500" strokeWidth="0.3" />
    </svg>
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`relative cursor-pointer transition-all duration-300 ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* House */}
            <div className="flex justify-center mb-2">
              <HouseIcon />
            </div>

            {/* Trees and Solar Panels */}
            <div className="flex justify-center items-end space-x-1 h-8">
              {/* Trees */}
              {Array.from({ length: trees }).map((_, index) => (
                <div
                  key={`tree-${index}`}
                  className="transition-all duration-500"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
                  }}
                >
                  <TreeIcon />
                </div>
              ))}

              {/* Solar Panels */}
              {Array.from({ length: solarPanels }).map((_, index) => (
                <div
                  key={`solar-${index}`}
                  className="transition-all duration-500"
                  style={{
                    animationDelay: `${(trees + index) * 100}ms`,
                    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
                  }}
                >
                  <SolarPanelIcon />
                </div>
              ))}
            </div>

            {/* Name */}
            <div className="text-center mt-2">
              <p className="text-xs font-medium truncate max-w-20" style={{ color: 'var(--txt-heading)' }}>
                {name}
              </p>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-[#1a1a1d] border border-[#262626] text-white">
          <div className="space-y-2">
            <p className="font-semibold text-[#00FF88]">{name}</p>
            <div className="space-y-1 text-sm">
              <p><span className="text-[#00FF88]">{energyTraded} kWh</span> traded</p>
              <p><span className="text-[#00FF88]">{co2Saved} kg</span> CO₂ saved</p>
              {isTopContributor && (
                <p className="text-[#FFD700] font-medium">🌟 Top Contributor</p>
              )}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
