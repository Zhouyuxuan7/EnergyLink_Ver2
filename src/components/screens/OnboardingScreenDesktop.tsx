import React, { useState } from 'react';
import { AppButton } from '../design-system/AppButton';
import { Card } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Sun, Home, ArrowRight } from 'lucide-react';

interface OnboardingScreenDesktopProps {
  preselectedRole?: 'seller' | 'buyer';
  onRoleSelect: (role: 'seller' | 'buyer') => void;
}

export function OnboardingScreenDesktop({ preselectedRole, onRoleSelect }: OnboardingScreenDesktopProps) {
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'seller' | 'buyer' | null>(preselectedRole || null);

  const handleRoleSelect = (role: 'seller' | 'buyer') => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose your role</h1>
          <p className="text-xl text-gray-600 mb-8">How would you like to participate in the energy network?</p>
          
          <button
            onClick={() => setShowLearnMore(true)}
            className="text-[#2E7D32] font-medium hover:underline"
          >
            Learn how it works →
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-12">
          {/* Seller Card */}
          <Card 
            className={`p-8 cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${
              selectedRole === 'seller' 
                ? 'border-[#2E7D32] bg-green-50' 
                : 'border-gray-200 hover:border-green-300'
            }`}
            onClick={() => handleRoleSelect('seller')}
          >
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto">
                <Sun className="w-10 h-10 text-amber-600" />
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">I have solar</h3>
                <p className="text-gray-600 mb-6">Sell your excess energy to neighbors and earn more than utility rates</p>
              </div>

              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#2E7D32] rounded-full"></div>
                  <span className="text-sm text-gray-700">Earn $0.12-$0.16/kWh vs $0.06 utility rate</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#2E7D32] rounded-full"></div>
                  <span className="text-sm text-gray-700">Set your minimum price and daily limits</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#2E7D32] rounded-full"></div>
                  <span className="text-sm text-gray-700">Automatic matching with nearby buyers</span>
                </div>
              </div>

              {selectedRole === 'seller' && (
                <div className="pt-4">
                  <div className="w-6 h-6 bg-[#2E7D32] rounded-full flex items-center justify-center mx-auto">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Buyer Card */}
          <Card 
            className={`p-8 cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${
              selectedRole === 'buyer' 
                ? 'border-[#2E7D32] bg-green-50' 
                : 'border-gray-200 hover:border-green-300'
            }`}
            onClick={() => handleRoleSelect('buyer')}
          >
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
                <Home className="w-10 h-10 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">I want local clean power</h3>
                <p className="text-gray-600 mb-6">Buy solar energy from neighbors and save on your electricity bill</p>
              </div>

              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#2E7D32] rounded-full"></div>
                  <span className="text-sm text-gray-700">Pay $0.12-$0.16/kWh vs $0.20 utility rate</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#2E7D32] rounded-full"></div>
                  <span className="text-sm text-gray-700">Set your maximum price and daily limits</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#2E7D32] rounded-full"></div>
                  <span className="text-sm text-gray-700">Support renewable energy locally</span>
                </div>
              </div>

              {selectedRole === 'buyer' && (
                <div className="pt-4">
                  <div className="w-6 h-6 bg-[#2E7D32] rounded-full flex items-center justify-center mx-auto">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center space-x-4">
          <AppButton
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-5 h-5" />}
            iconPosition="right"
            onClick={handleContinue}
            disabled={!selectedRole}
            className="px-12"
          >
            Continue as {selectedRole === 'seller' ? 'Seller' : selectedRole === 'buyer' ? 'Buyer' : '...'}
          </AppButton>
        </div>

        <p className="text-center text-gray-500 mt-6">
          You can switch roles anytime in your settings
        </p>
      </div>

      {/* Learn More Modal */}
      <Dialog open={showLearnMore} onOpenChange={setShowLearnMore}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">How it works</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-[#2E7D32] rounded-full flex items-center justify-center mx-auto">
                  <span className="text-lg font-bold text-white">1</span>
                </div>
                <h4 className="font-semibold">Set Preferences</h4>
                <p className="text-sm text-gray-600">Configure your buying or selling preferences, prices, and limits</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-[#2E7D32] rounded-full flex items-center justify-center mx-auto">
                  <span className="text-lg font-bold text-white">2</span>
                </div>
                <h4 className="font-semibold">Auto-Matching</h4>
                <p className="text-sm text-gray-600">Our system automatically matches you with compatible neighbors</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-[#2E7D32] rounded-full flex items-center justify-center mx-auto">
                  <span className="text-lg font-bold text-white">3</span>
                </div>
                <h4 className="font-semibold">Seamless Trading</h4>
                <p className="text-sm text-gray-600">Energy flows through the grid, payments are processed automatically</p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-xl">
              <h4 className="font-semibold text-blue-900 mb-2">Security & Privacy</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• All neighbors are verified with address confirmation</li>
                <li>• Only first name + street are visible to other users</li>
                <li>• Transactions are secured through our platform</li>
                <li>• You maintain full control over your trading preferences</li>
              </ul>
            </div>

            <AppButton
              variant="primary"
              onClick={() => setShowLearnMore(false)}
              className="w-full"
            >
              Got it, let's continue
            </AppButton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}