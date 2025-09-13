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
    <div className="min-h-screen content-clean">
      {/* Hero Section */}
      <div className="hero-energy-glow py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6" 
                style={{ color: 'var(--txt-heading)' }}>
              How <span className="text-energy-gradient">EnergyLink</span> works
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8" 
               style={{ color: 'var(--txt-primary)' }}>
              Join thousands of neighbors already trading solar energy directly with each other. 
              Get started in minutes with our simple, automated system.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                className="btn-energy-primary px-8 py-4 text-lg"
                onClick={onJoinForFree}
              >
                <Zap className="w-5 h-5 mr-2 icon-energy-white" />
                Join for Free
              </button>
              
              <button
                className="btn-energy-secondary px-6 py-4 text-lg"
                onClick={() => setShowExplainerModal(true)}
              >
                <Play className="w-5 h-5 mr-2 icon-energy-white" />
                Watch 60-sec explainer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="content-section-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4" 
                style={{ color: 'var(--txt-heading)' }}>
              Simple 4-step process
            </h2>
            <p className="text-lg" style={{ color: 'var(--txt-primary)' }}>
              From signup to your first trade in under 10 minutes
            </p>
          </div>

          <div className="space-y-12 md:space-y-16">
            {steps.map((step, index) => (
              <div key={step.number} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-12`}>
                {/* Content */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center"
                         style={{ 
                           background: 'linear-gradient(135deg, var(--accent-energy-1), var(--accent-energy-2))',
                           boxShadow: 'var(--glow-teal)'
                         }}>
                      <span className="text-lg font-semibold" 
                            style={{ color: 'var(--bg-page)' }}>{step.number}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-semibold" 
                        style={{ color: 'var(--txt-heading)' }}>{step.title}</h3>
                  </div>
                  
                  <p className="text-lg leading-relaxed" 
                     style={{ color: 'var(--txt-primary)' }}>
                    {step.description}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {step.details.map((detail) => (
                      <div key={detail} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 icon-energy-teal flex-shrink-0" />
                        <span style={{ color: 'var(--txt-primary)' }}>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual */}
                <div className="flex-1 max-w-md">
                  <div className="p-8 section-energy-glow rounded-2xl">
                    <div className="aspect-square flex items-center justify-center">
                      <div className="w-24 h-24 rounded-2xl flex items-center justify-center"
                           style={{ 
                             background: 'linear-gradient(135deg, var(--accent-energy-1), var(--accent-energy-2))',
                             boxShadow: 'var(--glow-cyan)'
                           }}>
                        <div className="icon-energy-white">{step.icon}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="content-section-lg section-energy-glow">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4" 
                style={{ color: 'var(--txt-heading)' }}>
              Why choose peer-to-peer energy?
            </h2>
            <p className="text-lg" style={{ color: 'var(--txt-primary)' }}>
              More than just savings – build stronger, more sustainable communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="content-clean p-6 text-center transition-all duration-200 hover:transform hover:scale-105">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                     style={{ backgroundColor: 'rgba(0, 245, 212, 0.1)' }}>
                  <div className="icon-energy-teal">{benefit.icon}</div>
                </div>
                <h3 className="font-semibold mb-3" style={{ color: 'var(--txt-heading)' }}>{benefit.title}</h3>
                <p className="text-sm" style={{ color: 'var(--txt-primary)' }}>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="content-section-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4" 
                style={{ color: 'var(--txt-heading)' }}>
              Perfect for every neighbor
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Solar Owners */}
            <div className="content-clean p-8 rounded-2xl section-energy-glow">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                     style={{ backgroundColor: 'rgba(255, 179, 0, 0.1)' }}>
                  <Sun className="w-6 h-6" style={{ color: 'var(--accent-warning)' }} />
                </div>
                <h3 className="text-2xl font-semibold" style={{ color: 'var(--txt-heading)' }}>Solar Owners</h3>
              </div>
              
              <div className="space-y-4">
                <p style={{ color: 'var(--txt-primary)' }}>
                  Turn your rooftop solar into a neighborhood energy business. Earn 2-3x more than utility buyback rates 
                  while helping neighbors access clean energy.
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <ArrowRight className="w-4 h-4 icon-energy-cyan" />
                    <span className="text-sm" style={{ color: 'var(--txt-primary)' }}>Earn $0.12-$0.16/kWh vs $0.06 utility rate</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ArrowRight className="w-4 h-4 icon-energy-cyan" />
                    <span className="text-sm" style={{ color: 'var(--txt-primary)' }}>Set your own minimum prices and daily limits</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ArrowRight className="w-4 h-4 icon-energy-cyan" />
                    <span className="text-sm" style={{ color: 'var(--txt-primary)' }}>Automatic matching with nearby buyers</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Energy Buyers */}
            <div className="content-clean p-8 rounded-2xl section-energy-glow">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                     style={{ backgroundColor: 'rgba(0, 245, 212, 0.1)' }}>
                  <Home className="w-6 h-6 icon-energy-teal" />
                </div>
                <h3 className="text-2xl font-semibold" style={{ color: 'var(--txt-heading)' }}>Energy Buyers</h3>
              </div>
              
              <div className="space-y-4">
                <p style={{ color: 'var(--txt-primary)' }}>
                  Access clean, local solar energy at better prices than your utility. Support your neighbors while 
                  reducing your carbon footprint and electricity bills.
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <ArrowRight className="w-4 h-4 icon-energy-cyan" />
                    <span className="text-sm" style={{ color: 'var(--txt-primary)' }}>Pay $0.12-$0.16/kWh vs $0.20 utility rate</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ArrowRight className="w-4 h-4 icon-energy-cyan" />
                    <span className="text-sm" style={{ color: 'var(--txt-primary)' }}>Set maximum price and daily budget limits</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ArrowRight className="w-4 h-4 icon-energy-cyan" />
                    <span className="text-sm" style={{ color: 'var(--txt-primary)' }}>Support renewable energy in your neighborhood</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="content-section-lg hero-energy-glow">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6" 
              style={{ color: 'var(--txt-heading)' }}>
            Ready to start trading energy with your neighbors?
          </h2>
          <p className="text-lg md:text-xl mb-8" 
             style={{ color: 'var(--txt-primary)' }}>
            Join thousands of neighbors already building more sustainable, resilient communities through energy sharing.
          </p>
          
          <button
            className="btn-energy-primary px-8 py-4 text-lg"
            onClick={onJoinForFree}
          >
            <Zap className="w-5 h-5 mr-2 icon-energy-white" />
            Join for Free
          </button>
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