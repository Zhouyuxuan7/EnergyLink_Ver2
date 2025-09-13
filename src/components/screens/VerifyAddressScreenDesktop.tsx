import React, { useState } from 'react';
import { AppButton } from '../design-system/AppButton';
import { AppInput } from '../design-system/AppInput';
import { AppBadge } from '../design-system/AppBadge';
import { Card } from '../ui/card';
import { MapPin, Check, Shield } from 'lucide-react';

interface VerifyAddressScreenDesktopProps {
  onVerified: () => void;
}

export function VerifyAddressScreenDesktop({ onVerified }: VerifyAddressScreenDesktopProps) {
  const [step, setStep] = useState<'address' | 'code' | 'success'>('address');
  const [address, setAddress] = useState('123 Maple Street, Springfield');
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md text-center space-y-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-12 h-12 text-green-600" />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">Address verified!</h2>
            <AppBadge variant="verified" className="text-base px-4 py-2">
              ✓ Verified Neighbor
            </AppBadge>
            <p className="text-xl text-gray-600">
              You're all set to trade energy with your neighbors
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Verify your address</h1>
          <p className="text-xl text-gray-600">This helps us connect you with nearby neighbors for trading</p>
        </div>

        <div className="grid grid-cols-2 gap-12">
          {/* Left Side - Form */}
          <div className="space-y-8">
            {step === 'address' && (
              <>
                <Card className="p-8 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900">Enter your location</h3>
                    <p className="text-gray-600">We'll send a verification code to confirm your address</p>
                  </div>

                  <AppInput
                    type="text"
                    label="Street address"
                    value={address}
                    onChange={setAddress}
                    placeholder="123 Main Street, City, State"
                    className="text-lg"
                  />

                  <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                    <MapPin className="w-6 h-6 text-[#2E7D32] flex-shrink-0" />
                    <div>
                      <p className="font-medium text-green-900">GPS Location Detected</p>
                      <p className="text-sm text-green-700">37.7749°N, 122.4194°W</p>
                    </div>
                  </div>

                  <AppButton
                    variant="primary"
                    size="lg"
                    onClick={handleVerifyAddress}
                    className="w-full"
                  >
                    Send verification code
                  </AppButton>
                </Card>

                <Card className="p-6 bg-blue-50 border-blue-200">
                  <div className="flex items-start space-x-4">
                    <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div className="space-y-2">
                      <h4 className="font-semibold text-blue-900">Privacy Protection</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Neighbors see only your first name + street</li>
                        <li>• Your exact address is never shared</li>
                        <li>• All data is encrypted and secure</li>
                        <li>• You can update privacy settings anytime</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {step === 'code' && (
              <Card className="p-8 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">Enter verification code</h3>
                  <p className="text-gray-600">Check your text messages for a 4-digit code</p>
                </div>

                <div className="flex justify-center space-x-4">
                  {[0, 1, 2, 3].map((index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      className="w-16 h-16 text-center text-2xl font-semibold border-2 border-gray-300 rounded-xl focus:border-[#2E7D32] focus:outline-none transition-colors"
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
                  size="lg"
                  onClick={handleVerifyCode}
                  disabled={code.length !== 4}
                  className="w-full"
                >
                  Verify code
                </AppButton>

                <div className="text-center">
                  <button className="text-[#2E7D32] font-medium hover:underline">
                    Didn't receive a code? Resend
                  </button>
                </div>
              </Card>
            )}
          </div>

          {/* Right Side - Map Preview */}
          <div className="space-y-6">
            <Card className="p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Your neighborhood</h4>
              <div className="aspect-square bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center relative overflow-hidden">
                {/* Map Grid Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="grid grid-cols-8 gap-1 p-2 h-full">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`rounded ${
                          [10, 18, 25, 34, 42, 49].includes(i) 
                            ? 'bg-[#2E7D32]' 
                            : 'bg-gray-300'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Center Marker */}
                <div className="relative z-10 text-center">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <p className="font-medium text-gray-900">Your Location</p>
                  <p className="text-sm text-gray-600">Maple Street</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 space-y-4">
              <h4 className="font-semibold text-gray-900">Nearby solar homes</h4>
              <div className="space-y-3">
                {[
                  { name: 'Alex M.', street: 'Maple St', distance: '0.1 mi' },
                  { name: 'Priya K.', street: 'Oak Ave', distance: '0.2 mi' },
                  { name: 'Chen L.', street: 'Birch Rd', distance: '0.3 mi' },
                ].map((neighbor) => (
                  <div key={neighbor.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{neighbor.name}</p>
                      <p className="text-sm text-gray-600">{neighbor.street}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-[#2E7D32]">{neighbor.distance}</p>
                      <p className="text-xs text-gray-500">away</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}