import React, { useState } from 'react';
import { AppButton } from '../design-system/AppButton';
import { Card } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { ArrowLeft, Sun, Home, X } from 'lucide-react';

interface OnboardingScreenProps {
  onBack: () => void;
  onRoleSelect: (role: 'seller' | 'buyer') => void;
}

export function OnboardingScreen({ onBack, onRoleSelect }: OnboardingScreenProps) {
  const [showLearnMore, setShowLearnMore] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-semibold text-gray-900">Choose your role</h1>
        <div className="w-10" />
      </div>

      <div className="p-6 space-y-6">
        {/* Role Cards */}
        <div className="space-y-4">
          <Card 
            className="p-6 border-2 border-gray-200 hover:border-[#2E7D32] transition-colors cursor-pointer active:scale-[0.98]"
            onClick={() => onRoleSelect('seller')}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Sun className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">I have solar</h3>
                <p className="text-sm text-gray-600">Sell your excess energy to neighbors</p>
              </div>
            </div>
          </Card>

          <Card 
            className="p-6 border-2 border-gray-200 hover:border-[#2E7D32] transition-colors cursor-pointer active:scale-[0.98]"
            onClick={() => onRoleSelect('buyer')}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">I want local clean power</h3>
                <p className="text-sm text-gray-600">Buy solar energy from neighbors</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Microcopy */}
        <p className="text-center text-sm text-gray-500">
          You can switch anytime in settings
        </p>

        {/* Learn More */}
        <div className="text-center">
          <button
            onClick={() => setShowLearnMore(true)}
            className="text-[#2E7D32] font-medium text-sm hover:underline"
          >
            Learn how it works
          </button>
        </div>
      </div>

      {/* Learn More Modal */}
      <Dialog open={showLearnMore} onOpenChange={setShowLearnMore}>
        <DialogContent className="mx-4 rounded-xl">
          <DialogHeader>
            <DialogTitle>How it works</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#2E7D32] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-white font-bold">1</span>
                </div>
                <p className="text-gray-700">Set your buying or selling preferences</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#2E7D32] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-white font-bold">2</span>
                </div>
                <p className="text-gray-700">We automatically match you with nearby neighbors</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#2E7D32] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-white font-bold">3</span>
                </div>
                <p className="text-gray-700">Energy flows through the existing grid, payments are automatic</p>
              </div>
            </div>
            <AppButton
              variant="primary"
              onClick={() => setShowLearnMore(false)}
              className="w-full"
            >
              Got it
            </AppButton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}