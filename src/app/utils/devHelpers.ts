/**
 * Development helper functions for RocketRupee
 */

export const devHelpers = {
  /**
   * Reset all user data and start fresh
   */
  resetApp: () => {
    localStorage.clear();
    window.location.reload();
    console.log('🚀 RocketRupee data cleared! Refresh to start over.');
  },

  /**
   * Give the user XP instantly
   */
  addXP: (amount: number) => {
    const userData = localStorage.getItem('rocketrupee_user');
    if (userData) {
      const user = JSON.parse(userData);
      user.xp += amount;
      user.level = Math.floor(user.xp / 500) + 1;
      localStorage.setItem('rocketrupee_user', JSON.stringify(user));
      console.log(`✨ Added ${amount} XP! New total: ${user.xp} XP (Level ${user.level})`);
      window.location.reload();
    }
  },

  /**
   * Complete all missions instantly
   */
  completeAllMissions: () => {
    const userData = localStorage.getItem('rocketrupee_user');
    const progressData = localStorage.getItem('rocketrupee_progress');
    
    if (userData) {
      const user = JSON.parse(userData);
      const missions = [
        'mission-1',
        'mission-2',
        'mission-3',
        'mission-4',
        'mission-5',
        'mission-6',
      ];

      const progress = missions.map(id => ({
        userId: user.id,
        missionId: id,
        completed: true,
        completedAt: new Date().toISOString(),
      }));

      localStorage.setItem('rocketrupee_progress', JSON.stringify(progress));
      
      // Add all XP
      user.xp = 1200; // Sum of all mission XP
      user.level = Math.floor(user.xp / 500) + 1;
      user.badges = [
        'sip-starter',
        'inflation-slayer',
        'compounding-master',
        'market-survivor',
        'portfolio-pro',
      ];
      localStorage.setItem('rocketrupee_user', JSON.stringify(user));
      
      console.log('🎉 All missions completed! Total XP: 1200');
      window.location.reload();
    }
  },

  /**
   * View current user data
   */
  showUserData: () => {
    const userData = localStorage.getItem('rocketrupee_user');
    const progressData = localStorage.getItem('rocketrupee_progress');
    
    if (userData) {
      console.log('👤 User Data:', JSON.parse(userData));
      console.log('📊 Progress:', JSON.parse(progressData || '[]'));
    } else {
      console.log('No user data found. Complete onboarding first!');
    }
  },

  /**
   * Set streak to specific number
   */
  setStreak: (days: number) => {
    const userData = localStorage.getItem('rocketrupee_user');
    if (userData) {
      const user = JSON.parse(userData);
      user.streak = days;
      localStorage.setItem('rocketrupee_user', JSON.stringify(user));
      console.log(`🔥 Streak set to ${days} days!`);
      window.location.reload();
    }
  },

  /**
   * Show available dev commands
   */
  help: () => {
    console.log(`
🚀 RocketRupee Developer Tools
================================

Available commands:
- devHelpers.resetApp()          → Clear all data and restart
- devHelpers.addXP(500)           → Add XP instantly
- devHelpers.completeAllMissions()→ Complete all missions
- devHelpers.showUserData()       → View current user data
- devHelpers.setStreak(7)         → Set streak to specific days
- devHelpers.help()               → Show this menu

Example: devHelpers.addXP(1000)
    `);
  },
};

// Make available globally in development
if (typeof window !== 'undefined') {
  (window as any).devHelpers = devHelpers;
  console.log('🚀 RocketRupee loaded! Type "devHelpers.help()" for dev tools.');
}
