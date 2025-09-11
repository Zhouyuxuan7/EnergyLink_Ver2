import React, { useState } from 'react';
import { AppButton } from '../design-system/AppButton';
import { AppInput } from '../design-system/AppInput';
import { AppBadge } from '../design-system/AppBadge';
import { Card } from '../ui/card';
import { ArrowLeft, MapPin, Check } from 'lucide-react';

interface VerifyAddressScreenProps {
  onBack: () => void;
  onVerified: () => void;
}

export function VerifyAddressScreen({ onBack, onVerified }: VerifyAddressScreenProps) {
  const [step, setStep] = useState<'address' | 'code' | 'success'>('address');
  const [address, setAddress] = useState('123 Maple Street');
  const [code, setCode] = useState('');

  const handleVerifyAddress = () => {
    setStep('code');
  };

  const handleVerifyCode = () => {
    if (code.length === 4) {
      setStep('success');
      setTimeout(() => {
        onVerified();
      }, 2000);
    }
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-center items-center px-6">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Address verified!</h2>
            <AppBadge variant="verified">Verified Neighbor</AppBadge>
          </div>
          <p className="text-gray-600">
            You're all set to trade energy with your neighbors
          </p>
        </div>
      </div>
    );
  }

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
        <h1 className="font-semibold text-gray-900">Verify address</h1>
        <div className="w-10" />
      </div>

      <div className="p-6 space-y-6">
        {step === 'address' && (
          <>
            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">Where are you located?</h2>
              <p className="text-gray-600">This helps us match you with nearby neighbors</p>
            </div>

            <AppInput
              type="text"
              label="Street address"
              value={address}
              onChange={setAddress}
              placeholder="123 Main Street"
            />

            {/* Map Preview */}
            <Card className="p-4 bg-gray-50">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-[#2E7D32]" />
                <div>
                  <p className="font-medium text-gray-900">GPS Location</p>
                  <p className="text-sm text-gray-600">37.7749, -122.4194</p>
                </div>
              </div>
            </Card>

            <AppButton
              variant="primary"
              onClick={handleVerifyAddress}
              className="w-full"
            >
              Send verification code
            </AppButton>

            <div className="bg-blue-50 p-4 rounded-xl">
              <p className="text-sm text-blue-800">
                <strong>Privacy:</strong> Neighbors see first name + street only
              </p>
            </div>
          </>
        )}

        {step === 'code' && (
          <>
            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">Enter verification code</h2>
              <p className="text-gray-600">Check your text messages for a 4-digit code</p>
            </div>

            <div className="flex justify-center space-x-2">
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-[#2E7D32] focus:outline-none"
                  value={code[index] || ''}
                  onChange={(e) => {
                    const newCode = code.split('');
                    newCode[index] = e.target.value;
                    setCode(newCode.join(''));
                    
                    // Auto-focus next input
                    if (e.target.value && index < 3) {
                      const nextInput = e.target.parentNode?.children[index + 1] as HTMLInputElement;
                      nextInput?.focus();
                    }
                  }}
                />
              ))}
            </div>

            <AppButton
              variant="primary"
              onClick={handleVerifyCode}
              disabled={code.length !== 4}
              className="w-full"
            >
              Verify code
            </AppButton>

            <div className="text-center">
              <button className="text-[#2E7D32] font-medium text-sm hover:underline">
                Didn't receive a code? Resend
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}