import React, { useState } from 'react';
import { AppButton } from '../design-system/AppButton';
import { AppInput } from '../design-system/AppInput';
import { Card } from '../ui/card';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PriceBandScreenProps {
  role: 'seller' | 'buyer';
  onBack: () => void;
  onComplete: () => void;
}

export function PriceBandScreen({ role, onBack, onComplete }: PriceBandScreenProps) {
  const [priceValue, setPriceValue] = useState(role === 'seller' ? [12] : [14]);
  const [dailyCap, setDailyCap] = useState(role === 'seller' ? 10 : 5);
  const [sameBlockFirst, setSameBlockFirst] = useState(true);

  const handleEnableAutoMatch = () => {
    toast.success("Auto-trade enabled! We'll start finding trades for you.");
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  const priceLabel = role === 'seller' ? 'Minimum sell price' : 'Maximum buy price';
  const currentPrice = priceValue[0] / 100;

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
        <h1 className="font-semibold text-gray-900">Set preferences</h1>
        <div className="w-10" />
      </div>

      <div className="p-6 space-y-6">
        {/* Explainer Card */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">How pricing works</h3>
          <p className="text-sm text-blue-800">
            Utilities pay exporters $0.05–$0.07 and charge neighbors $0.18–$0.22. 
            We help you trade within this band for better value.
          </p>
        </Card>

        {/* Price Slider */}
        <div className="space-y-4">
          <AppInput
            type="slider"
            label={priceLabel}
            value={priceValue}
            onChange={setPriceValue}
            min={role === 'seller' ? 8 : 10}
            max={role === 'seller' ? 16 : 20}
            step={1}
            formatLabel={(value) => `$${(value / 100).toFixed(2)}`}
          />
          <p className="text-sm text-gray-600 text-center">
            You'll aim for ${currentPrice.toFixed(2)}/kWh
          </p>
        </div>

        {/* Daily Cap */}
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

        {/* Same Block Preference */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div>
            <p className="font-medium text-gray-900">Prefer same block first</p>
            <p className="text-sm text-gray-600">Match with immediate neighbors when possible</p>
          </div>
          <AppInput
            type="toggle"
            checked={sameBlockFirst}
            onChange={setSameBlockFirst}
          />
        </div>

        {/* Summary */}
        <Card className="p-4 bg-green-50 border-green-200">
          <h3 className="font-semibold text-green-900 mb-2">Your intent</h3>
          <div className="space-y-1 text-sm text-green-800">
            <p>
              {role === 'seller' ? 'Sell excess' : 'Buy'} up to {dailyCap} kWh daily
            </p>
            <p>
              {role === 'seller' ? 'Minimum' : 'Maximum'} ${currentPrice.toFixed(2)}/kWh
            </p>
            <p>Same block preference: {sameBlockFirst ? 'ON' : 'OFF'}</p>
          </div>
        </Card>

        <AppButton
          variant="primary"
          onClick={handleEnableAutoMatch}
          className="w-full"
        >
          Enable Auto-Trade
        </AppButton>
      </div>
    </div>
  );
}