import React from 'react';
import { AppButton } from '../design-system/AppButton';
import { Card } from '../ui/card';
import { Home, Zap, Users, DollarSign, Leaf, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

interface HomeScreenProps {
  onJoinForFree: () => void;
}

export function HomeScreen({ onJoinForFree }: HomeScreenProps) {
  const steps = [
    {
      number: 1,
      title: 'Verify address',
      description: 'Confirm your location to connect with nearby neighbors',
      icon: <MapPin className="w-6 h-6" />
    },
    {
      number: 2,
      title: 'Set price/budget',
      description: 'Configure your trading preferences and daily limits',
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      number: 3,
      title: 'Auto-match',
      description: 'Our system automatically finds compatible neighbors',
      icon: <Zap className="w-6 h-6" />
    },
    {
      number: 4,
      title: 'Get receipts',
      description: 'Track all trades with detailed transaction history',
      icon: <CheckCircle className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 md:space-y-8 text-center lg:text-left">
              {/* Headline */}
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Trade solar locally.<br />
                  <span className="text-[#2E7D32]">Keep the value</span> on your block.
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
                  Connect with neighbors to buy and sell solar energy directly. 
                  Get better prices than utilities while supporting local clean power.
                </p>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <AppButton 
                  variant="primary" 
                  size="lg"
                  icon={<Zap className="w-5 h-5" />}
                  onClick={onJoinForFree}
                  className="px-8 py-4 text-lg"
                >
                  Join for Free
                </AppButton>
                
                {/* Helper Text */}
                <div className="flex items-center justify-center lg:justify-start mt-2 sm:mt-4">
                  <p className="text-sm text-gray-500">
                    💡 You can switch between Seller and Buyer later
                  </p>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6 pt-4 md:pt-6">
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

            {/* Right Content - Interactive Map */}
            <div className="order-first lg:order-last">
              <Card className="p-6 md:p-8 bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
                <div className="aspect-square bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <div className="grid grid-cols-6 gap-2 p-4 h-full">
                      {Array.from({ length: 36 }).map((_, i) => (
                        <div key={i} className="bg-[#2E7D32] rounded opacity-30"></div>
                      ))}
                    </div>
                  </div>
                  <div className="relative z-10 text-center space-y-4">
                    <MapPin className="w-12 md:w-16 h-12 md:h-16 text-[#2E7D32] mx-auto" />
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

      {/* How it Works Section */}
      <div className="bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How it works</h2>
            <p className="text-lg md:text-xl text-gray-600">Get started in minutes with our simple 4-step process</p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-200">
                  <div className="w-12 h-12 bg-[#2E7D32] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg font-bold text-white">{step.number}</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto text-[#2E7D32]">
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </Card>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why choose peer-to-peer energy?</h3>
            <p className="text-lg md:text-xl text-gray-600">Better prices, cleaner energy, stronger communities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <Card className="p-6 md:p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-8 h-8 text-[#2E7D32]" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Better Prices</h4>
              <p className="text-gray-600">
                Sellers earn 2-3x more than utility rates. Buyers save 20-30% on electricity costs.
              </p>
            </Card>

            <Card className="p-6 md:p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-8 h-8 text-[#2E7D32]" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Local Clean Energy</h4>
              <p className="text-gray-600">
                Support renewable energy in your neighborhood. Reduce transmission losses and carbon footprint.
              </p>
            </Card>

            <Card className="p-6 md:p-8 text-center hover:shadow-lg transition-shadow">
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

      {/* Stats Section */}
      <div className="bg-[#2E7D32] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">2,450+</div>
              <div className="text-green-100">Active Neighbors</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">156,000</div>
              <div className="text-green-100">kWh Traded Monthly</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">$47,200</div>
              <div className="text-green-100">Community Savings</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">89.2%</div>
              <div className="text-green-100">CO₂ Reduction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}