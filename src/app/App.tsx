import React, { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { GameProvider, useGame } from './context/GameContext';
import { SplashScreen } from './components/SplashScreen';
import { Onboarding } from './components/Onboarding';
import { LevelUpModal } from './components/LevelUpModal';
import { router } from './routes';
import './utils/devHelpers'; // Load dev tools

const AppContent: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const { isOnboarded, levelUp, dismissLevelUp } = useGame();

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  if (!isOnboarded) {
    return <Onboarding onComplete={() => {}} />;
  }

  return (
    <>
      <RouterProvider router={router} />
      <LevelUpModal
        level={levelUp.level}
        isOpen={levelUp.show}
        onClose={dismissLevelUp}
      />
    </>
  );
};

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}