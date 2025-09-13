import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Home, Zap, Users, Settings } from 'lucide-react';

interface TopNavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  userRole?: 'seller' | 'buyer' | null;
}

export function TopNavigation({ currentScreen, onNavigate, userRole }: TopNavigationProps) {
  const navItems = [
    { id: 'automatch', label: 'Dashboard', icon: Home },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#2E7D32] rounded-xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">EnergyLink</h1>
            <p className="text-sm text-gray-500">P2P Energy Trading</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center space-x-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-[#2E7D32] text-white' 
                    : 'text-gray-600 hover:text-[#2E7D32] hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* User Avatar */}
        <div className="flex items-center space-x-3">
          {userRole && (
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {userRole === 'seller' ? 'Solar Seller' : 'Energy Buyer'}
              </p>
              <p className="text-xs text-gray-500">Verified Neighbor</p>
            </div>
          )}
          <Avatar className="h-10 w-10">
            <AvatarImage src="/api/placeholder/40/40" />
            <AvatarFallback className="bg-[#2E7D32] text-white">
              {userRole === 'seller' ? 'S' : 'B'}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
}