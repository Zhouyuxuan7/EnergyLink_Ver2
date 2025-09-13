import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Leaf, DollarSign, Trophy, MapPin, Clock, UserPlus } from 'lucide-react';
import { KpiStat } from '../stock/KpiStat';
import { Tabs } from '../stock/Tabs';
import { LeaderboardRow } from '../stock/LeaderboardRow';
import { HeatMapCell } from '../stock/HeatMapCell';
import { ActivityItem } from '../stock/ActivityItem';

export function PublicCommunityScreen() {
  const [activeTimeTab, setActiveTimeTab] = useState('month');
  const [activeActivityTab, setActiveActivityTab] = useState('heatmap');
  const [currentKpiVariant, setCurrentKpiVariant] = useState(0);
  const [currentActivityVariant, setCurrentActivityVariant] = useState(0);

  // Auto-advance KPI stats every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKpiVariant((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Auto-advance activity feed every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivityVariant((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const kpiVariants = [
    {
      totalKwh: { value: '1,247', change: '+15% this month', trend: 'up' },
      activeNeighbors: { value: '156', change: '+8 this week', trend: 'up' },
      co2Saved: { value: '892', change: '+120 this month', trend: 'up' },
      communitySavings: { value: '$2,340', change: '+$180 this week', trend: 'up' }
    },
    {
      totalKwh: { value: '1,251', change: '+16% this month', trend: 'up' },
      activeNeighbors: { value: '158', change: '+10 this week', trend: 'up' },
      co2Saved: { value: '895', change: '+123 this month', trend: 'up' },
      communitySavings: { value: '$2,355', change: '+$195 this week', trend: 'up' }
    },
    {
      totalKwh: { value: '1,255', change: '+17% this month', trend: 'up' },
      activeNeighbors: { value: '159', change: '+11 this week', trend: 'up' },
      co2Saved: { value: '898', change: '+125 this month', trend: 'up' },
      communitySavings: { value: '$2,370', change: '+$210 this week', trend: 'up' }
    }
  ];

  const currentKpis = kpiVariants[currentKpiVariant];

  const timeframeTabs = [
    { id: 'month', label: 'This Month' },
    { id: 'week', label: 'This Week' },
    { id: 'all', label: 'All Time' }
  ];

  const activityTabs = [
    { id: 'heatmap', label: 'Heat Map' },
    { id: 'trades', label: 'Recent Trades' }
  ];

  // Privacy-safe leaderboard data (neighborhoods only)
  const leaderboardData = {
    month: [
      { rank: 1, name: 'Oak Street', subtitle: 'Neighborhood', value: '847 kWh', icon: '🏆' },
      { rank: 2, name: 'Sunset District', subtitle: 'Neighborhood', value: '692 kWh', icon: '🥈' },
      { rank: 3, name: 'Mission District', subtitle: 'Neighborhood', value: '534 kWh', icon: '🥉' },
      { rank: 4, name: 'Castro District', subtitle: 'Neighborhood', value: '423 kWh', icon: '📍' },
      { rank: 5, name: 'Richmond District', subtitle: 'Neighborhood', value: '387 kWh', icon: '📍' }
    ],
    week: [
      { rank: 1, name: 'Mission District', subtitle: 'Neighborhood', value: '234 kWh', icon: '🏆' },
      { rank: 2, name: 'Oak Street', subtitle: 'Neighborhood', value: '198 kWh', icon: '🥈' },
      { rank: 3, name: 'Sunset District', subtitle: 'Neighborhood', value: '156 kWh', icon: '🥉' },
      { rank: 4, name: 'Castro District', subtitle: 'Neighborhood', value: '134 kWh', icon: '📍' },
      { rank: 5, name: 'Richmond District', subtitle: 'Neighborhood', value: '127 kWh', icon: '📍' }
    ],
    all: [
      { rank: 1, name: 'Oak Street', subtitle: 'Neighborhood', value: '2,847 kWh', icon: '🏆' },
      { rank: 2, name: 'Sunset District', subtitle: 'Neighborhood', value: '2,192 kWh', icon: '🥈' },
      { rank: 3, name: 'Mission District', subtitle: 'Neighborhood', value: '1,934 kWh', icon: '🥉' },
      { rank: 4, name: 'Castro District', subtitle: 'Neighborhood', value: '1,623 kWh', icon: '📍' },
      { rank: 5, name: 'Richmond District', subtitle: 'Neighborhood', value: '1,387 kWh', icon: '📍' }
    ]
  };

  // Heat map data
  const heatMapData = [
    { location: 'Oak St', level: 'high' },
    { location: 'Pine St', level: 'medium' },
    { location: 'Bush St', level: 'low' },
    { location: 'Sutter St', level: 'medium' },
    { location: 'Post St', level: 'high' },
    { location: 'Geary St', level: 'medium' },
    { location: 'O\'Farrell St', level: 'high' },
    { location: 'Ellis St', level: 'low' },
    { location: 'Eddy St', level: 'medium' },
    { location: 'Turk St', level: 'low' },
    { location: 'Golden Gate', level: 'high' },
    { location: 'McAllister', level: 'medium' }
  ];

  // Activity feed variants (privacy-safe, no personal names)
  const activityVariants = [
    [
      { icon: '⚡', text: 'Neighbor sold 12.5 kWh to local buyer', time: '2m ago' },
      { icon: '👋', text: 'New household joined your community', time: '15m ago' },
      { icon: '🌱', text: 'Community saved 25 kg CO₂ today', time: '1h ago' },
      { icon: '📈', text: 'Oak Street reached weekly energy goal', time: '2h ago' },
      { icon: '⚡', text: 'Sunset District completed 50th trade', time: '3h ago' }
    ],
    [
      { icon: '🔄', text: 'Mission District traded 18.3 kWh', time: '1m ago' },
      { icon: '🏆', text: 'Castro District hit monthly milestone', time: '12m ago' },
      { icon: '🌿', text: 'Community prevented 15 kg emissions', time: '45m ago' },
      { icon: '📊', text: 'Richmond District topped daily leaderboard', time: '1.5h ago' },
      { icon: '⚡', text: 'Local neighbor shared 9.7 kWh surplus', time: '2.5h ago' }
    ],
    [
      { icon: '💚', text: 'Community achieved carbon reduction goal', time: '30s ago' },
      { icon: '🔋', text: 'Oak Street shared 22.1 kWh this hour', time: '8m ago' },
      { icon: '🎉', text: 'Pine Street welcomed 3 new households', time: '35m ago' },
      { icon: '📈', text: 'Weekly trading volume up 23%', time: '1.2h ago' },
      { icon: '🌱', text: 'Mission District saved $45 collectively', time: '2.8h ago' }
    ]
  ];

  const currentActivity = activityVariants[currentActivityVariant];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Energy Community</h1>
          <p className="text-lg text-gray-600">
            Connect with neighbors, track progress, and celebrate achievements together
          </p>
        </div>

        {/* KPI Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KpiStat
            title="Total kWh Traded"
            value={currentKpis.totalKwh.value}
            change={currentKpis.totalKwh.change}
            trend={currentKpis.totalKwh.trend as 'up' | 'down'}
            icon={TrendingUp}
            variant="default"
          />
          <KpiStat
            title="Active Neighbors"
            value={currentKpis.activeNeighbors.value}
            change={currentKpis.activeNeighbors.change}
            trend={currentKpis.activeNeighbors.trend as 'up' | 'down'}
            icon={Users}
            variant="default"
          />
          <KpiStat
            title="CO₂ Saved (kg)"
            value={currentKpis.co2Saved.value}
            change={currentKpis.co2Saved.change}
            trend={currentKpis.co2Saved.trend as 'up' | 'down'}
            icon={Leaf}
            variant="default"
          />
          <KpiStat
            title="Community Savings"
            value={currentKpis.communitySavings.value}
            change={currentKpis.communitySavings.change}
            trend={currentKpis.communitySavings.trend as 'up' | 'down'}
            icon={DollarSign}
            variant="default"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Leaderboard */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-[#FFB300]" />
                <h2 className="text-xl font-semibold">Neighborhood Leaderboard</h2>
              </div>
            </div>

            <Tabs
              tabs={timeframeTabs}
              activeTab={activeTimeTab}
              onTabChange={setActiveTimeTab}
              variant="default"
            />

            <div className="space-y-3 mt-6">
              {leaderboardData[activeTimeTab as keyof typeof leaderboardData].map((item) => (
                <LeaderboardRow
                  key={`${item.rank}-${item.name}`}
                  rank={item.rank}
                  name={item.name}
                  subtitle={item.subtitle}
                  value={item.value}
                  icon={item.icon}
                  variant="default"
                />
              ))}
            </div>
          </div>

          {/* Neighborhood Activity */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <MapPin className="w-5 h-5 text-[#2E7D32]" />
              <h2 className="text-xl font-semibold">Neighborhood Activity</h2>
            </div>

            <Tabs
              tabs={activityTabs}
              activeTab={activeActivityTab}
              onTabChange={setActiveActivityTab}
              variant="default"
            />

            <div className="mt-6">
              {activeActivityTab === 'heatmap' ? (
                <div>
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {heatMapData.map((cell, index) => (
                      <HeatMapCell
                        key={index}
                        location={cell.location}
                        level={cell.level as 'low' | 'medium' | 'high'}
                        variant="default"
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-100 rounded"></div>
                      <span className="text-gray-600">Low</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-300 rounded"></div>
                      <span className="text-gray-600">Medium</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <span className="text-gray-600">High</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {currentActivity.map((activity, index) => (
                    <ActivityItem
                      key={index}
                      icon={activity.icon}
                      text={activity.text}
                      time={activity.time}
                      variant="default"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Community Achievements */}
        <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Trophy className="w-5 h-5 text-[#FFB300]" />
            <h2 className="text-xl font-semibold">Community Progress</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="font-semibold mb-2">Carbon Neutral</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-[#2E7D32] h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-sm text-gray-600">75% to goal</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold mb-2">Energy Independence</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-[#FFB300] h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <p className="text-sm text-gray-600">60% to goal</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="font-semibold mb-2">Trading Champions</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
              <p className="text-sm text-gray-600">90% to goal</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="font-semibold mb-2">Global Impact</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <p className="text-sm text-gray-600">45% to goal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}