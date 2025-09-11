import React from 'react';
import { AppButton } from '../design-system/AppButton';
import { Zap, Home } from 'lucide-react';

interface SplashScreenProps {
  onGetStarted: () => void;
}

export function SplashScreen({ onGetStarted }: SplashScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50 flex flex-col justify-center items-center px-6">
      <div className="text-center space-y-8 max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-20 h-20 bg-[#2E7D32] rounded-2xl flex items-center justify-center shadow-lg">
              <div className="flex space-x-1">
                <Home className="w-6 h-6 text-white" />
                <Zap className="w-6 h-6 text-[#FFB300]" />
              </div>
            </div>
          </div>
        </div>

        {/* Headline */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            Neighbors, Not Utilities
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Trade solar locally. Keep the value on your block.
          </p>
        </div>

        {/* Value Props */}
        <div className="space-y-4 text-left">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-[#2E7D32] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <p className="text-gray-700">Get better prices than your utility</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-[#2E7D32] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <p className="text-gray-700">Support clean energy in your neighborhood</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-[#2E7D32] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <p className="text-gray-700">Build community connections</p>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-4">
          <AppButton 
            variant="primary" 
            size="lg" 
            onClick={onGetStarted}
            className="w-full"
          >
            Get started
          </AppButton>
        </div>
      </div>
    </div>
  );
}