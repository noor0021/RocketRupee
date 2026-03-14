import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Trophy, Medal, Award, Swords } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useGame } from '../context/GameContext';
import { LeaderboardEntry } from '../types';

export const Leaderboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useGame();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);

  useEffect(() => {
    const savedLeaderboard = localStorage.getItem('rocketrupee_leaderboard');
    let leaders: LeaderboardEntry[] = savedLeaderboard ? JSON.parse(savedLeaderboard) : [];

    if (user) {
      leaders = leaders.filter(l => l.id !== user.id);
      leaders.push({ id: user.id, name: user.name, xp: user.xp, level: user.level });
      leaders.sort((a, b) => b.xp - a.xp);
      localStorage.setItem('rocketrupee_leaderboard', JSON.stringify(leaders));
      const rank = leaders.findIndex(l => l.id === user.id) + 1;
      setUserRank(rank);
    }

    setLeaderboard(leaders);
  }, [user]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-6 h-6 text-[#f59e0b]" />;
      case 2: return <Medal className="w-6 h-6 text-[#888]" />;
      case 3: return <Award className="w-6 h-6 text-[#ec4899]" />;
      default: return (
        <span className="text-sm font-bold" style={{ fontFamily: 'var(--font-heading)', color: '#444' }}>
          #{rank}
        </span>
      );
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return '#f59e0b';
      case 2: return '#888888';
      case 3: return '#ec4899';
      default: return '#2a2a2a';
    }
  };

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
            onMouseEnter={e => (e.currentTarget.style.color = '#f59e0b')}
            onMouseLeave={e => (e.currentTarget.style.color = '#555')}
          >
            <ArrowLeft className="w-4 h-4" />
            {'<< BACK TO BASE'}
          </button>

          <div className="text-center mb-6">
            <h1
              className="text-2xl font-black tracking-wider mb-1"
              style={{ fontFamily: 'var(--font-heading)', color: '#f59e0b' }}
            >
              ARENA RANKINGS
            </h1>
            <p className="text-sm" style={{ fontFamily: 'var(--font-body)', color: '#555' }}>
              // prove your dominance
            </p>
          </div>

          {/* User rank card */}
          {userRank && (
            <div
              className="p-4 mb-6 flex items-center justify-between"
              style={{
                background: '#ec489910',
                border: '1px solid #ec489940',
                boxShadow: '0 0 20px rgba(236,72,153,0.1)',
              }}
            >
              <div>
                <p className="text-[10px] tracking-wider" style={{ fontFamily: 'var(--font-body)', color: '#ec4899aa' }}>
                  YOUR RANK
                </p>
                <p className="text-2xl font-black" style={{ fontFamily: 'var(--font-heading)', color: '#ec4899' }}>
                  #{userRank}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Swords className="w-5 h-5 text-[#ec4899]" />
                <div className="text-right">
                  <p className="text-[10px] tracking-wider" style={{ fontFamily: 'var(--font-body)', color: '#ec4899aa' }}>
                    YOUR XP
                  </p>
                  <p className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)', color: '#ec4899' }}>
                    {user?.xp.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Leaderboard entries */}
        <div className="space-y-2">
          {leaderboard.map((entry, index) => {
            const rank = index + 1;
            const isCurrentUser = entry.id === user?.id;
            const rankColor = getRankColor(rank);

            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: index * 0.04 }}
              >
                <div
                  className="p-4 flex items-center gap-4 transition-all"
                  style={{
                    background: isCurrentUser ? 'rgba(236,72,153,0.08)' : 'rgba(17, 17, 17, 0.6)',
                    backdropFilter: 'blur(12px)',
                    border: `1px solid ${isCurrentUser ? '#ec489950' : rank <= 3 ? `${rankColor}30` : 'rgba(255,255,255,0.08)'}`,
                    boxShadow: isCurrentUser ? '0 0 15px rgba(236,72,153,0.1)' : 'none',
                  }}
                >
                  {/* Rank */}
                  <div className="w-10 flex items-center justify-center">
                    {getRankIcon(rank)}
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3
                        className="text-sm font-bold tracking-wide"
                        style={{ fontFamily: 'var(--font-heading)', color: '#e0e0e0', fontSize: '0.8rem' }}
                      >
                        {entry.name.toUpperCase()}
                        {isCurrentUser && (
                          <span className="ml-2 text-[10px]" style={{ color: '#ec4899' }}>(YOU)</span>
                        )}
                      </h3>
                    </div>
                    <p className="text-[10px] tracking-wider" style={{ fontFamily: 'var(--font-body)', color: '#555' }}>
                      LV.{entry.level}
                    </p>
                  </div>

                  {/* XP */}
                  <div className="text-right">
                    <p
                      className="text-lg font-bold"
                      style={{ fontFamily: 'var(--font-heading)', color: rank <= 3 ? rankColor : '#a855f7' }}
                    >
                      {entry.xp.toLocaleString()}
                    </p>
                    <p className="text-[9px] tracking-wider" style={{ fontFamily: 'var(--font-body)', color: '#444' }}>
                      XP
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {leaderboard.length === 0 && (
            <div className="p-12 text-center" style={{ background: 'rgba(17, 17, 17, 0.6)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{ fontFamily: 'var(--font-body)', color: '#444' }}>
                No warriors have entered the arena yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
