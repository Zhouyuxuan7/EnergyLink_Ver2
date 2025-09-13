import React from 'react';

interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant?: 'default' | 'segmented' | 'dark';
  className?: string;
}

export function Tabs({ 
  tabs, 
  activeTab, 
  onTabChange, 
  variant = 'default',
  className = '' 
}: TabsProps) {
  const isDark = variant === 'dark';

  if (variant === 'segmented') {
    return (
      <div className={`flex space-x-1 ${isDark ? 'bg-[#1a1a1d]' : 'bg-gray-100'} rounded-lg p-1 ${className}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded transition-colors ${
              activeTab === tab.id
                ? isDark 
                  ? 'bg-[#262626] text-[#f8fafc]'
                  : 'bg-white text-gray-900 shadow-sm'
                : isDark
                  ? 'text-[#64748b] hover:text-[#f8fafc]'
                  : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`border-b ${isDark ? 'border-[#262626]' : 'border-gray-200'} ${className}`}>
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`pb-3 border-b-2 font-medium transition-colors ${
              activeTab === tab.id
                ? isDark
                  ? 'border-[#00ff88] text-[#00ff88]'
                  : 'border-[#2E7D32] text-[#2E7D32]'
                : isDark
                  ? 'border-transparent text-[#64748b] hover:text-[#f8fafc]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}