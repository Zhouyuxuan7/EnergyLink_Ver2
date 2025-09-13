import React, { useState, useEffect } from 'react';
import { AppButton } from '../design-system/AppButton';
import { Card } from '../ui/card';
import { Home, Zap, Users, DollarSign, Leaf, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

interface HomeScreenProps {
  onJoinForFree: () => void;
}

export function HomeScreen({ onJoinForFree }: HomeScreenProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
      title: 'Auto-trade',
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
    <div className="min-h-screen content-clean">
      {/* Hero Section */}
      <div className="relative overflow-hidden hero-energy-glow">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
          {/* Full-width text stack */}
          <div className="max-w-4xl">
            <div className="space-y-8 text-left">
              {/* Headline */}
              <div className="space-y-6">
                <h1 className={`text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                    style={{ color: 'var(--txt-heading)' }}>
                  Trade solar locally.<br />
                  <span className="text-energy-gradient animate-pulse">Keep the value</span> on your block.
                </h1>
                <p className={`text-lg md:text-xl leading-relaxed max-w-3xl transition-all duration-1000 delay-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                   style={{ color: 'var(--txt-primary)' }}>
                  Connect with neighbors to buy and sell solar energy directly. 
                  Get better prices than utilities while supporting local clean power.
                </p>
              </div>

              {/* CTA Button */}
              <div className={`space-y-4 transition-all duration-1000 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <button 
                  className="btn-energy-primary px-8 py-4 text-lg hover:scale-105 transition-transform duration-200"
                  onClick={onJoinForFree}
                >
                  <Zap className="w-5 h-5 mr-2 icon-energy-white" />
                  Join for Free
                </button>
                
                {/* Helper Text */}
                <div className="pt-2">
                  <p className="text-sm" style={{ color: 'var(--txt-muted)' }}>
                    💡 You can switch between Seller and Buyer later
                  </p>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className={`flex flex-wrap gap-6 pt-6 transition-all duration-1000 delay-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="flex items-center space-x-2 group">
                  <div className="w-3 h-3 rounded-full transition-all duration-300 group-hover:scale-125" 
                       style={{ backgroundColor: 'var(--accent-energy-1)' }}></div>
                  <span className="text-sm" style={{ color: 'var(--txt-primary)' }}>
                    Verified neighbors only
                  </span>
                </div>
                <div className="flex items-center space-x-2 group">
                  <div className="w-3 h-3 rounded-full transition-all duration-300 group-hover:scale-125" 
                       style={{ backgroundColor: 'var(--accent-energy-1)' }}></div>
                  <span className="text-sm" style={{ color: 'var(--txt-primary)' }}>
                    Automatic payments
                  </span>
                </div>
                <div className="flex items-center space-x-2 group">
                  <div className="w-3 h-3 rounded-full transition-all duration-300 group-hover:scale-125" 
                       style={{ backgroundColor: 'var(--accent-energy-1)' }}></div>
                  <span className="text-sm" style={{ color: 'var(--txt-primary)' }}>
                    Privacy protected
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="content-section-lg section-energy-glow">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className={`text-3xl md:text-4xl font-semibold mb-4 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
                style={{ color: 'var(--txt-heading)' }}>How it works</h2>
            <p className={`text-lg md:text-xl transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
               style={{ color: 'var(--txt-primary)' }}>
              Get started in minutes with our simple 4-step process
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {steps.map((step, index) => (
              <div 
                key={step.number} 
                className={`relative transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${600 + index * 200}ms` }}
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <div className={`content-clean p-6 text-center transition-all duration-300 ${
                  hoveredStep === index ? 'transform scale-105' : 'hover:transform hover:scale-105'
                }`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                    hoveredStep === index ? 'scale-110' : ''
                  }`}
                       style={{ 
                         background: 'linear-gradient(135deg, var(--accent-energy-1), var(--accent-energy-2))',
                         boxShadow: hoveredStep === index ? 'var(--glow-cyan)' : 'var(--glow-teal)'
                       }}>
                    <span className="text-lg font-semibold" 
                          style={{ color: 'var(--bg-page)' }}>{step.number}</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto transition-all duration-300 ${
                      hoveredStep === index ? 'scale-110' : ''
                    }`}
                         style={{ backgroundColor: 'rgba(0, 245, 212, 0.1)' }}>
                      <div className="icon-energy-teal">{step.icon}</div>
                    </div>
                    <h3 className="text-lg font-semibold" 
                        style={{ color: 'var(--txt-heading)' }}>{step.title}</h3>
                    <p className="text-sm" 
                       style={{ color: 'var(--txt-primary)' }}>{step.description}</p>
                  </div>
                </div>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className={`hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 transition-all duration-300 ${
                    hoveredStep === index ? 'scale-110' : ''
                  }`}>
                    <ArrowRight className="w-6 h-6 icon-energy-cyan" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="content-section-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h3 className={`text-3xl md:text-4xl font-semibold mb-4 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
                style={{ color: 'var(--txt-heading)' }}>Why choose peer-to-peer energy?</h3>
            <p className={`text-lg md:text-xl transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
               style={{ color: 'var(--txt-primary)' }}>
              Better prices, cleaner energy, stronger communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <DollarSign className="w-8 h-8 icon-energy-teal" />,
                title: 'Better Prices',
                description: 'Sellers earn 2-3x more than utility rates. Buyers save 20-30% on electricity costs.'
              },
              {
                icon: <Leaf className="w-8 h-8 icon-energy-teal" />,
                title: 'Local Clean Energy',
                description: 'Support renewable energy in your neighborhood. Reduce transmission losses and carbon footprint.'
              },
              {
                icon: <Users className="w-8 h-8 icon-energy-teal" />,
                title: 'Community Building',
                description: 'Connect with neighbors, build energy resilience, and create a more sustainable community.'
              }
            ].map((benefit, index) => (
              <div 
                key={index}
                className={`content-clean p-6 md:p-8 text-center transition-all duration-1000 hover:transform hover:scale-105 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${600 + index * 200}ms` }}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 hover:scale-110"
                     style={{ backgroundColor: 'rgba(0, 245, 212, 0.1)' }}>
                  {benefit.icon}
                </div>
                <h4 className="text-xl font-semibold mb-4" 
                    style={{ color: 'var(--txt-heading)' }}>{benefit.title}</h4>
                <p style={{ color: 'var(--txt-primary)' }}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="content-section-lg section-energy-glow">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-center">
            {[
              { value: '2,450+', label: 'Active Neighbors' },
              { value: '156,000', label: 'kWh Traded Monthly' },
              { value: '$47,200', label: 'Community Savings' },
              { value: '89.2%', label: 'CO₂ Reduction' }
            ].map((stat, index) => (
              <div 
                key={index}
                className={`transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${800 + index * 200}ms` }}
              >
                <div className="text-3xl md:text-4xl font-semibold mb-2 metric-energy-value transition-all duration-300 hover:scale-110">
                  {stat.value}
                </div>
                <div className="metric-energy-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}