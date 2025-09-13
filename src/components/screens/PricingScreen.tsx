import React from 'react';
import { AppButton } from '../design-system/AppButton';
import { Card } from '../ui/card';
import { Check, Zap, Users, Building } from 'lucide-react';

interface PricingScreenProps {
  onJoinForFree: () => void;
}

export function PricingScreen({ onJoinForFree }: PricingScreenProps) {
  const plans = [
    {
      name: 'Free',
      icon: <Zap className="w-8 h-8" />,
      price: '$0.005',
      unit: 'per kWh',
      description: 'Perfect for getting started with P2P energy trading',
      features: [
        'Up to 20 kWh traded per month',
        'Basic neighbor matching',
        'Standard trading receipts',
        'Community leaderboards',
        'Email support',
        'Mobile app access'
      ],
      cta: 'Join for Free',
      highlighted: false,
      popular: false
    },
    {
      name: 'Neighborhood+',
      icon: <Users className="w-8 h-8" />,
      price: '$0.003',
      unit: 'per kWh',
      description: 'Enhanced features for active community members',
      features: [
        'Unlimited kWh trading',
        'Priority neighbor matching',
        'Advanced analytics dashboard',
        'Custom trading preferences',
        'Same-block priority matching',
        'Premium support',
        'CSV export & reporting',
        'Community goal setting'
      ],
      cta: 'Join for Free',
      highlighted: true,
      popular: true
    },
    {
      name: 'HOA Pilot',
      icon: <Building className="w-8 h-8" />,
      price: 'Custom',
      unit: 'pricing',
      description: 'Comprehensive solution for homeowner associations',
      features: [
        'Bulk resident onboarding',
        'HOA admin dashboard',
        'Community-wide goals',
        'Resident engagement tools',
        'Custom branding options',
        'Dedicated account manager',
        'Priority technical support',
        'Integration assistance'
      ],
      cta: 'Contact Sales',
      highlighted: false,
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Start trading energy with your neighbors today. No hidden fees, no long-term contracts.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {plans.map((plan) => (
            <Card 
              key={plan.name}
              className={`relative p-6 md:p-8 ${
                plan.highlighted 
                  ? 'border-2 border-[#2E7D32] shadow-xl scale-105' 
                  : 'border border-gray-200 hover:shadow-lg'
              } transition-all duration-200`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#2E7D32] text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center space-y-6">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto ${
                  plan.highlighted ? 'bg-[#2E7D32] text-white' : 'bg-green-100 text-[#2E7D32]'
                }`}>
                  {plan.icon}
                </div>

                {/* Plan Name */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                {/* Pricing */}
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-lg text-gray-600">{plan.unit}</span>
                  </div>
                  {plan.name === 'Free' && (
                    <p className="text-sm text-gray-500">Platform fee on transactions</p>
                  )}
                  {plan.name === 'Neighborhood+' && (
                    <p className="text-sm text-gray-500">Lower platform fee + premium features</p>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <div className="text-left space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-[#2E7D32] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <AppButton
                  variant={plan.highlighted ? "primary" : "secondary"}
                  size="lg"
                  onClick={plan.name === 'HOA Pilot' ? undefined : onJoinForFree}
                  className="w-full"
                >
                  {plan.cta}
                </AppButton>
              </div>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently asked questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3">How is the platform fee calculated?</h3>
              <p className="text-gray-600 text-sm">
                The platform fee is charged per kWh traded and covers payment processing, 
                matching algorithms, and platform maintenance. It's automatically deducted from each transaction.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Can I switch plans anytime?</h3>
              <p className="text-gray-600 text-sm">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect 
                immediately, and you'll only pay the new rate for future transactions.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3">What if I don't reach the 20 kWh limit?</h3>
              <p className="text-gray-600 text-sm">
                No worries! The Free plan has no minimum requirements. You only pay the platform 
                fee for actual trades you complete.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3">How does HOA Pilot pricing work?</h3>
              <p className="text-gray-600 text-sm">
                HOA Pilot pricing is customized based on community size, features needed, and 
                implementation requirements. Contact our sales team for a personalized quote.
              </p>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to start trading energy?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of neighbors already saving money and supporting clean energy in their communities.
            </p>
            <AppButton
              variant="primary"
              size="lg"
              icon={<Zap className="w-5 h-5" />}
              onClick={onJoinForFree}
              className="px-8"
            >
              Join for Free
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  );
}