import React, { useState } from 'react';
import { AppButton } from '../design-system/AppButton';
import { AppBadge } from '../design-system/AppBadge';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Share, MapPin, Target, Users, Zap, Leaf, TrendingUp } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface CommunityScreenDesktopProps {
  // No props needed for this component
}

export function CommunityScreenDesktop({}: CommunityScreenDesktopProps) {
  const [inviteCode] = useState('MAPLE2024');

  const handleInvite = () => {
    navigator.clipboard?.writeText(`Join our neighborhood energy network! Use code ${inviteCode} at NeighborsNotUtilities.com`);
    toast.success("Invite link copied to clipboard");
  };

  const topSharers = [
    { name: 'Alex M.', street: 'Maple St', value: '47.2', unit: 'kWh', badges: ['verified', 'top-sharer'], avatar: 'A' },
    { name: 'Priya K.', street: 'Oak Ave', value: '41.8', unit: 'kWh', badges: ['verified', 'hoa'], avatar: 'P' },
    { name: 'Chen L.', street: 'Birch Rd', value: '38.5', unit: 'kWh', badges: ['verified'], avatar: 'C' },
    { name: 'Sam R.', street: 'Pine Ct', value: '35.1', unit: 'kWh', badges: ['verified'], avatar: 'S' },
    { name: 'Jamie D.', street: 'Cedar Ln', value: '29.3', unit: 'kWh', badges: ['verified'], avatar: 'J' },
    { name: 'Maria G.', street: 'Elm St', value: '27.8', unit: 'kWh', badges: ['verified'], avatar: 'M' },
    { name: 'David H.', street: 'Willow Ave', value: '24.6', unit: 'kWh', badges: ['verified'], avatar: 'D' },
  ];

  const co2Leaders = [
    { name: 'Alex M.', street: 'Maple St', value: '32.6', unit: 'kg CO₂', badges: ['verified', 'top-sharer'], avatar: 'A' },
    { name: 'Chen L.', street: 'Birch Rd', value: '28.4', unit: 'kg CO₂', badges: ['verified'], avatar: 'C' },
    { name: 'Priya K.', street: 'Oak Ave', value: '25.1', unit: 'kg CO₂', badges: ['verified', 'hoa'], avatar: 'P' },
    { name: 'Sam R.', street: 'Pine Ct', value: '21.8', unit: 'kg CO₂', badges: ['verified'], avatar: 'S' },
    { name: 'Jamie D.', street: 'Cedar Ln', value: '18.2', unit: 'kg CO₂', badges: ['verified'], avatar: 'J' },
    { name: 'Maria G.', street: 'Elm St', value: '16.9', unit: 'kg CO₂', badges: ['verified'], avatar: 'M' },
    { name: 'David H.', street: 'Willow Ave', value: '14.3', unit: 'kg CO₂', badges: ['verified'], avatar: 'D' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Dashboard</h1>
          <p className="text-lg text-gray-600">Connect with neighbors and track our collective impact</p>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="col-span-8 space-y-8">
            {/* Neighborhood Goal */}
            <Card className="p-8 bg-gradient-to-r from-green-50 via-blue-50 to-green-50 border-green-200">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-[#2E7D32] rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Weekly Community Goal</h3>
                  <p className="text-gray-600">Share 500 kWh locally this week</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#2E7D32]">335</div>
                  <div className="text-sm text-gray-600">kWh shared</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#2E7D32]">165</div>
                  <div className="text-sm text-gray-600">kWh remaining</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#2E7D32]">67%</div>
                  <div className="text-sm text-gray-600">complete</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#2E7D32]">2</div>
                  <div className="text-sm text-gray-600">days left</div>
                </div>
              </div>

              <Progress value={67} className="h-4 mb-4" />
              
              <div className="flex items-center justify-between">
                <p className="text-gray-600">
                  Great progress! We're ahead of schedule to reach our goal.
                </p>
                <div className="flex items-center space-x-2 text-green-600">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-medium">On track</span>
                </div>
              </div>
            </Card>

            {/* Leaderboards */}
            <Card>
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">Community Leaderboards</h3>
                <p className="text-sm text-gray-600 mt-1">Celebrate our most active community members</p>
              </div>

              <Tabs defaultValue="sharers" className="w-full">
                <TabsList className="w-full justify-start p-6 pb-0 bg-transparent">
                  <TabsTrigger value="sharers" className="flex items-center space-x-2">
                    <Zap className="w-4 h-4" />
                    <span>Top Sharers</span>
                  </TabsTrigger>
                  <TabsTrigger value="co2" className="flex items-center space-x-2">
                    <Leaf className="w-4 h-4" />
                    <span>CO₂ Champions</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="sharers" className="mt-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>Neighbor</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Energy Shared</TableHead>
                        <TableHead>Badges</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topSharers.map((person, index) => (
                        <TableRow key={person.name}>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                                index === 0 ? 'bg-yellow-500' : 
                                index === 1 ? 'bg-gray-400' : 
                                index === 2 ? 'bg-amber-600' : 
                                'bg-[#2E7D32]'
                              }`}>
                                {index + 1}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={`/api/placeholder/40/40?text=${person.avatar}`} />
                                <AvatarFallback>{person.avatar}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium text-gray-900">{person.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-600">{person.street}</TableCell>
                          <TableCell>
                            <span className="font-semibold text-[#2E7D32]">{person.value} {person.unit}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              {person.badges.map((badge) => (
                                <AppBadge key={badge} variant={badge as any} className="text-xs">
                                  {badge === 'verified' ? '✓' : badge === 'hoa' ? 'HOA' : '⭐'}
                                </AppBadge>
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="co2" className="mt-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>Neighbor</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>CO₂ Avoided</TableHead>
                        <TableHead>Badges</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {co2Leaders.map((person, index) => (
                        <TableRow key={person.name}>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                                index === 0 ? 'bg-yellow-500' : 
                                index === 1 ? 'bg-gray-400' : 
                                index === 2 ? 'bg-amber-600' : 
                                'bg-blue-600'
                              }`}>
                                {index + 1}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={`/api/placeholder/40/40?text=${person.avatar}`} />
                                <AvatarFallback>{person.avatar}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium text-gray-900">{person.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-600">{person.street}</TableCell>
                          <TableCell>
                            <span className="font-semibold text-blue-600">{person.value}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              {person.badges.map((badge) => (
                                <AppBadge key={badge} variant={badge as any} className="text-xs">
                                  {badge === 'verified' ? '✓' : badge === 'hoa' ? 'HOA' : '⭐'}
                                </AppBadge>
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="col-span-4 space-y-6">
            {/* Invite Neighbors */}
            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="w-6 h-6 text-[#2E7D32]" />
                <h4 className="font-semibold text-gray-900">Invite Neighbors</h4>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                Help grow our community! Invite neighbors to join the energy trading network.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-600 mb-2">Your invite code:</p>
                <p className="font-mono text-lg font-bold text-[#2E7D32]">{inviteCode}</p>
              </div>

              <AppButton
                variant="primary"
                icon={<Share className="w-4 h-4" />}
                onClick={handleInvite}
                className="w-full"
              >
                Share Invite Link
              </AppButton>
            </Card>

            {/* Community Stats */}
            <Card className="p-6 bg-gradient-to-br from-[#2E7D32] to-green-600 text-white">
              <h4 className="font-semibold mb-4 flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Community Impact</span>
              </h4>
              
              <div className="space-y-4">
                <div>
                  <div className="text-2xl font-bold">2,450+</div>
                  <div className="text-sm opacity-90">Active neighbors</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">156,000</div>
                  <div className="text-sm opacity-90">kWh traded monthly</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">$47,200</div>
                  <div className="text-sm opacity-90">Community savings</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">89.2 tons</div>
                  <div className="text-sm opacity-90">CO₂ avoided</div>
                </div>
              </div>
            </Card>

            {/* Neighborhood Map */}
            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <MapPin className="w-6 h-6 text-[#2E7D32]" />
                <h4 className="font-semibold text-gray-900">Neighborhood Map</h4>
              </div>

              <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-xl h-48 flex items-center justify-center relative overflow-hidden">
                {/* Map Grid Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="grid grid-cols-6 gap-2 p-4 h-full">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`rounded ${
                          [5, 11, 18, 23, 29, 31].includes(i) 
                            ? 'bg-[#2E7D32]' 
                            : [7, 14, 20, 26].includes(i)
                            ? 'bg-blue-500'
                            : 'bg-gray-300'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Center Content */}
                <div className="relative z-10 text-center space-y-2">
                  <MapPin className="w-8 h-8 text-[#2E7D32] mx-auto" />
                  <div>
                    <p className="font-medium text-gray-900">Interactive map</p>
                    <p className="text-sm text-gray-600">Coming soon</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-3 text-center">
                Green = Solar homes • Blue = Buyers • Gray = Not connected
              </p>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Recent Activity</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">New solar install on Oak Ave</span>
                  <span className="text-xs text-gray-400">2h ago</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Community goal 67% complete</span>
                  <span className="text-xs text-gray-400">4h ago</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">3 new neighbors joined</span>
                  <span className="text-xs text-gray-400">1d ago</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Weekly goal achieved!</span>
                  <span className="text-xs text-gray-400">1w ago</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}