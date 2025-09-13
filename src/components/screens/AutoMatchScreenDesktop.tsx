import React, { useState } from 'react';
import { AppButton } from '../design-system/AppButton';
import { MetricCard } from '../design-system/MetricCard';
import { StatusPill } from '../design-system/StatusPill';
import { Card } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { EditPreferencesModal } from '../common/EditPreferencesModal';
import { Pause, Play, Edit, AlertTriangle, Zap, TrendingUp, DollarSign } from 'lucide-react';

interface AutoMatchScreenDesktopProps {
  role: 'seller' | 'buyer';
  onTradeClick: (trade: any) => void;
}

export function AutoMatchScreenDesktop({ role, onTradeClick }: AutoMatchScreenDesktopProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [showBudgetWarning, setShowBudgetWarning] = useState(false);
  const [showEditPreferences, setShowEditPreferences] = useState(false);
  const [currentPreferences, setCurrentPreferences] = useState({
    price: role === 'seller' ? 0.12 : 0.14,
    dailyLimit: role === 'seller' ? 10 : 5,
    sameBlockFirst: true,
    quietHours: true,
    batteryGuard: 20
  });

  const mockTrades = [
    { id: 1, neighbor: 'Alex M.', street: 'Maple St', kWh: 3.2, price: 0.12, status: 'matched' as const, time: '2 min ago' },
    { id: 2, neighbor: 'Priya K.', street: 'Oak Ave', kWh: 4.2, price: 0.13, status: 'executing' as const, time: '5 min ago' },
    { id: 3, neighbor: 'Chen L.', street: 'Birch Rd', kWh: 2.1, price: 0.14, status: 'matched' as const, time: '12 min ago' },
    { id: 4, neighbor: 'Sam R.', street: 'Pine Ct', kWh: 1.8, price: 0.13, status: 'executing' as const, time: '18 min ago' },
  ];

  const currentStatus = isPaused ? 'paused' : 'executing';

  // Simple sparkline component
  const Sparkline = () => (
    <svg width="80" height="40" viewBox="0 0 80 40" className="text-[#2E7D32]">
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        points="0,30 20,20 40,25 60,10 80,15"
      />
      <circle cx="80" cy="15" r="2" fill="currentColor" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Warning Banners */}
        {showBudgetWarning && (
          <Card className="p-4 bg-amber-50 border-amber-200 mb-6">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-amber-900">Monthly budget limit reached</p>
                <p className="text-sm text-amber-800">$150 / $150 spent this month. Trading paused until next month.</p>
              </div>
              <AppButton
                variant="tertiary"
                size="sm"
                onClick={() => setShowBudgetWarning(false)}
              >
                Dismiss
              </AppButton>
            </div>
          </Card>
        )}

        {/* Top Metrics Row */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Today matched"
            value="9.5 kWh"
            sparkline={<Sparkline />}
          />
          <MetricCard
            title={role === 'seller' ? 'Earned today' : 'Saved today'}
            value="$1.24"
          />
          <MetricCard
            title="Active trades"
            value="2"
          />
          <MetricCard
            title="This month"
            value={role === 'seller' ? '+$47.20' : '-$127.50'}
          />
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="col-span-8 space-y-6">
            {/* Status and Intent Card */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Zap className="w-6 h-6 text-[#2E7D32]" />
                  <h3 className="text-xl font-semibold text-gray-900">Auto-Trade Status</h3>
                </div>
                <StatusPill status={currentStatus}>
                  {isPaused ? 'Paused' : 'Active'}
                </StatusPill>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Current Intent</h4>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Role:</span> {role === 'seller' ? 'Selling excess solar' : 'Buying clean energy'}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Price:</span> {role === 'seller' ? `Min ${currentPreferences.price.toFixed(2)}/kWh` : `Max ${currentPreferences.price.toFixed(2)}/kWh`}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Daily cap:</span> {currentPreferences.dailyLimit} kWh
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Same block first:</span> {currentPreferences.sameBlockFirst ? 'ON' : 'OFF'}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Controls</h4>
                  <div className="space-y-3">
                    <AppButton
                      variant={isPaused ? "primary" : "secondary"}
                      size="sm"
                      icon={isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                      onClick={() => setIsPaused(!isPaused)}
                      className="w-full"
                    >
                      {isPaused ? 'Resume Trading' : 'Pause Trading'}
                    </AppButton>
                    <AppButton
                      variant="tertiary"
                      size="sm"
                      icon={<Edit className="w-4 h-4" />}
                      onClick={() => setShowEditPreferences(true)}
                      className="w-full"
                    >
                      Edit Preferences
                    </AppButton>
                  </div>
                </div>
              </div>
            </Card>

            {/* Live Matches Table */}
            <Card>
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">Live Matches</h3>
                <p className="text-sm text-gray-600 mt-1">Real-time energy trading with your neighbors</p>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Neighbor</TableHead>
                    <TableHead>Energy</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTrades.map((trade) => (
                    <TableRow 
                      key={trade.id} 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => onTradeClick(trade)}
                    >
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`/api/placeholder/32/32?text=${trade.neighbor[0]}`} />
                            <AvatarFallback>{trade.neighbor[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">{trade.neighbor}</p>
                            <p className="text-sm text-gray-500">{trade.street}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{trade.kWh} kWh</TableCell>
                      <TableCell>${trade.price.toFixed(2)}/kWh</TableCell>
                      <TableCell className="font-medium">${(trade.kWh * trade.price).toFixed(2)}</TableCell>
                      <TableCell>
                        <StatusPill status={trade.status}>
                          {trade.status.charAt(0).toUpperCase() + trade.status.slice(1)}
                        </StatusPill>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">{trade.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="col-span-4 space-y-6">
            {/* Today's Summary */}
            <Card className="p-6 bg-gradient-to-br from-[#2E7D32] to-green-600 text-white">
              <div className="flex items-center space-x-3 mb-4">
                {role === 'seller' ? <TrendingUp className="w-6 h-6" /> : <DollarSign className="w-6 h-6" />}
                <h4 className="font-semibold">Today's Performance</h4>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="opacity-90">Energy traded:</span>
                  <span className="font-semibold">9.5 kWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-90">
                    {role === 'seller' ? 'Revenue:' : 'Cost:'}
                  </span>
                  <span className="font-semibold">$1.24</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-90">vs Utility:</span>
                  <span className="font-semibold text-[#FFB300]">
                    {role === 'seller' ? '+$0.67' : '-$0.47'}
                  </span>
                </div>
                <div className="border-t border-green-400 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="opacity-90">CO₂ avoided:</span>
                    <span className="font-semibold">6.6 kg</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <AppButton variant="secondary" size="sm" className="w-full justify-start">
                  View monthly statement
                </AppButton>
                <AppButton variant="secondary" size="sm" className="w-full justify-start">
                  Export trade data
                </AppButton>
                <AppButton 
                  variant="tertiary" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => setShowBudgetWarning(!showBudgetWarning)}
                >
                  Test budget alert
                </AppButton>
              </div>
            </Card>

            {/* Neighbor Activity */}
            <Card className="p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Neighbor Activity</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Alex M. came online</span>
                  <span className="text-xs text-gray-400">5m ago</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">New solar install nearby</span>
                  <span className="text-xs text-gray-400">1h ago</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Price drop on Oak Ave</span>
                  <span className="text-xs text-gray-400">2h ago</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Edit Preferences Modal */}
      <EditPreferencesModal
        open={showEditPreferences}
        onOpenChange={setShowEditPreferences}
        role={role}
        currentPreferences={currentPreferences}
        onSave={(preferences) => {
          setCurrentPreferences(preferences);
        }}
      />
    </div>
  );
}