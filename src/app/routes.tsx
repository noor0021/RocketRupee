import { createBrowserRouter, Navigate } from 'react-router';
import { Dashboard } from './components/Dashboard';
import { MissionsPage } from './components/MissionsPage';
import { SIPSimulator } from './components/SIPSimulator';
import { Leaderboard } from './components/Leaderboard';
import { Profile } from './components/Profile';
import { BottomNav } from './components/BottomNav';
import { HudBar } from './components/HudBar';
import { NotFound } from './components/NotFound';
import { SpaceBackground } from './components/SpaceBackground';

import { AnimatePresence, motion } from 'motion/react';
import { useLocation } from 'react-router';
import { useMobile } from './hooks/useMobile';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isMobile = useMobile();
  return (
    <div className="flex min-h-screen bg-[#080808] relative overflow-hidden">
      <SpaceBackground />
      <BottomNav />
      {/* Main Content Area */}
      <div
        className="flex-1 flex flex-col relative z-10"
        style={{ marginLeft: isMobile ? 0 : 64, paddingBottom: isMobile ? 64 : 0 }}
      >
        <HudBar />
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/dashboard',
    element: <Layout><Dashboard /></Layout>,
  },
  {
    path: '/missions',
    element: <Layout><MissionsPage /></Layout>,
  },
  {
    path: '/simulator',
    element: <Layout><SIPSimulator /></Layout>,
  },
  {
    path: '/leaderboard',
    element: <Layout><Leaderboard /></Layout>,
  },
  {
    path: '/profile',
    element: <Layout><Profile /></Layout>,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);