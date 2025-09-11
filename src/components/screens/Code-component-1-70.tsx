import React, { useState } from 'react';
import { AppButton } from '../design-system/AppButton';
import { AppBadge } from '../design-system/AppBadge';
import { ListItem } from '../design-system/ListItem';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ArrowLeft, Share, MapPin } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface CommunityScreenProps {
  onBack: () => void;
  onSettings: () => void;
}

export function CommunityScreen({ onBack, onSettings }: CommunityScreenProps) {
  const [inviteCode] = useState('MAPLE2024');

  const handleInvite = () => {
    navigator.clipboard?.writeText(`Join our neighborhood energy network! Use code ${inviteCode} at NeighborsNotUtilities.com`);
    toast.success("Invite link copied to clipboard");
  };

  const topSharers = [
    { name: 'Alex M.', street: 'Maple St', value: '47.2 kWh', badges: ['verified', 'top-sharer'] },
    { name: 'Priya K.', street: 'Oak Ave', value: '41.8 kWh', badges: ['verified', 'hoa'] },
    { name: 'Chen L.', street: 'Birch Rd', value: '38.5 kWh', badges: ['verified'] },
    { name: 'Sam R.', street: 'Pine Ct', value: '35.1 kWh', badges: ['verified'] },
    { name: 'Jamie D.', street: 'Cedar Ln', value: '29.3 kWh', badges: ['verified'] },
  ];

  const co2Leaders = [
    { name: 'Alex M.', street: 'Maple St', value: '32.6 kg', badges: ['verified', 'top-sharer'] },
    { name: 'Chen L.', street: 'Birch Rd', value: '28.4 kg', badges: ['verified'] },
    { name: 'Priya K.', street: 'Oak Ave', value: '25.1 kg', badges: ['verified', 'hoa'] },
    { name: 'Sam R.', street: 'Pine Ct', value: '21.8 kg', badges: ['verified'] },
    { name: 'Jamie D.', street: 'Cedar Ln', value: '18.2 kg', badges: ['verified'] },
  ];

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
          <h1 className="font-semibold text-gray-900">Community</h1>
          <button
            onClick={onSettings}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100"
          >
            <MapPin className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Neighborhood Goal */}
        <Card className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">This week's goal</h3>
              <span className="text-sm font-medium text-green-600">67%</span>
            </div>
            <p className="text-sm text-gray-600">Share 500 kWh locally</p>
            <Progress value={67} className="h-2" />
            <p className="text-xs text-gray-500">335 kWh shared so far</p>
          </div>
        </Card>

        {/* Leaderboards */}
        <Card className="overflow-hidden">
          <Tabs defaultValue="sharers" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="sharers" className="flex-1">Top Sharers</TabsTrigger>
              <TabsTrigger value="co2" className="flex-1">CO₂ Saved</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sharers" className="mt-0">
              <div className="divide-y divide-gray-200">
                {topSharers.map((person, index) => (
                  <div key={person.name} className="flex items-center p-4 space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#2E7D32] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-gray-900">{person.name}</p>
                        {person.badges.map((badge) => (
                          <AppBadge key={badge} variant={badge as any} className="text-xs">
                            {badge === 'verified' ? '✓' : badge === 'hoa' ? 'HOA' : '⭐'}
                          </AppBadge>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">{person.street}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{person.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="co2" className="mt-0">
              <div className="divide-y divide-gray-200">
                {co2Leaders.map((person, index) => (
                  <div key={person.name} className="flex items-center p-4 space-x-3">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-gray-900">{person.name}</p>
                        {person.badges.map((badge) => (
                          <AppBadge key={badge} variant={badge as any} className="text-xs">
                            {badge === 'verified' ? '✓' : badge === 'hoa' ? 'HOA' : '⭐'}
                          </AppBadge>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">{person.street}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{person.value}</p>
                      <p className="text-xs text-gray-500">CO₂ saved</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Invite Section */}
        <Card className="p-4 space-y-4">
          <h3 className="font-semibold text-gray-900">Invite a neighbor</h3>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Your invite code:</p>
            <p className="font-mono text-lg font-semibold text-[#2E7D32]">{inviteCode}</p>
          </div>
          <AppButton
            variant="secondary"
            icon={<Share className="w-4 h-4" />}
            onClick={handleInvite}
            className="w-full"
          >
            Share invite link
          </AppButton>
        </Card>

        {/* Neighborhood Map Stub */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Neighborhood map</h3>
          <div className="bg-gray-100 rounded-lg h-40 flex items-center justify-center">
            <div className="text-center space-y-2">
              <MapPin className="w-8 h-8 text-gray-400 mx-auto" />
              <p className="text-sm text-gray-500">Interactive map coming soon</p>
              <p className="text-xs text-gray-400">See active traders in your area</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}