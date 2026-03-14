import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Home, Target, Calculator, Trophy, User, Gamepad2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useMobile } from '../hooks/useMobile';
import { sfx } from '../hooks/useSound';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMobile();

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Base', color: '#a855f7', tutorialId: '' },
    { path: '/missions', icon: Target, label: 'Quests', color: '#ec4899', tutorialId: 'nav-quests' },
    { path: '/simulator', icon: Calculator, label: 'Sim', color: '#06b6d4', tutorialId: 'nav-sim' },
    { path: '/leaderboard', icon: Trophy, label: 'Ranks', color: '#f59e0b', tutorialId: 'nav-ranks' },
    { path: '/profile', icon: User, label: 'Player', color: '#10b981', tutorialId: 'nav-player' },
  ];

  // ─── MOBILE: Bottom Tab Bar ───
  if (isMobile) {
    return (
      <div
        className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around px-2 py-1"
        style={{
          background: 'rgba(10, 10, 10, 0.95)',
          backdropFilter: 'blur(16px)',
          borderTop: '1px solid #2a2a2a',
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <motion.button
              key={item.path}
              onClick={() => { sfx.navigate(); navigate(item.path); }}
              whileTap={{ scale: 0.85 }}
              className="flex flex-col items-center gap-0.5 py-1.5 px-3 relative"
              {...(item.tutorialId ? { 'data-tutorial': item.tutorialId } : {})}
            >
              {isActive && (
                <motion.div
                  layoutId="mobileActive"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-[3px]"
                  style={{ background: item.color, boxShadow: `0 0 10px ${item.color}` }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <Icon
                className="w-5 h-5"
                style={{ color: isActive ? item.color : '#555' }}
              />
              <span
                className="text-[9px] font-bold tracking-wider"
                style={{
                  fontFamily: 'var(--font-ui)',
                  color: isActive ? item.color : '#555',
                }}
              >
                {item.label.toUpperCase()}
              </span>
            </motion.button>
          );
        })}
      </div>
    );
  }

  // ─── DESKTOP: Left Sidebar ───
  return (
    <div className="fixed left-0 top-0 bottom-0 w-16 bg-[#0a0a0a] border-r border-[#2a2a2a] z-40 flex flex-col items-center py-4">
      {/* Logo */}
      <motion.div
        className="w-10 h-10 flex items-center justify-center mb-8 cursor-pointer"
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate('/dashboard')}
      >
        <Gamepad2 className="w-7 h-7 text-[#a855f7]" />
      </motion.div>

      {/* Nav Items */}
      <div className="flex flex-col items-center gap-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <div key={item.path} className="relative group" {...(item.tutorialId ? { 'data-tutorial': item.tutorialId } : {})}>
              <motion.button
                onClick={() => { sfx.navigate(); navigate(item.path); }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative w-10 h-10 flex items-center justify-center transition-all"
                style={{
                  background: isActive ? `${item.color}15` : 'transparent',
                }}
              >
                {/* Active left bar */}
                {isActive && (
                  <motion.div
                    layoutId="sidebarActive"
                    className="absolute left-[-12px] top-1 bottom-1 w-[3px]"
                    style={{ background: item.color, boxShadow: `0 0 10px ${item.color}` }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon
                  className="w-5 h-5 relative z-10"
                  style={{ color: isActive ? item.color : '#666' }}
                />
              </motion.button>

              {/* Tooltip */}
              <div
                className="absolute left-14 top-1/2 -translate-y-1/2 px-3 py-1.5 text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50"
                style={{
                  background: '#111',
                  border: `1px solid ${item.color}`,
                  color: item.color,
                  fontFamily: 'var(--font-ui)',
                  boxShadow: `0 0 10px ${item.color}30`,
                }}
              >
                {item.label}
                <div
                  className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0"
                  style={{
                    borderTop: '5px solid transparent',
                    borderBottom: '5px solid transparent',
                    borderRight: `5px solid ${item.color}`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom decoration */}
      <div className="w-6 h-[2px] bg-[#2a2a2a] mt-4" />
    </div>
  );
};
