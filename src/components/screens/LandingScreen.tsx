import React from 'react';
import { AppButton } from '../design-system/AppButton';
import { Card } from '../ui/card';
import { Home, Zap, Users, DollarSign, Leaf, MapPin } from 'lucide-react';

interface LandingScreenProps {
  onJoinAsSeller: () => void;
  onJoinAsBuyer: () => void;
}

export function LandingScreen({ onJoinAsSeller, onJoinAsBuyer }: LandingScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="col-span-6 space-y-8">
              {/* Logo */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-[#2E7D32] rounded-2xl flex items-center justify-center shadow-lg">
                  <div className="flex space-x-1">
                    <Home className="w-7 h-7 text-white" />
                    <Zap className="w-7 h-7 text-[#FFB300]" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Neighbors, Not Utilities</h1>
                  <p className="text-lg text-gray-600">P2P Energy Trading Network</p>
                </div>
              </div>

              {/* Headline */}
              <div className="space-y-6">
                <h2 className="text-5xl font-bold text-gray-900 leading-tight">
                  Trade solar locally.<br />
                  <span className="text-[#2E7D32]">Keep the value</span> on your block.
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl">
                  Connect with neighbors to buy and sell solar energy directly. 
                  Get better prices than utilities while supporting local clean power.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex space-x-4">
                <AppButton 
                  variant="primary" 
                  size="lg"
                  icon={<Zap className="w-5 h-5" />}
                  onClick={onJoinAsSeller}
                  className="px-8 py-4"
                >
                  Join as Seller
                </AppButton>
                <AppButton 
                  variant="secondary" 
                  size="lg"
                  icon={<Home className="w-5 h-5" />}
                  onClick={onJoinAsBuyer}
                  className="px-8 py-4"
                >
                  Join as Buyer
                </AppButton>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 pt-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Verified neighbors only</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Automatic payments</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Privacy protected</span>
                </div>
              </div>
            </div>

            {/* Right Content - Map Stub */}
            <div className="col-span-6">
              <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
                <div className="aspect-square bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <div className="grid grid-cols-6 gap-2 p-4 h-full">
                      {Array.from({ length: 36 }).map((_, i) => (
                        <div key={i} className="bg-[#2E7D32] rounded opacity-30"></div>
                      ))}
                    </div>
                  </div>
                  <div className="relative z-10 text-center space-y-4">
                    <MapPin className="w-16 h-16 text-[#2E7D32] mx-auto" />
                    <div>
                      <p className="text-lg font-semibold text-gray-900">Your Neighborhood</p>
                      <p className="text-gray-600">Real-time energy trading network</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why choose peer-to-peer energy?</h3>
            <p className="text-xl text-gray-600">Better prices, cleaner energy, stronger communities</p>
          </div>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-4">
              <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <DollarSign className="w-8 h-8 text-[#2E7D32]" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Better Prices</h4>
                <p className="text-gray-600">
                  Sellers earn 2-3x more than utility rates. Buyers save 20-30% on electricity costs.
                </p>
              </Card>
            </div>

            <div className="col-span-4">
              <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Leaf className="w-8 h-8 text-[#2E7D32]" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Local Clean Energy</h4>
                <p className="text-gray-600">
                  Support renewable energy in your neighborhood. Reduce transmission losses and carbon footprint.
                </p>
              </Card>
            </div>

            <div className="col-span-4">
              <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-[#2E7D32]" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Community Building</h4>
                <p className="text-gray-600">
                  Connect with neighbors, build energy resilience, and create a more sustainable community.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-[#2E7D32] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-12 gap-8 text-center">
            <div className="col-span-3">
              <div className="text-4xl font-bold text-white mb-2">2,450+</div>
              <div className="text-green-100">Active Neighbors</div>
            </div>
            <div className="col-span-3">
              <div className="text-4xl font-bold text-white mb-2">156,000</div>
              <div className="text-green-100">kWh Traded Monthly</div>
            </div>
            <div className="col-span-3">
              <div className="text-4xl font-bold text-white mb-2">$47,200</div>
              <div className="text-green-100">Community Savings</div>
            </div>
            <div className="col-span-3">
              <div className="text-4xl font-bold text-white mb-2">89.2%</div>
              <div className="text-green-100">CO₂ Reduction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}