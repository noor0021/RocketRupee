import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, User, Trophy, Flame, TrendingUp, Award, Shield } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useGame } from '../context/GameContext';
import { badges as allBadges } from '../data/missions';
import { missions } from '../data/missions';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, missionProgress } = useGame();

  if (!user) return null;

  const earnedBadges = allBadges.filter(badge => user.badges.includes(badge.id));
  const currentLevelXP = (user.level - 1) * 500;
  const nextLevelXP = user.level * 500;
  const progressToNextLevel = ((user.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

  // Rank title based on level
  const getRankTitle = (level: number) => {
    if (level >= 10) return 'LEGENDARY';
    if (level >= 7) return 'DIAMOND';
    if (level >= 5) return 'PLATINUM';
    if (level >= 3) return 'GOLD';
    if (level >= 2) return 'SILVER';
    return 'BRONZE';
  };

  const rankColors: Record<string, string> = {
    BRONZE: '#cd7f32',
    SILVER: '#888888',
    GOLD: '#f59e0b',
    PLATINUM: '#06b6d4',
    DIAMOND: '#a855f7',
    LEGENDARY: '#ec4899',
  };

  const rankTitle = getRankTitle(user.level);
  const rankColor = rankColors[rankTitle];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-sm mb-4 transition-colors"
            style={{ fontFamily: 'var(--font-body)', color: '#555' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#10b981')}
            onMouseLeave={e => (e.currentTarget.style.color = '#555')}
          >
            <ArrowLeft className="w-4 h-4" />
            {'<< BACK TO BASE'}
          </button>
        </motion.div>

        {/* Profile Card with Avatar/Rank Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div
            className="p-8"
            style={{
              background: 'rgba(17, 17, 17, 0.6)',
              backdropFilter: 'blur(12px)',
              border: `1px solid ${rankColor}40`,
              boxShadow: `0 0 30px ${rankColor}10`,
            }}
          >
            <div className="flex items-start gap-6">
              {/* Avatar Hex Badge */}
              <div className="relative flex-shrink-0">
                <div
                  className="w-20 h-20 flex items-center justify-center"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    background: `${rankColor}20`,
                    border: `2px solid ${rankColor}`,
                  }}
                >
                  <Shield className="w-10 h-10" style={{ color: rankColor }} />
                </div>
                {/* Rank badge below avatar */}
                <div
                  className="mt-2 text-center px-2 py-0.5"
                  style={{
                    background: `${rankColor}20`,
                    border: `1px solid ${rankColor}50`,
                  }}
                >
                  <p className="text-[8px] font-bold tracking-widest" style={{ fontFamily: 'var(--font-heading)', color: rankColor }}>
                    {rankTitle}
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <h1
                  className="text-xl font-black tracking-wider mb-1"
                  style={{ fontFamily: 'var(--font-heading)', color: '#e0e0e0' }}
                >
                  {user.name.toUpperCase()}
                </h1>
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-[10px] px-2 py-0.5 tracking-wider"
                    style={{ background: '#a855f715', color: '#a855f7', fontFamily: 'var(--font-body)' }}
                  >
                    LV.{user.level}
                  </span>
                  <span className="text-xs" style={{ fontFamily: 'var(--font-body)', color: '#555' }}>
                    {user.xp.toLocaleString()} XP
                  </span>
                </div>

                {/* XP Progress */}
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[10px] tracking-wider" style={{ fontFamily: 'var(--font-body)', color: '#555' }}>
                      NEXT LEVEL
                    </span>
                    <span className="text-[10px]" style={{ fontFamily: 'var(--font-body)', color: '#a855f7' }}>
                      {Math.round(progressToNextLevel)}%
                    </span>
                  </div>
                  <div className="flex gap-[2px]">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 h-[4px]"
                        style={{
                          background: i < Math.floor(progressToNextLevel / 5) ? '#a855f7' : '#2a2a2a',
                          boxShadow: i < Math.floor(progressToNextLevel / 5) ? '0 0 4px rgba(168,85,247,0.3)' : 'none',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"
        >
          {[
            { icon: TrendingUp, label: 'PORTFOLIO', value: `₹${user.portfolioValue.toLocaleString()}`, color: '#10b981' },
            { icon: Flame, label: 'STREAK', value: `${user.streak}d`, color: '#ec4899' },
            { icon: Trophy, label: 'BADGES', value: `${user.badges.length}`, color: '#a855f7' },
            { icon: Award, label: 'QUESTS', value: `${missionProgress.filter(p => p.completed).length}`, color: '#06b6d4' },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="p-4 text-center"
                style={{
                  background: 'rgba(17, 17, 17, 0.6)',
                  backdropFilter: 'blur(12px)',
                  border: `1px solid ${stat.color}20`,
                }}
              >
                <Icon className="w-5 h-5 mx-auto mb-2" style={{ color: stat.color }} />
                <p className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)', color: stat.color }}>
                  {stat.value}
                </p>
                <p className="text-[9px] tracking-wider" style={{ fontFamily: 'var(--font-body)', color: '#444' }}>
                  {stat.label}
                </p>
              </div>
            );
          })}
        </motion.div>

        {/* Badges Collection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.15 }}
        >
          <div className="p-6" style={{ background: 'rgba(17, 17, 17, 0.6)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h2
              className="text-sm font-bold tracking-wider mb-6 flex items-center gap-2"
              style={{ fontFamily: 'var(--font-heading)', color: '#a855f7', fontSize: '0.75rem' }}
            >
              <Trophy className="w-4 h-4" />
              BADGE COLLECTION
            </h2>

            {earnedBadges.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {earnedBadges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="p-4 flex items-center gap-4"
                    style={{
                      background: '#a855f710',
                      border: '1px solid #a855f730',
                    }}
                  >
                    {/* Hex badge frame */}
                    <div
                      className="w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl"
                      style={{
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                        background: '#a855f720',
                      }}
                    >
                      {badge.icon}
                    </div>
                    <div>
                      <h3
                        className="text-xs font-bold tracking-wide"
                        style={{ fontFamily: 'var(--font-heading)', color: '#e0e0e0', fontSize: '0.7rem' }}
                      >
                        {badge.name.toUpperCase()}
                      </h3>
                      <p className="text-[10px]" style={{ fontFamily: 'var(--font-body)', color: '#555' }}>
                        {badge.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Trophy className="w-12 h-12 mx-auto mb-3" style={{ color: '#2a2a2a' }} />
                <p style={{ fontFamily: 'var(--font-body)', color: '#444', fontSize: '0.8rem' }}>
                  Complete quests to earn badges.
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.2 }}
          className="mt-4"
        >
          <div className="p-6" style={{ background: 'rgba(17, 17, 17, 0.6)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h2
              className="text-sm font-bold tracking-wider mb-6"
              style={{ fontFamily: 'var(--font-heading)', color: '#06b6d4', fontSize: '0.75rem' }}
            >
              ACTIVITY LOG
            </h2>

            {missionProgress.filter(p => p.completed).length > 0 ? (
              <div className="space-y-2">
                {missionProgress
                  .filter(p => p.completed)
                  .sort((a, b) =>
                    new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime()
                  )
                  .slice(0, 5)
                  .map((progress) => {
                    const mission = missions.find(m => m.id === progress.missionId);
                    if (!mission) return null;

                    return (
                      <div
                        key={progress.missionId}
                        className="flex items-center justify-between p-3"
                        style={{ background: '#0a0a0a', border: '1px solid #1a1a1a' }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 flex items-center justify-center"
                            style={{
                              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                              background: '#10b98120',
                            }}
                          >
                            <Trophy className="w-4 h-4 text-[#10b981]" />
                          </div>
                          <div>
                            <p className="text-xs font-bold" style={{ fontFamily: 'var(--font-ui)', color: '#e0e0e0' }}>
                              {mission.title}
                            </p>
                            <p className="text-[10px]" style={{ fontFamily: 'var(--font-body)', color: '#444' }}>
                              {new Date(progress.completedAt!).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-bold" style={{ fontFamily: 'var(--font-heading)', color: '#a855f7' }}>
                          +{mission.xpReward}
                        </span>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className="text-center py-8">
                <Award className="w-12 h-12 mx-auto mb-3" style={{ color: '#2a2a2a' }} />
                <p style={{ fontFamily: 'var(--font-body)', color: '#444', fontSize: '0.8rem' }}>
                  No quests completed yet. Enter the arena!
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
