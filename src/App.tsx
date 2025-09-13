import React, { useState, useEffect } from 'react';
import { Toaster } from './components/ui/sonner';

// Import all screens
import { HomeScreen } from './components/screens/HomeScreen';
import { HowItWorksScreen } from './components/screens/HowItWorksScreen';
import { ImpactScreen } from './components/screens/ImpactScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { PriceBandScreenDesktop } from './components/screens/PriceBandScreenDesktop';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { TradeReceiptScreenDesktop } from './components/screens/TradeReceiptScreenDesktop';
import { CommunityScreenNew } from './components/screens/CommunityScreenNew';
import { SettingsScreenDesktop } from './components/screens/SettingsScreenDesktop';
import { ComponentsScreen } from './components/screens/ComponentsScreen';
import { StyleGuideScreen } from './components/screens/StyleGuideScreen';
import { MainNavigation } from './components/layout/MainNavigation';
import { TopNavigation } from './components/layout/TopNavigation';

type Screen = 'home' | 'how-it-works' | 'impact' | 'community' | 'verification' | 'priceband' | 'dashboard' | 'receipt' | 'settings' | 'components' | 'style-guide';
type Role = 'seller' | 'buyer' | null;

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [userRole, setUserRole] = useState<Role>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState<any>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [autoTradeEnabled, setAutoTradeEnabled] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const navigate = (screen: Screen) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentScreen(screen);
      setIsTransitioning(false);
    }, 150);
  };

  const handleJoinForFree = () => {
    setShowLoginPopup(true);
  };

  const handleLoginSuccess = (role: 'seller' | 'buyer') => {
    setUserRole(role);
    setIsLoggedIn(true);
    setShowLoginPopup(false);
    setCurrentScreen('dashboard');
  };

  const handleSignOut = () => {
    setUserRole(null);
    setIsLoggedIn(false);
    setCurrentScreen('home');
  };


  const handleTradeClick = (trade: any) => {
    setSelectedTrade(trade);
    navigate('receipt');
  };

  // Navigation visibility logic
  const isPublicScreen = ['home', 'how-it-works', 'impact', 'style-guide'].includes(currentScreen);
  const isAuthScreen = ['verification', 'priceband'].includes(currentScreen);
  const isProtectedScreen = ['dashboard', 'receipt', 'settings', 'community'].includes(currentScreen);
  
  const showMainNav = isPublicScreen || (isAuthScreen && !isLoggedIn);
  const showTopNav = isProtectedScreen && isLoggedIn;
  const showAuthSection = isPublicScreen || (isAuthScreen && !isLoggedIn);

  const renderScreen = () => {
    // Redirect to home if trying to access protected screens without auth
    if (isProtectedScreen && !isLoggedIn) {
      navigate('home');
      return null;
    }

    // Redirect to dashboard if trying to access auth screens while logged in
    if (isAuthScreen && isLoggedIn) {
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
          onJoinForFree={handleJoinForFree}
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
      
      {/* Login Popup */}
      {showLoginPopup && (
        <LoginScreen 
          onLoginSuccess={handleLoginSuccess}
          onClose={() => setShowLoginPopup(false)}
        />
      )}
      
      <Toaster />
    </div>
  );
}