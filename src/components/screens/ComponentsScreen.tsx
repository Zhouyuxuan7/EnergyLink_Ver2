import React, { useState } from 'react';
import { KpiStat } from '../stock/KpiStat';
import { KBarChart } from '../stock/KBarChart';
import { LiveTransactionsList } from '../stock/LiveTransactionsList';
import { TradePanel } from '../stock/TradePanel';
import { LeaderboardRow } from '../stock/LeaderboardRow';
import { HeatMapCell } from '../stock/HeatMapCell';
import { ActivityItem } from '../stock/ActivityItem';
import { AchievementCard } from '../stock/AchievementCard';
import { Tabs } from '../stock/Tabs';

export function ComponentsScreen() {
  const [chartTimeframe, setChartTimeframe] = useState<'24H' | '7D' | '30D'>('24H');
  const [transactionFilter, setTransactionFilter] = useState<'ALL' | 'EXECUTING' | 'SETTLED'>('ALL');
  const [activeTab, setActiveTab] = useState('tab1');

  const tabItems = [
    { id: 'tab1', label: 'Components' },
    { id: 'tab2', label: 'Variants' },
    { id: 'tab3', label: 'Examples' }
  ];

  const mockTransactions = [
    { id: '1', time: '14:32', neighbor: 'Sarah M.', side: 'BUY' as const, quantity: '5.2 kWh', price: '$0.145', status: 'EXECUTING' as const },
    { id: '2', time: '14:28', neighbor: 'James R.', side: 'SELL' as const, quantity: '3.8 kWh', price: '$0.152', status: 'SETTLED' as const },
    { id: '3', time: '14:25', neighbor: 'Lisa P.', side: 'BUY' as const, quantity: '7.1 kWh', price: '$0.148', status: 'SETTLED' as const }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0b] p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#f8fafc] mb-2">EnergyLink Components</h1>
          <p className="text-[#64748b]">Stock-terminal themed component library</p>
        </div>

        {/* Navigation */}
        <Tabs
          items={tabItems}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className="mb-8"
        />

        {/* KPI Stats */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-[#f8fafc] mb-6">KPI Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KpiStat
              title="TOTAL ENERGY TRADED"
              value="1,247 kWh"
              change="+15% this month"
              trend="up"
            />
            <KpiStat
              title="ACTIVE NEIGHBORS"
              value="24"
              change="+8 this week"
              trend="up"
            />
            <KpiStat
              title="COMMUNITY SAVINGS"
              value="$2,840"
              change="-2.1% this week"
              trend="down"
            />
            <KpiStat
              title="CO₂ SAVED"
              value="156 kg"
              change="No change"
              trend="neutral"
            />
          </div>
        </section>

        {/* Chart Component */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-[#f8fafc] mb-6">K-Bar Chart</h2>
          <div className="max-w-4xl">
            <KBarChart
              title="Auto-Match Status"
              timeframe={chartTimeframe}
              onTimeframeChange={setChartTimeframe}
              currentPrice="$0.149"
              priceChange="+$0.008"
              priceChangePercent="+5.7%"
              variant="state_1"
            />
          </div>
        </section>

        {/* Transactions and Trade Panel */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-[#f8fafc] mb-6">Trading Components</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LiveTransactionsList
              transactions={mockTransactions}
              filter={transactionFilter}
              onFilterChange={setTransactionFilter}
              variant="v1"
            />
            <TradePanel role="buyer" />
          </div>
        </section>

        {/* Leaderboard */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-[#f8fafc] mb-6">Leaderboard</h2>
          <div className="max-w-2xl space-y-3">
            <LeaderboardRow
              rank={1}
              name="Sarah Miller"
              neighborhood="Oak Street"
              metric="247 kWh TRADED"
            />
            <LeaderboardRow
              rank={2}
              name="James Rodriguez"
              neighborhood="Sunset District"
              metric="198 kWh TRADED"
            />
            <LeaderboardRow
              rank={5}
              name="You"
              neighborhood="Mission District"
              metric="127 kWh TRADED"
              isCurrentUser
            />
          </div>
        </section>

        {/* Heat Map */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-[#f8fafc] mb-6">Heat Map Cells</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl">
            <HeatMapCell activity="high" neighborhood="Mission" value="18.2 kWh" />
            <HeatMapCell activity="medium" neighborhood="Castro" value="12.1 kWh" />
            <HeatMapCell activity="low" neighborhood="Marina" value="5.3 kWh" />
            <HeatMapCell activity="high" neighborhood="SOMA" value="16.8 kWh" />
            <HeatMapCell activity="medium" neighborhood="Sunset" value="9.7 kWh" />
            <HeatMapCell activity="low" neighborhood="Haight" value="3.8 kWh" />
          </div>
        </section>

        {/* Activity Items */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-[#f8fafc] mb-6">Activity Feed</h2>
          <div className="max-w-2xl space-y-3">
            <ActivityItem
              icon="🔄⚡"
              text="Sarah Miller sold 12.5 kWh to James Rodriguez"
              timestamp="2 minutes ago"
              type="trade"
            />
            <ActivityItem
              icon="🏆"
              text="Lisa Park reached 100 kWh milestone this month!"
              timestamp="15 minutes ago"
              type="milestone"
            />
            <ActivityItem
              icon="🌱"
              text="Community saved 50 kg CO₂ today"
              timestamp="1 hour ago"
              type="community"
            />
            <ActivityItem
              icon="👋"
              text="David Chen joined EnergyLink"
              timestamp="2 hours ago"
              type="user"
            />
          </div>
        </section>

        {/* Achievement Cards */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-[#f8fafc] mb-6">Achievement Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AchievementCard
              icon="🌱"
              title="Green Pioneer"
              subtitle="First 100 kWh traded"
              progress={100}
              isCompleted
            />
            <AchievementCard
              icon="⚡"
              title="Power Trader"
              subtitle="50 successful trades"
              progress={100}
              isCompleted
            />
            <AchievementCard
              icon="🏆"
              title="Community Champion"
              subtitle="Top 3 in monthly leaderboard"
              progress={60}
            />
            <AchievementCard
              icon="🌍"
              title="Eco Warrior"
              subtitle="Save 500 kg CO₂"
              progress={35}
            />
          </div>
        </section>

        {/* Tabs Component */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-[#f8fafc] mb-6">Tab Components</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-[#f8fafc] mb-4">Default Tabs</h3>
              <Tabs
                items={[
                  { id: 'home', label: 'Home' },
                  { id: 'dashboard', label: 'Dashboard' },
                  { id: 'settings', label: 'Settings' }
                ]}
                activeTab="dashboard"
                onTabChange={() => {}}
              />
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-[#f8fafc] mb-4">Segmented Tabs</h3>
              <div className="max-w-md">
                <Tabs
                  items={[
                    { id: 'month', label: 'This Month' },
                    { id: 'week', label: 'This Week' },
                    { id: 'all', label: 'All Time' }
                  ]}
                  activeTab="month"
                  onTabChange={() => {}}
                  variant="segmented"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}