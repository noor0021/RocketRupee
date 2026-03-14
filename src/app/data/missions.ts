import { Mission, Badge } from '../types';

export const missions: Mission[] = [
  {
    id: 'mission-1',
    title: 'Start Your First SIP',
    description: 'Learn the basics of SIP investing and set up your first virtual investment',
    xpReward: 100,
    badge: 'sip-starter',
    difficulty: 'easy',
    type: 'interactive',
  },
  {
    id: 'mission-2',
    title: 'Beat Inflation',
    description: 'Understand how inflation erodes purchasing power and why investing matters',
    xpReward: 150,
    badge: 'inflation-slayer',
    difficulty: 'easy',
    type: 'quiz',
  },
  {
    id: 'mission-3',
    title: 'Compounding Power',
    description: 'Experience the magic of compound interest over time',
    xpReward: 200,
    badge: 'compounding-master',
    difficulty: 'medium',
    type: 'simulator',
  },
  {
    id: 'mission-4',
    title: 'Survive a Market Crash',
    description: 'Learn to stay calm during market volatility and understand rupee-cost averaging',
    xpReward: 250,
    badge: 'market-survivor',
    difficulty: 'medium',
    type: 'interactive',
  },
  {
    id: 'mission-5',
    title: 'Build a Balanced Portfolio',
    description: 'Create a diversified investment portfolio to minimize risk',
    xpReward: 300,
    badge: 'portfolio-pro',
    difficulty: 'hard',
    type: 'interactive',
  },
  {
    id: 'mission-6',
    title: 'Rupee Cost Averaging Master',
    description: 'Master the art of investing regularly regardless of market conditions',
    xpReward: 200,
    difficulty: 'medium',
    type: 'quiz',
  },
];

export const badges: Badge[] = [
  {
    id: 'sip-starter',
    name: 'SIP Starter',
    description: 'Completed your first SIP mission',
    icon: '🚀',
  },
  {
    id: 'inflation-slayer',
    name: 'Inflation Slayer',
    description: 'Mastered the concept of beating inflation',
    icon: '🔥',
  },
  {
    id: 'compounding-master',
    name: 'Compounding Master',
    description: 'Understood the power of compound interest',
    icon: '📈',
  },
  {
    id: 'market-survivor',
    name: 'Market Survivor',
    description: 'Stayed strong during market volatility',
    icon: '💪',
  },
  {
    id: 'portfolio-pro',
    name: 'Portfolio Pro',
    description: 'Built a well-balanced investment portfolio',
    icon: '⭐',
  },
  {
    id: 'streak-champion',
    name: 'Streak Champion',
    description: 'Maintained a 7-day learning streak',
    icon: '🔥',
  },
];
