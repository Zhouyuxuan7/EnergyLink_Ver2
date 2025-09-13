import React, { useState } from 'react';
import { AppButton } from '../design-system/AppButton';
import { Card } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { 
  MapPin, 
  DollarSign, 
  Zap, 
  CheckCircle, 
  Users, 
  Shield, 
  Clock,
  Play,
  ArrowRight,
  Home,
  Sun
} from 'lucide-react';

interface HowItWorksScreenProps {
  onJoinForFree: () => void;
}

export function HowItWorksScreen({ onJoinForFree }: HowItWorksScreenProps) {
  const [showExplainerModal, setShowExplainerModal] = useState(false);

  const steps = [
    {
      number: 1,
      title: 'Verify your address',
      description: 'Confirm your location to connect with nearby neighbors. We use secure verification to ensure only real residents can trade.',
      icon: <MapPin className="w-8 h-8" />,
      details: [
        'Enter your street address',
        'Receive verification code by SMS or email',
        'Confirm your identity securely',
        'Join your neighborhood network'
      ]
    },
    {
      number: 2,
      title: 'Set your preferences',
      description: 'Configure your trading preferences including price targets, daily limits, and matching priorities.',
      icon: <DollarSign className="w-8 h-8" />,
      details: [
        'Choose your role: Seller or Buyer',
        'Set minimum/maximum prices',
        'Configure daily trading limits',
        'Enable same-block priority matching'
      ]
    },
    {
      number: 3,
      title: 'Auto-match with neighbors',
      description: 'Our intelligent system automatically finds compatible neighbors and executes trades based on your preferences.',
      icon: <Zap className="w-8 h-8" />,
      details: [
        'Real-time neighbor matching',
        'Automatic price negotiation',
        'Secure payment processing',
        'Live trade notifications'
      ]
    },
    {
      number: 4,
      title: 'Track your impact',
      description: 'Monitor your trades, savings, and environmental impact with detailed receipts and community dashboards.',
      icon: <CheckCircle className="w-8 h-8" />,
      details: [
        'Detailed transaction receipts',
        'Monthly savings summaries',
        'CO₂ impact tracking',
        'Community leaderboards'
      ]
    }
  ];

  const benefits = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: 'Better Economics',
      description: 'Sellers earn 2-3x utility rates, buyers save 20-30% on electricity'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Community Building',
      description: 'Connect with neighbors and build local energy resilience'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure & Private',
      description: 'Bank-level security with privacy-first design'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Fully Automated',
      description: 'Set preferences once, then let the system handle everything'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-50 via-white to-amber-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              How <span className="text-[#2E7D32]">EnergyLink</span> works
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Join thousands of neighbors already trading solar energy directly with each other. 
              Get started in minutes with our simple, automated system.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <AppButton
                variant="primary"
                size="lg"
                icon={<Zap className="w-5 h-5" />}
                onClick={onJoinForFree}
                className="px-8"
              >
                Join for Free
              </AppButton>
              
              <AppButton
                variant="tertiary"
                size="lg"
                icon={<Play className="w-5 h-5" />}
                onClick={() => setShowExplainerModal(true)}
                className="px-6"
              >
                Watch 60-sec explainer
              </AppButton>
            </div>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple 4-step process
            </h2>
            <p className="text-lg text-gray-600">
              From signup to your first trade in under 10 minutes
            </p>
          </div>

          <div className="space-y-12 md:space-y-16">
            {steps.map((step, index) => (
              <div key={step.number} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-12`}>
                {/* Content */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#2E7D32] rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-white">{step.number}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{step.title}</h3>
                  </div>
                  
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {step.details.map((detail) => (
                      <div key={detail} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-[#2E7D32] flex-shrink-0" />
                        <span className="text-gray-700">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual */}
                <div className="flex-1 max-w-md">
                  <Card className="p-8 bg-gradient-to-br from-green-50 to-blue-50">
                    <div className="aspect-square flex items-center justify-center">
                      <div className="w-24 h-24 bg-[#2E7D32] rounded-2xl flex items-center justify-center text-white">
                        {step.icon}
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why choose peer-to-peer energy?
            </h2>
            <p className="text-lg text-gray-600">
              More than just savings – build stronger, more sustainable communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4 text-[#2E7D32]">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Perfect for every neighbor
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Solar Owners */}
            <Card className="p-8 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Sun className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Solar Owners</h3>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700">
                  Turn your rooftop solar into a neighborhood energy business. Earn 2-3x more than utility buyback rates 
                  while helping neighbors access clean energy.
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <ArrowRight className="w-4 h-4 text-amber-600" />
                    <span className="text-sm text-gray-700">Earn $0.12-$0.16/kWh vs $0.06 utility rate</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ArrowRight className="w-4 h-4 text-amber-600" />
                    <span className="text-sm text-gray-700">Set your own minimum prices and daily limits</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ArrowRight className="w-4 h-4 text-amber-600" />
                    <span className="text-sm text-gray-700">Automatic matching with nearby buyers</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Energy Buyers */}
            <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Home className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Energy Buyers</h3>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700">
                  Access clean, local solar energy at better prices than your utility. Support your neighbors while 
                  reducing your carbon footprint and electricity bills.
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <ArrowRight className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-700">Pay $0.12-$0.16/kWh vs $0.20 utility rate</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ArrowRight className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-700">Set maximum price and daily budget limits</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ArrowRight className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-700">Support renewable energy in your neighborhood</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#2E7D32] py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to start trading energy with your neighbors?
          </h2>
          <p className="text-lg md:text-xl text-green-100 mb-8">
            Join thousands of neighbors already building more sustainable, resilient communities through energy sharing.
          </p>
          
          <AppButton
            variant="secondary"
            size="lg"
            icon={<Zap className="w-5 h-5" />}
            onClick={onJoinForFree}
            className="px-8 bg-white text-[#2E7D32] hover:bg-gray-50"
          >
            Join for Free
          </AppButton>
        </div>
      </div>

      {/* Explainer Modal */}
      <Dialog open={showExplainerModal} onOpenChange={setShowExplainerModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">How EnergyLink Works</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Video Placeholder */}
            <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-[#2E7D32] rounded-full flex items-center justify-center mx-auto">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">60-Second Explainer Video</p>
                  <p className="text-sm text-gray-600">Coming soon - interactive demo available now</p>
                </div>
              </div>
            </div>

            {/* Quick Benefits */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-[#2E7D32]">2-3x</div>
                <div className="text-sm text-gray-600">Higher earnings for sellers</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-[#2E7D32]">20-30%</div>
                <div className="text-sm text-gray-600">Savings for buyers</div>
              </div>
            </div>

            <AppButton
              variant="primary"
              onClick={() => {
                setShowExplainerModal(false);
                onJoinForFree();
              }}
              className="w-full"
            >
              Get Started Now
            </AppButton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}