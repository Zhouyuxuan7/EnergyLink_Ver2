import React, { useState } from 'react';
import { Toaster } from './components/ui/sonner';

// Import all screens
import { SplashScreen } from './components/screens/SplashScreen';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import { VerifyAddressScreen } from './components/screens/VerifyAddressScreen';
import { PriceBandScreen } from './components/screens/PriceBandScreen';
import { AutoMatchScreen } from './components/screens/AutoMatchScreen';
import { TradeReceiptScreen } from './components/screens/TradeReceiptScreen';
import { CommunityScreen } from './components/screens/CommunityScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';

type Screen = 'splash' | 'onboarding' | 'verify' | 'priceband' | 'automatch' | 'receipt' | 'community' | 'settings';
type Role = 'seller' | 'buyer' | null;

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [userRole, setUserRole] = useState<Role>(null);
  const [selectedTrade, setSelectedTrade] = useState<any>(null);

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleRoleSelect = (role: 'seller' | 'buyer') => {
    setUserRole(role);
    navigate('verify');
  };

  const handleTradeClick = (trade: any) => {
    setSelectedTrade(trade);
    navigate('receipt');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onGetStarted={() => navigate('onboarding')} />;
      
      case 'onboarding':
        return (
          <OnboardingScreen
            onBack={() => navigate('splash')}
            onRoleSelect={handleRoleSelect}
          />
        );
      
      case 'verify':
        return (
          <VerifyAddressScreen
            onBack={() => navigate('onboarding')}
            onVerified={() => navigate('priceband')}
          />
        );
      
      case 'priceband':
        return (
          <PriceBandScreen
            role={userRole!}
            onBack={() => navigate('verify')}
            onComplete={() => navigate('automatch')}
          />
        );
      
      case 'automatch':
        return (
          <AutoMatchScreen
            role={userRole!}
            onBack={() => navigate('priceband')}
            onTradeClick={handleTradeClick}
            onSettings={() => navigate('settings')}
            onCommunity={() => navigate('community')}
          />
        );
      
      case 'receipt':
        return (
          <TradeReceiptScreen
            role={userRole!}
            trade={selectedTrade}
            onBack={() => navigate('automatch')}
            onCommunity={() => navigate('community')}
          />
        );
      
      case 'community':
        return (
          <CommunityScreen
            onBack={() => navigate('automatch')}
            onSettings={() => navigate('settings')}
          />
        );
      
      case 'settings':
        return (
          <SettingsScreen
            onBack={() => navigate('automatch')}
          />
        );
      
      default:
        return <SplashScreen onGetStarted={() => navigate('onboarding')} />;
    }
  };

  return (
    <div className="max-w-[390px] mx-auto min-h-screen bg-white shadow-2xl">
      {renderScreen()}
      <Toaster />
    </div>
  );
}