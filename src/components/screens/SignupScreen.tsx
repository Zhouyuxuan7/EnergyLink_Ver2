import React, { useState } from 'react';
import { AppButton } from '../design-system/AppButton';
import { AppInput } from '../design-system/AppInput';
import { Card } from '../ui/card';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Sun, Home, ArrowRight, Mail, Phone } from 'lucide-react';

interface SignupScreenProps {
  onComplete: (data: { role: 'seller' | 'buyer'; email: string; phone: string; verifyBy: 'email' | 'sms' }) => void;
}

export function SignupScreen({ onComplete }: SignupScreenProps) {
  const [step, setStep] = useState<'role' | 'contact'>('role');
  const [selectedRole, setSelectedRole] = useState<'seller' | 'buyer' | null>(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [verifyBy, setVerifyBy] = useState<'email' | 'sms'>('email');

  const handleRoleSelect = (role: 'seller' | 'buyer') => {
    setSelectedRole(role);
  };

  const handleContinueFromRole = () => {
    if (selectedRole) {
      setStep('contact');
    }
  };

  const handleSendVerification = () => {
    if (email && phone) {
      onComplete({
        role: selectedRole!,
        email,
        phone,
        verifyBy
      });
    }
  };

  const isContactFormValid = email.includes('@') && phone.length >= 10;

  if (step === 'role') {
    return (
      <div className="min-h-screen bg-gray-50 py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose your role</h1>
            <p className="text-lg md:text-xl text-gray-600">How would you like to participate in the energy network?</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8">
            {/* Seller Card */}
            <Card 
              className={`p-6 md:p-8 cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${
                selectedRole === 'seller' 
                  ? 'border-[#2E7D32] bg-green-50' 
                  : 'border-gray-200 hover:border-green-300'
              }`}
              onClick={() => handleRoleSelect('seller')}
            >
              <div className="text-center space-y-6">
                <div className="w-16 md:w-20 h-16 md:h-20 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto">
                  <Sun className="w-8 md:w-10 h-8 md:h-10 text-amber-600" />
                </div>
                
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">I have solar</h3>
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
              className={`p-6 md:p-8 cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${
                selectedRole === 'buyer' 
                  ? 'border-[#2E7D32] bg-green-50' 
                  : 'border-gray-200 hover:border-green-300'
              }`}
              onClick={() => handleRoleSelect('buyer')}
            >
              <div className="text-center space-y-6">
                <div className="w-16 md:w-20 h-16 md:h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
                  <Home className="w-8 md:w-10 h-8 md:h-10 text-green-600" />
                </div>
                
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">I want clean power</h3>
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
          <div className="flex justify-center">
            <AppButton
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
              onClick={handleContinueFromRole}
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="max-w-2xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contact & Verification
          </h1>
          <p className="text-lg text-gray-600">
            We'll send you a verification code to confirm your identity
          </p>
        </div>

        <Card className="p-6 md:p-8 space-y-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AppInput
                type="email"
                label="Email address"
                value={email}
                onChange={setEmail}
                placeholder="your@email.com"
                icon={<Mail className="w-5 h-5" />}
                required
              />
              
              <AppInput
                type="tel"
                label="Phone number"
                value={phone}
                onChange={setPhone}
                placeholder="(555) 123-4567"
                icon={<Phone className="w-5 h-5" />}
                required
              />
            </div>
          </div>

          {/* Verification Method */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Verification Method</h3>
            
            <RadioGroup value={verifyBy} onValueChange={setVerifyBy} className="space-y-4">
              <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="email" id="email" />
                <Label htmlFor="email" className="flex-1 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-900">Verify by Email</p>
                      <p className="text-sm text-gray-600">We'll send a code to {email || 'your email'}</p>
                    </div>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="sms" id="sms" />
                <Label htmlFor="sms" className="flex-1 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-900">Verify by SMS</p>
                      <p className="text-sm text-gray-600">We'll text a code to {phone || 'your phone'}</p>
                    </div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Privacy Notice */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Privacy & Security</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Your contact information is kept private and secure</li>
              <li>• Neighbors only see your first name and street</li>
              <li>• You can update privacy settings anytime</li>
              <li>• We never share your data with third parties</li>
            </ul>
          </div>

          {/* Continue Button */}
          <AppButton
            variant="primary"
            size="lg"
            onClick={handleSendVerification}
            disabled={!isContactFormValid}
            className="w-full"
          >
            Send verification
          </AppButton>
        </Card>
      </div>
    </div>
  );
}