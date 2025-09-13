import React, { useState, useEffect } from 'react';
import { AppButton } from '../design-system/AppButton';
import { Card } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Mail, Phone, HelpCircle, Check, Sparkles } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface VerificationScreenProps {
  verifyBy: 'email' | 'sms';
  email: string;
  phone: string;
  onVerified: () => void;
}

export function VerificationScreen({ verifyBy, email, phone, onVerified }: VerificationScreenProps) {
  const [code, setCode] = useState('');
  const [showResendModal, setShowResendModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // Resend timer
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  // Success countdown
  useEffect(() => {
    if (isVerified && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isVerified && countdown === 0) {
      onVerified();
    }
  }, [isVerified, countdown, onVerified]);

  const handleVerify = () => {
    if (code.length >= 4) {
      setIsVerified(true);
    }
  };

  const handleResend = () => {
    setResendTimer(30);
    setCanResend(false);
    setShowResendModal(false);
    toast.success("Verification code sent!");
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center relative overflow-hidden">
        {/* Confetti/Sparkles Effect */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <Sparkles className="w-6 h-6 text-[#FFB300]" />
            </div>
          ))}
        </div>

        <div className="max-w-md text-center space-y-8 relative z-10">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <Check className="w-12 h-12 text-green-600" />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Successfully verified!</h2>
            <p className="text-xl text-gray-600">
              Welcome to EnergyLink! Setting up your trading preferences...
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-2xl font-bold text-[#2E7D32]">
              Continuing in {countdown}...
            </div>
            
            <AppButton
              variant="secondary"
              onClick={onVerified}
              className="px-8"
            >
              Continue now
            </AppButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="max-w-2xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Enter verification code
          </h1>
          <p className="text-lg text-gray-600">
            We sent a code to your {verifyBy === 'email' ? 'email' : 'phone'}
          </p>
          <p className="font-medium text-gray-900 mt-2">
            {verifyBy === 'email' ? email : phone}
          </p>
        </div>

        <Card className="p-6 md:p-8 space-y-8">
          {/* Code Input */}
          <div className="space-y-6">
            <div className="flex justify-center space-x-3 md:space-x-4">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 md:w-16 md:h-16 text-center text-xl md:text-2xl font-semibold border-2 border-gray-300 rounded-xl focus:border-[#2E7D32] focus:outline-none transition-colors"
                  value={code[index] || ''}
                  onChange={(e) => {
                    const newCode = code.split('');
                    newCode[index] = e.target.value;
                    setCode(newCode.join(''));
                    
                    // Auto-focus next input
                    if (e.target.value && index < 5) {
                      const nextInput = e.target.parentNode?.children[index + 1] as HTMLInputElement;
                      nextInput?.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    // Handle backspace
                    if (e.key === 'Backspace' && !code[index] && index > 0) {
                      const prevInput = e.target.parentNode?.children[index - 1] as HTMLInputElement;
                      prevInput?.focus();
                    }
                  }}
                />
              ))}
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 text-gray-500 mb-4">
                {verifyBy === 'email' ? <Mail className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
                <span>Check your {verifyBy === 'email' ? 'email inbox' : 'text messages'}</span>
              </div>
              
              <p className="text-sm text-gray-500">
                The code is usually 4-6 digits long
              </p>
            </div>
          </div>

          {/* Verify Button */}
          <AppButton
            variant="primary"
            size="lg"
            onClick={handleVerify}
            disabled={code.length < 4}
            className="w-full"
          >
            Verify
          </AppButton>

          {/* Help Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <button 
              onClick={() => setShowResendModal(true)}
              className="text-[#2E7D32] font-medium hover:underline"
            >
              Didn't receive a code? Resend
            </button>
            
            <span className="hidden sm:block text-gray-300">•</span>
            
            <button 
              onClick={() => setShowSupportModal(true)}
              className="text-[#2E7D32] font-medium hover:underline flex items-center space-x-1"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Need help? Get customer support</span>
            </button>
          </div>
        </Card>
      </div>

      {/* Resend Modal */}
      <Dialog open={showResendModal} onOpenChange={setShowResendModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Resend verification code</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {!canResend ? (
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  We can resend in
                </p>
                <div className="text-2xl font-bold text-[#2E7D32]">
                  {formatTimer(resendTimer)}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600">
                  Ready to send a new verification code to your {verifyBy === 'email' ? 'email' : 'phone'}?
                </p>
                
                <div className="flex space-x-3">
                  <AppButton
                    variant="secondary"
                    onClick={() => setShowResendModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </AppButton>
                  <AppButton
                    variant="primary"
                    onClick={handleResend}
                    className="flex-1"
                  >
                    Resend now
                  </AppButton>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Support Modal */}
      <Dialog open={showSupportModal} onOpenChange={setShowSupportModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Customer Support</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Frequently Asked Questions</h4>
              
              <div className="space-y-3">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-1">I'm not receiving the code</h5>
                  <p className="text-sm text-gray-600">
                    Check your spam folder for emails, or ensure your phone can receive SMS messages. 
                    Try using the other verification method.
                  </p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-1">The code isn't working</h5>
                  <p className="text-sm text-gray-600">
                    Make sure you're entering the most recent code. Codes expire after 10 minutes.
                  </p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-1">I want to change my contact info</h5>
                  <p className="text-sm text-gray-600">
                    You can update your email and phone number in your account settings after verification.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-semibold text-gray-900 mb-3">Still need help?</h4>
              <p className="text-sm text-gray-600 mb-4">
                Our support team is here to help with any verification issues.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <AppButton
                  variant="secondary"
                  size="sm"
                  onClick={() => window.open('mailto:support@energylink.com?subject=Verification Help')}
                  className="justify-start"
                >
                  Email Support
                </AppButton>
                <AppButton
                  variant="secondary"
                  size="sm"
                  onClick={() => toast.info("Live chat coming soon!")}
                  className="justify-start"
                >
                  Live Chat
                </AppButton>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}