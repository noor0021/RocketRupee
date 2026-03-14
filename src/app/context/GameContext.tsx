import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, MissionProgress } from '../types';
import { missions } from '../data/missions';

interface GameContextType {
  user: User | null;
  setUser: (user: User) => void;
  missionProgress: MissionProgress[];
  completeMission: (missionId: string) => void;
  addXP: (amount: number) => void;
  addBadge: (badgeId: string) => void;
  isOnboarded: boolean;
  completeOnboarding: (name: string) => void;
  updatePortfolio: (value: number) => void;
  levelUp: { show: boolean; level: number };
  dismissLevelUp: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

const calculateLevel = (xp: number): number => {
  return Math.floor(xp / 500) + 1;
};

// Mock leaderboard data
const generateMockLeaderboard = () => {
  const names = ['Priya', 'Rahul', 'Aisha', 'Arjun', 'Kavya', 'Rohan', 'Neha', 'Vikram'];
  return names.map((name, index) => ({
    id: `user-${index}`,
    name,
    xp: Math.floor(Math.random() * 3000) + 500,
    level: 0,
  })).sort((a, b) => b.xp - a.xp).map(user => ({
    ...user,
    level: calculateLevel(user.xp),
  }));
};

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [missionProgress, setMissionProgress] = useState<MissionProgress[]>([]);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [levelUp, setLevelUp] = useState({ show: false, level: 0 });

  // Load data from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('rocketrupee_user');
    const savedProgress = localStorage.getItem('rocketrupee_progress');
    const savedOnboarding = localStorage.getItem('rocketrupee_onboarded');

    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      // Update streak
      const today = new Date().toDateString();
      const lastLogin = new Date(parsedUser.lastLogin).toDateString();
      
      if (today !== lastLogin) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const wasYesterday = yesterday.toDateString() === lastLogin;
        
        parsedUser.streak = wasYesterday ? parsedUser.streak + 1 : 1;
        parsedUser.lastLogin = new Date().toISOString();
      }
      
      setUserState(parsedUser);
    }

    if (savedProgress) {
      setMissionProgress(JSON.parse(savedProgress));
    }

    if (savedOnboarding === 'true') {
      setIsOnboarded(true);
    }

    // Initialize mock leaderboard
    if (!localStorage.getItem('rocketrupee_leaderboard')) {
      localStorage.setItem('rocketrupee_leaderboard', JSON.stringify(generateMockLeaderboard()));
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('rocketrupee_user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('rocketrupee_progress', JSON.stringify(missionProgress));
  }, [missionProgress]);

  const setUser = (newUser: User) => {
    setUserState(newUser);
  };

  const completeOnboarding = (name: string) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      xp: 0,
      level: 1,
      portfolioValue: 0,
      badges: [],
      streak: 1,
      lastLogin: new Date().toISOString(),
    };
    setUserState(newUser);
    setIsOnboarded(true);
    localStorage.setItem('rocketrupee_onboarded', 'true');
  };

  const addXP = (amount: number) => {
    if (!user) return;
    
    const newXP = user.xp + amount;
    const newLevel = calculateLevel(newXP);
    const leveledUp = newLevel > user.level;
    
    setUserState({
      ...user,
      xp: newXP,
      level: newLevel,
    });

    if (leveledUp) {
      setLevelUp({ show: true, level: newLevel });
    }

    return leveledUp;
  };

  const addBadge = (badgeId: string) => {
    if (!user || user.badges.includes(badgeId)) return;
    
    setUserState({
      ...user,
      badges: [...user.badges, badgeId],
    });
  };

  const completeMission = (missionId: string) => {
    if (!user) return;

    const alreadyCompleted = missionProgress.some(
      p => p.missionId === missionId && p.completed
    );

    if (alreadyCompleted) return;

    const mission = missions.find(m => m.id === missionId);
    if (!mission) return;

    // Add mission to progress
    setMissionProgress([
      ...missionProgress,
      {
        userId: user.id,
        missionId,
        completed: true,
        completedAt: new Date().toISOString(),
      },
    ]);

    // Award XP
    const leveledUp = addXP(mission.xpReward);

    // Award badge
    if (mission.badge) {
      addBadge(mission.badge);
    }

    return { leveledUp, xpReward: mission.xpReward, badge: mission.badge };
  };

  const updatePortfolio = (value: number) => {
    if (!user) return;
    
    setUserState({
      ...user,
      portfolioValue: value,
    });
  };

  const dismissLevelUp = () => {
    setLevelUp({ show: false, level: 0 });
  };

  return (
    <GameContext.Provider
      value={{
        user,
        setUser,
        missionProgress,
        completeMission,
        addXP,
        addBadge,
        isOnboarded,
        completeOnboarding,
        updatePortfolio,
        levelUp,
        dismissLevelUp,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};