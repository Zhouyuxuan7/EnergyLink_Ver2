import React, { useState } from 'react';
import { AppButton } from '../design-system/AppButton';
import { AppInput } from '../design-system/AppInput';
import { Card } from '../ui/card';
import { Info, TrendingUp, TrendingDown, Zap } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PriceBandScreenDesktopProps {
  role: 'seller' | 'buyer';
  onComplete: () => void;
}

export function PriceBandScreenDesktop({ role, onComplete }: PriceBandScreenDesktopProps) {
  const [priceValue, setPriceValue] = useState(role === 'seller' ? [12] : [14]);
  const [dailyCap, setDailyCap] = useState(role === 'seller' ? 10 : 5);
  const [sameBlockFirst, setSameBlockFirst] = useState(true);

  const handleEnableAutoMatch = () => {
    toast.success("Auto-trade enabled! We'll start finding trades for you.");
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  const currentPrice = priceValue[0] / 100;
  const priceLabel = role === 'seller' ? 'Minimum sell price' : 'Maximum buy price';

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Set your trading preferences</h1>
          <p className="text-xl text-gray-600">
            Configure your {role === 'seller' ? 'selling' : 'buying'} preferences to start auto-trading
          </p>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - Explainer */}
          <div className="col-span-4 space-y-6">
            <Card className="p-6 bg-blue-50 border-blue-200">
              <div className="flex items-start space-x-3">
                <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-3">How pricing works</h3>
                  <div className="space-y-2 text-sm text-blue-800">
                    <div className="flex items-center justify-between">
                      <span>Utility export rate:</span>
                      <span className="font-medium">$0.05–$0.07/kWh</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Utility retail rate:</span>
                      <span className="font-medium">$0.18–$0.22/kWh</span>
                    </div>
                    <div className="border-t border-blue-200 pt-2 mt-3">
                      <div className="flex items-center justify-between font-semibold">
                        <span>P2P trading range:</span>
                        <span className="text-[#2E7D32]">$0.08–$0.18/kWh</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-blue-700 mt-3">
                    Trade within this band for mutual benefit!
                  </p>
                </div>
              </div>
            </Card>

            {role === 'seller' && (
              <Card className="p-6 bg-green-50 border-green-200">
                <div className="flex items-start space-x-3">
                  <TrendingUp className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-green-900 mb-2">Seller Benefits</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Earn 2-3x more than utility rates</li>
                      <li>• Support your neighbors directly</li>
                      <li>• Reduce transmission losses</li>
                      <li>• Build community resilience</li>
                    </ul>
                  </div>
                </div>
              </Card>
            )}

            {role === 'buyer' && (
              <Card className="p-6 bg-green-50 border-green-200">
                <div className="flex items-start space-x-3">
                  <TrendingDown className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-green-900 mb-2">Buyer Benefits</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Save 20-30% on electricity costs</li>
                      <li>• Support local renewable energy</li>
                      <li>• Reduce carbon footprint</li>
                      <li>• Connect with neighbors</li>
                    </ul>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Center Column - Price Settings */}
          <div className="col-span-5 space-y-8">
            <Card className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">{priceLabel}</h3>
              
              <div className="space-y-6">
                <AppInput
                  type="slider"
                  value={priceValue}
                  onChange={setPriceValue}
                  min={role === 'seller' ? 8 : 10}
                  max={role === 'seller' ? 16 : 20}
                  step={1}
                  formatLabel={(value) => `$${(value / 100).toFixed(2)}`}
                />
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-[#2E7D32]">
                    ${currentPrice.toFixed(2)}/kWh
                  </p>
                  <p className="text-sm text-gray-600">
                    Your target {role === 'seller' ? 'selling' : 'buying'} price
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <p className="font-medium text-red-900">Utility Rate</p>
                    <p className="text-red-700">
                      {role === 'seller' ? '$0.06/kWh' : '$0.20/kWh'}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="font-medium text-green-900">Your Rate</p>
                    <p className="text-green-700">${currentPrice.toFixed(2)}/kWh</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Daily limits</h3>
              
              <AppInput
                type="number-stepper"
                label="Daily kWh cap"
                value={dailyCap}
                onChange={setDailyCap}
                min={1}
                max={50}
                step={1}
                suffix="kWh"
              />
              
              <p className="text-sm text-gray-600 mt-3">
                Maximum energy to {role === 'seller' ? 'sell' : 'buy'} per day
              </p>
            </Card>
          </div>

          {/* Right Column - Preferences & Summary */}
          <div className="col-span-3 space-y-6">
            <Card className="p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Preferences</h4>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Same block first</p>
                    <p className="text-sm text-gray-600">Prioritize immediate neighbors</p>
                  </div>
                  <AppInput
                    type="toggle"
                    checked={sameBlockFirst}
                    onChange={setSameBlockFirst}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-[#2E7D32] text-white">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-6 h-6" />
                <h4 className="font-semibold">Your Intent Summary</h4>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Role:</span>
                  <span className="font-medium capitalize">{role}</span>
                </div>
                <div className="flex justify-between">
                  <span>Price target:</span>
                  <span className="font-medium">${currentPrice.toFixed(2)}/kWh</span>
                </div>
                <div className="flex justify-between">
                  <span>Daily cap:</span>
                  <span className="font-medium">{dailyCap} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span>Same block first:</span>
                  <span className="font-medium">{sameBlockFirst ? 'Yes' : 'No'}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-green-400">
                <p className="text-xs opacity-90">
                  {role === 'seller' 
                    ? `Estimated earnings: $${(dailyCap * currentPrice).toFixed(2)}/day`
                    : `Estimated savings: $${(dailyCap * (0.20 - currentPrice)).toFixed(2)}/day`
                  }
                </p>
              </div>
            </Card>

            <AppButton
              variant="primary"
              size="lg"
              onClick={handleEnableAutoMatch}
              className="w-full"
              icon={<Zap className="w-5 h-5" />}
            >
              Enable Auto-Trade
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  );
}