import React, { useState } from 'react';
import { AppButton } from '../design-system/AppButton';
import { Zap, Mail, Lock, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface LoginScreenProps {
  onLoginSuccess: (role: 'seller' | 'buyer') => void;
  onClose?: () => void;
}

export function LoginScreen({ onLoginSuccess, onClose }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    setError('');
    
    // Simulate brief loading for realistic feel
    setTimeout(() => {
      toast.success("Welcome to EnergyLink!");
      // Default to seller role - could be randomized or user-selected
      onLoginSuccess('seller');
      setIsLoading(false);
    }, 800);
  };

  const EnergyLinkLogo = () => (
    <div className="flex items-center justify-center space-x-3 mb-6">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
           style={{ 
             background: 'linear-gradient(135deg, var(--accent-energy-1), var(--accent-energy-2))',
             boxShadow: 'var(--glow-teal)'
           }}>
        <Zap className="w-6 h-6 icon-energy-white" strokeWidth={1.5} />
      </div>
      <span className="text-2xl font-bold text-energy-gradient">EnergyLink</span>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Semi-transparent dark background overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Login Popup */}
      <div className="relative w-full max-w-md bg-[#111113] rounded-2xl shadow-2xl border border-[#262626] p-8 transform transition-all duration-300">
        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#1a1a1d] transition-colors"
            style={{ color: 'var(--txt-muted)' }}
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <EnergyLinkLogo />
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--txt-heading)' }}>
            Join for Free
          </h1>
          <p className="text-sm" style={{ color: 'var(--txt-muted)' }}>
            Access your energy trading dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium" style={{ color: 'var(--txt-heading)' }}>
              Email Address
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: 'var(--txt-muted)' }}>
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full h-12 pl-10 pr-4 rounded-xl border border-[#262626] bg-[#1a1a1d] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF88] focus:border-transparent transition-all"
                style={{ 
                  backgroundColor: 'var(--glass-surface)',
                  borderColor: 'rgba(0, 245, 212, 0.2)',
                  color: 'var(--txt-heading)'
                }}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium" style={{ color: 'var(--txt-heading)' }}>
              Password
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: 'var(--txt-muted)' }}>
                <Lock className="w-5 h-5" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full h-12 pl-10 pr-4 rounded-xl border border-[#262626] bg-[#1a1a1d] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF88] focus:border-transparent transition-all"
                style={{ 
                  backgroundColor: 'var(--glass-surface)',
                  borderColor: 'rgba(0, 245, 212, 0.2)',
                  color: 'var(--txt-heading)'
                }}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg bg-red-900/20 border border-red-500/30">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Join for Free Button */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full h-12 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            style={{
              background: 'linear-gradient(135deg, #00FF88, #00E676)',
              boxShadow: '0 4px 20px rgba(0, 255, 136, 0.3)'
            }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Signing in...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Join for Free</span>
              </div>
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs" style={{ color: 'var(--txt-muted)' }}>
            Need help? Contact{' '}
            <a 
              href="mailto:support@energylink.com" 
              className="hover:underline transition-all"
              style={{ color: 'var(--accent-energy-1)' }}
            >
              support@energylink.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}