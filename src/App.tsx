import React, { useState } from 'react';
import { Toaster } from './components/ui/sonner';

// Import all screens
import { HomeScreen } from './components/screens/HomeScreen';
import { PricingScreen } from './components/screens/PricingScreen';
import { HowItWorksScreen } from './components/screens/HowItWorksScreen';
import { SignupScreen } from './components/screens/SignupScreen';
import { VerificationScreen } from './components/screens/VerificationScreen';
import { PriceBandScreenDesktop } from './components/screens/PriceBandScreenDesktop';
import { AutoMatchScreenDesktop } from './components/screens/AutoMatchScreenDesktop';
import { TradeReceiptScreenDesktop } from './components/screens/TradeReceiptScreenDesktop';
import { CommunityScreenDesktop } from './components/screens/CommunityScreenDesktop';
import { SettingsScreenDesktop } from './components/screens/SettingsScreenDesktop';
import { MainNavigation } from './components/layout/MainNavigation';

type Screen = 'home' | 'pricing' | 'how-it-works' | 'community' | 'signup' | 'verification' | 'priceband' | 'automatch' | 'receipt' | 'settings';
type Role = 'seller' | 'buyer' | null;

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [userRole, setUserRole] = useState<Role>(null);
  const [selectedTrade, setSelectedTrade] = useState<any>(null);
  const [signupData, setSignupData] = useState<{
    role: 'seller' | 'buyer';
    email: string;
    phone: string;
    verifyBy: 'email' | 'sms';
  } | null>(null);

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleJoinForFree = () => {
    navigate('signup');
  };

  const handleSignupComplete = (data: { role: 'seller' | 'buyer'; email: string; phone: string; verifyBy: 'email' | 'sms' }) => {
    setSignupData(data);
    setUserRole(data.role);
    navigate('verification');
  };

  const handleVerified = () => {
    navigate('priceband');
  };

  const handleTradeClick = (trade: any) => {
    setSelectedTrade(trade);
    navigate('receipt');
  };

  const showMainNav = !['verification', 'priceband'].includes(currentScreen);
  const showAuthSection = !['automatch', 'receipt', 'settings'].includes(currentScreen);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onJoinForFree={handleJoinForFree} />;
      
      case 'pricing':
        return <PricingScreen onJoinForFree={handleJoinForFree} />;
      
      case 'how-it-works':
        return <HowItWorksScreen onJoinForFree={handleJoinForFree} />;
      
      case 'signup':
        return <SignupScreen onComplete={handleSignupComplete} />;
      
      case 'verification':
        return signupData ? (
          <VerificationScreen
            verifyBy={signupData.verifyBy}
            email={signupData.email}
            phone={signupData.phone}
            onVerified={handleVerified}
          />
        ) : null;
      
      case 'priceband':
        return (
          <PriceBandScreenDesktop
            role={userRole!}
            onComplete={() => navigate('automatch')}
          />
        );
      
      case 'automatch':
        return (
          <AutoMatchScreenDesktop
            role={userRole!}
            onTradeClick={handleTradeClick}
          />
        );
      
      case 'receipt':
        return (
          <TradeReceiptScreenDesktop
            role={userRole!}
            trade={selectedTrade}
            onBack={() => navigate('automatch')}
          />
        );
      
      case 'community':
        return <CommunityScreenDesktop />;
      
      case 'settings':
        return <SettingsScreenDesktop />;
      
      default:
        return <HomeScreen onJoinForFree={handleJoinForFree} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {showMainNav && (
        <MainNavigation 
          currentScreen={currentScreen}
          onNavigate={navigate}
          showAuthSection={showAuthSection}
        />
      )}
      {renderScreen()}
      <Toaster />
    </div>
  );
}