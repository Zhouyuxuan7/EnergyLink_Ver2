import React, { useState, useEffect } from 'react';
import { HouseVisual } from './HouseVisual';

interface Neighbor {
  id: string;
  name: string;
  energyTraded: number; // kWh
  co2Saved: number; // kg
  isTopContributor: boolean;
}

interface NeighborhoodVisualGridProps {
  className?: string;
}

export function NeighborhoodVisualGrid({ className = '' }: NeighborhoodVisualGridProps) {
  const [neighbors, setNeighbors] = useState<Neighbor[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    // Initial data
    const initialNeighbors: Neighbor[] = [
      { id: '1', name: 'Sarah M.', energyTraded: 247, co2Saved: 123, isTopContributor: true },
      { id: '2', name: 'James R.', energyTraded: 198, co2Saved: 99, isTopContributor: false },
      { id: '3', name: 'Lisa P.', energyTraded: 156, co2Saved: 78, isTopContributor: false },
      { id: '4', name: 'David C.', energyTraded: 134, co2Saved: 67, isTopContributor: false },
      { id: '5', name: 'Mike T.', energyTraded: 98, co2Saved: 49, isTopContributor: false },
      { id: '6', name: 'Emma W.', energyTraded: 87, co2Saved: 44, isTopContributor: false },
      { id: '7', name: 'Alex K.', energyTraded: 76, co2Saved: 38, isTopContributor: false },
      { id: '8', name: 'Maria L.', energyTraded: 65, co2Saved: 33, isTopContributor: false },
      { id: '9', name: 'Tom B.', energyTraded: 54, co2Saved: 27, isTopContributor: false },
      { id: '10', name: 'Jenny S.', energyTraded: 43, co2Saved: 22, isTopContributor: false },
      { id: '11', name: 'Chris D.', energyTraded: 32, co2Saved: 16, isTopContributor: false },
      { id: '12', name: 'Anna F.', energyTraded: 21, co2Saved: 11, isTopContributor: false }
    ];

    setNeighbors(initialNeighbors);

    // Simulate real-time updates every 3 seconds
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setNeighbors(prevNeighbors => 
          prevNeighbors.map(neighbor => {
            // Randomly increase energy traded (simulating new trades)
            const increase = Math.random() * 5 + 1; // 1-6 kWh increase
            const newEnergyTraded = neighbor.energyTraded + increase;
            const newCo2Saved = Math.round(newEnergyTraded * 0.5); // Rough CO2 calculation
            
            return {
              ...neighbor,
              energyTraded: Math.round(newEnergyTraded * 10) / 10, // Round to 1 decimal
              co2Saved: newCo2Saved,
              isTopContributor: newEnergyTraded >= 200 // Update top contributor status
            };
          }).sort((a, b) => b.energyTraded - a.energyTraded) // Sort by energy traded
        );
        setIsAnimating(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--txt-heading)' }}>
          Neighborhood Energy Map
        </h3>
        <p className="text-sm" style={{ color: 'var(--txt-muted)' }}>
          Each house represents a neighbor. Trees and solar panels show their energy contribution.
        </p>
      </div>

      {/* Visual Grid */}
      <div className={`grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-6 rounded-xl transition-all duration-500 ${
        isAnimating ? 'bg-[#00FF88]/5' : 'bg-[#1a1a1d]/50'
      }`}
      style={{ 
        border: '1px solid rgba(0, 245, 212, 0.2)',
        background: isAnimating 
          ? 'linear-gradient(135deg, rgba(0, 255, 136, 0.05), rgba(0, 230, 118, 0.05))'
          : 'var(--glass-surface)'
      }}>
        {neighbors.map((neighbor, index) => (
          <div
            key={neighbor.id}
            className="transition-all duration-500"
            style={{
              animationDelay: `${index * 100}ms`,
              transform: isAnimating ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            <HouseVisual
              name={neighbor.name}
              energyTraded={neighbor.energyTraded}
              co2Saved={neighbor.co2Saved}
              isTopContributor={neighbor.isTopContributor}
            />
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: 'var(--accent-energy-1)' }} />
          <span style={{ color: 'var(--txt-muted)' }}>Top Contributor (200+ kWh)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: 'var(--txt-muted)' }} />
          <span style={{ color: 'var(--txt-muted)' }}>Active Neighbor</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#228B22' }} />
          <span style={{ color: 'var(--txt-muted)' }}>Trees = Energy Level</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#FFD700' }} />
          <span style={{ color: 'var(--txt-muted)' }}>Solar = High Activity</span>
        </div>
      </div>

      {/* Live Update Indicator */}
      <div className="flex items-center justify-center space-x-2 text-xs" style={{ color: 'var(--txt-muted)' }}>
        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
          isAnimating ? 'bg-[#00FF88] animate-pulse' : 'bg-[#00FF88]'
        }`} />
        <span>Live updates every 3 seconds</span>
      </div>
    </div>
  );
}
