import React, { useState } from 'react';
import { AppButton } from '../design-system/AppButton';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { AppInput } from '../design-system/AppInput';
import { Menu, X, Zap } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface MainNavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  showAuthSection?: boolean;
}

export function MainNavigation({ currentScreen, onNavigate, showAuthSection = true }: MainNavigationProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'how-it-works', label: 'How it works' },
    { id: 'community', label: 'Community' },
  ];

  const handleLogin = () => {
    if (loginForm.email && loginForm.password) {
      toast.success("Logged in successfully!");
      setShowLoginModal(false);
      setLoginForm({ email: '', password: '' });
    }
  };

  const EnergyLinkLogo = () => (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-1">
        <Zap className="w-7 h-7 text-[#2E7D32]" strokeWidth={1.5} />
      </div>
      <span className="text-2xl font-bold text-gray-900">EnergyLink</span>
    </div>
  );

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => onNavigate('home')} className="flex items-center">
            <EnergyLinkLogo />
          </button>

          {/* Center Navigation */}
          <div className="flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = currentScreen === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                    isActive 
                      ? 'bg-[#2E7D32] text-white' 
                      : 'text-gray-600 hover:text-[#2E7D32] hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Section */}
          {showAuthSection && (
            <div className="flex items-center space-x-4">
              <AppButton
                variant="tertiary"
                onClick={() => setShowLoginModal(true)}
              >
                Log in
              </AppButton>
              <AppButton
                variant="primary"
                onClick={() => onNavigate('signup')}
              >
                Join for Free
              </AppButton>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => onNavigate('home')} className="flex items-center">
            <div className="flex items-center space-x-2">
              <Zap className="w-6 h-6 text-[#2E7D32]" strokeWidth={1.5} />
              <span className="text-xl font-bold text-gray-900">EnergyLink</span>
            </div>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-100"
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {showMobileMenu && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <div className="p-4 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setShowMobileMenu(false);
                  }}
                  className="block w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                >
                  {item.label}
                </button>
              ))}
              
              {showAuthSection && (
                <div className="border-t border-gray-200 pt-3 space-y-2">
                  <AppButton
                    variant="tertiary"
                    onClick={() => {
                      setShowLoginModal(true);
                      setShowMobileMenu(false);
                    }}
                    className="w-full"
                  >
                    Log in
                  </AppButton>
                  <AppButton
                    variant="primary"
                    onClick={() => {
                      onNavigate('signup');
                      setShowMobileMenu(false);
                    }}
                    className="w-full"
                  >
                    Join for Free
                  </AppButton>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Login Modal */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Log in to EnergyLink</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <AppInput
                type="email"
                label="Email"
                value={loginForm.email}
                onChange={(value) => setLoginForm(prev => ({ ...prev, email: value }))}
                placeholder="your@email.com"
              />
              
              <AppInput
                type="password"
                label="Password"
                value={loginForm.password}
                onChange={(value) => setLoginForm(prev => ({ ...prev, password: value }))}
                placeholder="••••••••"
              />
            </div>

            <div className="text-center">
              <button 
                className="text-[#2E7D32] font-medium hover:underline"
                onClick={() => toast.info("Password reset link sent to your email")}
              >
                Forgot password?
              </button>
            </div>

            <div className="flex space-x-3">
              <AppButton
                variant="secondary"
                onClick={() => setShowLoginModal(false)}
                className="flex-1"
              >
                Cancel
              </AppButton>
              <AppButton
                variant="primary"
                onClick={handleLogin}
                disabled={!loginForm.email || !loginForm.password}
                className="flex-1"
              >
                Log in
              </AppButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}