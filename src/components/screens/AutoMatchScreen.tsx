import React, { useState } from 'react';
import { AppButton } from '../design-system/AppButton';
import { MetricCard } from '../design-system/MetricCard';
import { StatusPill } from '../design-system/StatusPill';
import { ListItem } from '../design-system/ListItem';
import { Card } from '../ui/card';
import { ArrowLeft, Pause, Play, Edit, AlertTriangle } from 'lucide-react';

interface AutoMatchScreenProps {
  role: 'seller' | 'buyer';
  onBack: () => void;
  onTradeClick: (trade: any) => void;
  onSettings: () => void;
  onCommunity: () => void;
}

export function AutoMatchScreen({ role, onBack, onTradeClick, onSettings, onCommunity }: AutoMatchScreenProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [showBudgetWarning, setShowBudgetWarning] = useState(false);

  const mockTrades = [
    { id: 1, neighbor: 'Alex', street: 'Maple St', kWh: 3.2, price: 0.12, status: 'matched' as const },
    { id: 2, neighbor: 'Priya', street: 'Oak Ave', kWh: 4.2, price: 0.13, status: 'executing' as const },
    { id: 3, neighbor: 'Chen', street: 'Birch Rd', kWh: 2.1, price: 0.14, status: 'matched' as const },
  ];

  const currentStatus = isPaused ? 'paused' : 'executing';

  // Simple sparkline component
  const Sparkline = () => (
    <svg width="64" height="32" viewBox="0 0 64 32" className="text-green-600">
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        points="0,24 16,16 32,20 48,8 64,12"
      />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-semibold text-gray-900">Auto-Match</h1>
          <button
            onClick={onSettings}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100"
          >
            <Edit className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Error/Warning Banners */}
        {showBudgetWarning && (
          <Card className="p-4 bg-amber-50 border-amber-200">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-900">Budget reached</p>
                <p className="text-sm text-amber-800">$30 / $30 monthly limit</p>
              </div>
            </div>
          </Card>
        )}

        {/* Metric Cards */}
        <div className="grid grid-cols-2 gap-4">
          <MetricCard
            title="Today matched"
            value="9.5 kWh"
            sparkline={<Sparkline />}
          />
          <MetricCard
            title={role === 'seller' ? 'Earned today' : 'Saved today'}
            value="$1.24"
          />
        </div>

        {/* Status and Intent */}
        <Card className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Status</h3>
            <StatusPill status={currentStatus}>
              {isPaused ? 'Paused' : 'Active'}
            </StatusPill>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">My Intent</h4>
            <p className="text-sm text-gray-600">
              {role === 'seller' 
                ? 'Sell extra until sunset • Min $0.12 • Cap 10 kWh • Same block ON'
                : 'Buy under $0.14 • Cap 5 kWh • Same block ON'
              }
            </p>
          </div>

          <div className="flex space-x-3">
            <AppButton
              variant={isPaused ? "primary" : "secondary"}
              size="sm"
              icon={isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              onClick={() => setIsPaused(!isPaused)}
              className="flex-1"
            >
              {isPaused ? 'Resume' : 'Pause'}
            </AppButton>
            <AppButton
              variant="tertiary"
              size="sm"
              onClick={onSettings}
              className="flex-1"
            >
              Edit intent
            </AppButton>
          </div>
        </Card>

        {/* Live Matches */}
        <Card className="overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Live Matches</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {mockTrades.map((trade) => (
              <ListItem
                key={trade.id}
                title={trade.neighbor}
                subtitle={trade.street}
                rightValue={`${trade.kWh} kWh`}
                rightSubtext={`$${trade.price}/kWh`}
                onClick={() => onTradeClick(trade)}
              />
            ))}
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex space-x-3">
          <AppButton
            variant="secondary"
            onClick={onCommunity}
            className="flex-1"
          >
            Community
          </AppButton>
          <AppButton
            variant="tertiary"
            onClick={() => setShowBudgetWarning(!showBudgetWarning)}
            className="flex-1"
          >
            Test Alert
          </AppButton>
        </div>
      </div>
    </div>
  );
}