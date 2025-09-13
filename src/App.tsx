import React, { useState, useEffect } from 'react';
import { Toaster } from './components/ui/sonner';

// Import all screens
import { HomeScreen } from './components/screens/HomeScreen';
import { HowItWorksScreen } from './components/screens/HowItWorksScreen';
import { ImpactScreen } from './components/screens/ImpactScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { SignupScreen } from './components/screens/SignupScreen';
import { VerificationScreen } from './components/screens/VerificationScreen';
import { PriceBandScreenDesktop } from './components/screens/PriceBandScreenDesktop';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { TradeReceiptScreenDesktop } from './components/screens/TradeReceiptScreenDesktop';
import { CommunityScreenNew } from './components/screens/CommunityScreenNew';
import { SettingsScreenDesktop } from './components/screens/SettingsScreenDesktop';
import { ComponentsScreen } from './components/screens/ComponentsScreen';
import { StyleGuideScreen } from './components/screens/StyleGuideScreen';
import { MainNavigation } from './components/layout/MainNavigation';
import { TopNavigation } from './components/layout/TopNavigation';

type Screen = 'home' | 'how-it-works' | 'impact' | 'community' | 'login' | 'signup' | 'verification' | 'priceband' | 'dashboard' | 'receipt' | 'settings' | 'components' | 'style-guide';
type Role = 'seller' | 'buyer' | null;

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [userRole, setUserRole] = useState<Role>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState<any>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [autoTradeEnabled, setAutoTradeEnabled] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [signupData, setSignupData] = useState<{
    role: 'seller' | 'buyer';
    email: string;
    phone: string;
    verifyBy: 'email' | 'sms';
  } | null>(null);

  const navigate = (screen: Screen) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentScreen(screen);
      setIsTransitioning(false);
    }, 150);
  };

  const handleJoinForFree = () => {
    navigate('signup');
  };

  const handleLoginSuccess = (role: 'seller' | 'buyer') => {
    setUserRole(role);
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
  };

  const handleSignOut = () => {
    setUserRole(null);
    setIsLoggedIn(false);
    setSignupData(null);
    setCurrentScreen('home');
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

  // Navigation visibility logic
  const isPublicScreen = ['home', 'how-it-works', 'impact', 'style-guide'].includes(currentScreen);
  const isAuthScreen = ['login', 'signup', 'verification', 'priceband'].includes(currentScreen);
  const isProtectedScreen = ['dashboard', 'receipt', 'settings', 'community'].includes(currentScreen);
  
  const showMainNav = isPublicScreen || (isAuthScreen && !isLoggedIn);
  const showTopNav = isProtectedScreen && isLoggedIn;
  const showAuthSection = isPublicScreen || (isAuthScreen && !isLoggedIn);

  const renderScreen = () => {
    // Only redirect if we're not in the middle of a login process
    // Redirect to home if trying to access protected screens without auth
    if (isProtectedScreen && !isLoggedIn && currentScreen !== 'login') {
      navigate('home');
      return null;
    }

    // Redirect to dashboard if trying to access auth screens while logged in
    // But not if we just logged in (to avoid redirect loops)
    if (isAuthScreen && isLoggedIn && currentScreen !== 'login') {
      navigate('dashboard');
      return null;
    }

    const screenContent = (() => {
      switch (currentScreen) {
        case 'home':
          return <HomeScreen onJoinForFree={handleJoinForFree} />;
        
        case 'how-it-works':
          return <HowItWorksScreen onJoinForFree={handleJoinForFree} />;
        
        case 'impact':
          return <ImpactScreen onJoinForFree={handleJoinForFree} />;
        
        case 'login':
          return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
        
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
              onComplete={() => {
                setIsLoggedIn(true);
                setCurrentScreen('dashboard');
              }}
            />
          );
        
        case 'dashboard':
          return (
            <DashboardScreen
              role={userRole!}
            />
          );
        
        case 'receipt':
          return (
            <TradeReceiptScreenDesktop
              role={userRole!}
              trade={selectedTrade}
              onBack={() => setCurrentScreen('dashboard')}
            />
          );
        
        case 'community':
          return <CommunityScreenNew />;
        
        case 'settings':
          return (
            <SettingsScreenDesktop 
              isDarkMode={isDarkMode}
              onThemeToggle={() => setIsDarkMode(!isDarkMode)}
            />
          );
        
        case 'components':
          return <ComponentsScreen />;
        
        case 'style-guide':
          return <StyleGuideScreen />;
        
        default:
          return <HomeScreen onJoinForFree={handleJoinForFree} />;
      }
    })();

    return (
      <div 
        className={`transition-all duration-300 ease-in-out ${
          isTransitioning 
            ? 'opacity-0 transform translate-y-4' 
            : 'opacity-100 transform translate-y-0'
        }`}
      >
        {screenContent}
      </div>
    );
  };

  return (
    <div className="min-h-screen dark" 
         style={{ background: 'linear-gradient(180deg, #0B0F14 0%, #121820 100%)' }}>
      {showMainNav && (
        <MainNavigation 
          currentScreen={currentScreen}
          onNavigate={navigate}
          showAuthSection={showAuthSection}
          isLoggedIn={isLoggedIn}
        />
      )}
      {showTopNav && (
        <TopNavigation 
          currentScreen={currentScreen}
          onNavigate={navigate}
          userRole={userRole}
          onSignOut={handleSignOut}
          autoTradeEnabled={autoTradeEnabled}
          onAutoTradeToggle={() => setAutoTradeEnabled(!autoTradeEnabled)}
        />
      )}
      {renderScreen()}
      <Toaster />
    </div>
  );
}