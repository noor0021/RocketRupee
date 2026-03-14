export interface User {
  id: string;
  name: string;
  xp: number;
  level: number;
  portfolioValue: number;
  badges: string[];
  streak: number;
  lastLogin: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  badge?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'quiz' | 'simulator' | 'interactive';
}

export interface MissionProgress {
  userId: string;
  missionId: string;
  completed: boolean;
  completedAt?: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  xp: number;
  level: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
}
