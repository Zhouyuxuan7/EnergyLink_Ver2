import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Leaf, DollarSign, Trophy, MapPin, BarChart3, Target } from 'lucide-react';
import { KpiStat } from '../stock/KpiStat';
import { Tabs } from '../stock/Tabs';
import { LeaderboardRow } from '../stock/LeaderboardRow';
import { HeatMapCell } from '../stock/HeatMapCell';
import { ActivityItem } from '../stock/ActivityItem';
import { AchievementCard } from '../stock/AchievementCard';

interface PrivateCommunityScreenProps {
  autoTradeEnabled?: boolean;
  isDarkMode?: boolean;
}

export function PrivateCommunityScreen({ 
  autoTradeEnabled = true, 
  isDarkMode = true 
}: PrivateCommunityScreenProps) {
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
      communitySavings: { value: '$2,340', change: '+$180 this week', trend: 'up' },
      avgPrice: { value: '$0.18', change: '-5% this month', trend: 'down' },
      avgSavings: { value: '$47', change: '+12% per user', trend: 'up' }
    },
    {
      totalKwh: { value: '1,251', change: '+16% this month', trend: 'up' },
      activeNeighbors: { value: '158', change: '+10 this week', trend: 'up' },
      co2Saved: { value: '895', change: '+123 this month', trend: 'up' },
      communitySavings: { value: '$2,355', change: '+$195 this week', trend: 'up' },
      avgPrice: { value: '$0.17', change: '-6% this month', trend: 'down' },
      avgSavings: { value: '$49', change: '+14% per user', trend: 'up' }
    },
    {
      totalKwh: { value: '1,255', change: '+17% this month', trend: 'up' },
      activeNeighbors: { value: '159', change: '+11 this week', trend: 'up' },
      co2Saved: { value: '898', change: '+125 this month', trend: 'up' },
      communitySavings: { value: '$2,370', change: '+$210 this week', trend: 'up' },
      avgPrice: { value: '$0.16', change: '-7% this month', trend: 'down' },
      avgSavings: { value: '$51', change: '+16% per user', trend: 'up' }
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

  // Energy Champions leaderboard with names
  const leaderboardData = {
    month: [
      { rank: 1, name: 'Sarah Miller', subtitle: 'Oak Street', value: '247 kWh', icon: '🏆' },
      { rank: 2, name: 'James Rodriguez', subtitle: 'Sunset District', value: '198 kWh', icon: '🥈' },
      { rank: 3, name: 'Lisa Park', subtitle: 'Mission District', value: '156 kWh', icon: '🥉' },
      { rank: 4, name: 'David Chen', subtitle: 'Castro District', value: '134 kWh', icon: '📍' },
      { rank: 5, name: 'You', subtitle: 'Mission District', value: '127 kWh', icon: '📍' }
    ],
    week: [
      { rank: 1, name: 'Lisa Park', subtitle: 'Mission District', value: '67 kWh', icon: '🏆' },
      { rank: 2, name: 'Sarah Miller', subtitle: 'Oak Street', value: '54 kWh', icon: '🥈' },
      { rank: 3, name: 'You', subtitle: 'Mission District', value: '45 kWh', icon: '🥉' },
      { rank: 4, name: 'David Chen', subtitle: 'Castro District', value: '38 kWh', icon: '📍' },
      { rank: 5, name: 'James Rodriguez', subtitle: 'Sunset District', value: '32 kWh', icon: '📍' }
    ],
    all: [
      { rank: 1, name: 'Sarah Miller', subtitle: 'Oak Street', value: '1,847 kWh', icon: '🏆' },
      { rank: 2, name: 'James Rodriguez', subtitle: 'Sunset District', value: '1,492 kWh', icon: '🥈' },
      { rank: 3, name: 'Lisa Park', subtitle: 'Mission District', value: '1,234 kWh', icon: '🥉' },
      { rank: 4, name: 'David Chen', subtitle: 'Castro District', value: '1,023 kWh', icon: '📍' },
      { rank: 5, name: 'You', subtitle: 'Mission District', value: '887 kWh', icon: '📍' }
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

  // Activity feed variants with named users
  const activityVariants = [
    [
      { icon: '🔄⚡', text: 'Sarah Miller sold 12.5 kWh to James Rodriguez', time: '2 minutes ago' },
      { icon: '🏆', text: 'Lisa Park reached 100 kWh milestone this month!', time: '15 minutes ago' },
      { icon: '🌱', text: 'Community saved 50 kg CO₂ today', time: '1 hour ago' },
      { icon: '👋', text: 'David Chen joined EnergyLink', time: '2 hours ago' },
      { icon: '⚡', text: 'You bought 8.2 kWh from Sarah Miller', time: '3 hours ago' }
    ],
    [
      { icon: '💚', text: 'James Rodriguez achieved Energy Saver badge', time: '1 minute ago' },
      { icon: '🔋', text: 'You sold 15.7 kWh to Lisa Park', time: '12 minutes ago' },
      { icon: '🎉', text: 'Oak Street hit weekly community goal', time: '45 minutes ago' },
      { icon: '📈', text: 'David Chen completed 25th successful trade', time: '1.5 hours ago' },
      { icon: '🌿', text: 'Mission District prevented 30 kg emissions', time: '2.5 hours ago' }
    ],
    [
      { icon: '⚡💫', text: 'Lisa Park shared 22.1 kWh surplus', time: '30 seconds ago' },
      { icon: '🏅', text: 'You unlocked Community Champion badge', time: '8 minutes ago' },
      { icon: '🔄', text: 'Sarah Miller and David Chen completed trade', time: '35 minutes ago' },
      { icon: '📊', text: 'Castro District topped daily leaderboard', time: '1.2 hours ago' },
      { icon: '💰', text: 'Sunset District saved $127 collectively', time: '2.8 hours ago' }
    ]
  ];

  const currentActivity = activityVariants[currentActivityVariant];

  const achievements = [
    {
      id: 'green-pioneer',
      title: 'Green Pioneer',
      description: 'First 100 kWh traded',
      icon: '🌱',
      progress: 100,
      unlocked: true
    },
    {
      id: 'power-trader',
      title: 'Power Trader',
      description: '50 successful trades',
      icon: '⚡',
      progress: 100,
      unlocked: true
    },
    {
      id: 'community-champion',
      title: 'Community Champion',
      description: 'Top 3 in monthly leaderboard',
      icon: '🏆',
      progress: 60,
      unlocked: false
    },
    {
      id: 'eco-warrior',
      title: 'Eco Warrior',
      description: 'Save 500 kg CO₂',
      icon: '🌍',
      progress: 35,
      unlocked: false
    }
  ];

  const bgClass = isDarkMode ? 'bg-[#0B0F14]' : 'bg-gray-50';
  const cardClass = isDarkMode ? 'bg-[#121820] border-[#262626]' : 'bg-white border-gray-200';
  const textPrimaryClass = isDarkMode ? 'text-[#f8fafc]' : 'text-gray-900';
  const textSecondaryClass = isDarkMode ? 'text-[#64748b]' : 'text-gray-600';

  return (
    <div className={`min-h-screen ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${textPrimaryClass} mb-2`}>Community</h1>
          <p className={`text-lg ${textSecondaryClass}`}>
            Your energy trading community with rich insights and achievements
          </p>
          {!autoTradeEnabled && (
            <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-gray-500/20 text-gray-400 text-sm">
              <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
              Auto-Trade Paused
            </div>
          )}
        </div>

        {/* KPI Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KpiStat
            title="Total kWh Traded"
            value={currentKpis.totalKwh.value}
            change={currentKpis.totalKwh.change}
            trend={currentKpis.totalKwh.trend as 'up' | 'down'}
            icon={TrendingUp}
            variant={isDarkMode ? 'dark' : 'default'}
          />
          <KpiStat
            title="Active Neighbors"
            value={currentKpis.activeNeighbors.value}
            change={currentKpis.activeNeighbors.change}
            trend={currentKpis.activeNeighbors.trend as 'up' | 'down'}
            icon={Users}
            variant={isDarkMode ? 'dark' : 'default'}
          />
          <KpiStat
            title="CO₂ Saved (kg)"
            value={currentKpis.co2Saved.value}
            change={currentKpis.co2Saved.change}
            trend={currentKpis.co2Saved.trend as 'up' | 'down'}
            icon={Leaf}
            variant={isDarkMode ? 'dark' : 'default'}
          />
          <KpiStat
            title="Community Savings"
            value={currentKpis.communitySavings.value}
            change={currentKpis.communitySavings.change}
            trend={currentKpis.communitySavings.trend as 'up' | 'down'}
            icon={DollarSign}
            variant={isDarkMode ? 'dark' : 'default'}
          />
        </div>

        {/* Secondary KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <KpiStat
            title="Avg Clear Price"
            value={currentKpis.avgPrice.value}
            change={currentKpis.avgPrice.change}
            trend={currentKpis.avgPrice.trend as 'up' | 'down'}
            icon={BarChart3}
            variant={isDarkMode ? 'dark' : 'default'}
          />
          <KpiStat
            title="Avg Savings/User"
            value={currentKpis.avgSavings.value}
            change={currentKpis.avgSavings.change}
            trend={currentKpis.avgSavings.trend as 'up' | 'down'}
            icon={Target}
            variant={isDarkMode ? 'dark' : 'default'}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Energy Champions */}
          <div className={`${cardClass} rounded-xl border p-6`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-[#FFB300]" />
                <h2 className={`text-xl font-semibold ${textPrimaryClass}`}>Energy Champions</h2>
              </div>
            </div>

            <Tabs
              tabs={timeframeTabs}
              activeTab={activeTimeTab}
              onTabChange={setActiveTimeTab}
              variant={isDarkMode ? 'dark' : 'default'}
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
                  variant={isDarkMode ? 'dark' : 'default'}
                />
              ))}
            </div>
          </div>

          {/* Neighborhood Activity */}
          <div className={`${cardClass} rounded-xl border p-6`}>
            <div className="flex items-center space-x-2 mb-6">
              <MapPin className="w-5 h-5 text-[#2E7D32]" />
              <h2 className={`text-xl font-semibold ${textPrimaryClass}`}>Neighborhood Activity</h2>
            </div>

            <Tabs
              tabs={activityTabs}
              activeTab={activeActivityTab}
              onTabChange={setActiveActivityTab}
              variant={isDarkMode ? 'dark' : 'default'}
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
                        variant={isDarkMode ? 'dark' : 'default'}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-100 rounded"></div>
                      <span className={textSecondaryClass}>Low</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-300 rounded"></div>
                      <span className={textSecondaryClass}>Medium</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <span className={textSecondaryClass}>High</span>
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
                      variant={isDarkMode ? 'dark' : 'default'}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Community Achievements */}
        <div className={`${cardClass} rounded-xl border p-6`}>
          <div className="flex items-center space-x-2 mb-6">
            <Trophy className="w-5 h-5 text-[#FFB300]" />
            <h2 className={`text-xl font-semibold ${textPrimaryClass}`}>Community Achievements</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                title={achievement.title}
                description={achievement.description}
                icon={achievement.icon}
                progress={achievement.progress}
                unlocked={achievement.unlocked}
                variant={isDarkMode ? 'dark' : 'default'}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}