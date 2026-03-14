import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Lock, Rocket, ArrowLeft, Zap, TrendingUp, Shield, Layers, Target } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { useNavigate } from 'react-router';
import { missions } from '../data/missions';
import { MissionModal } from './MissionModal';
import { sfx } from '../hooks/useSound';

const missionIcons = [Rocket, Zap, TrendingUp, Shield, Layers, Target];
const missionColors = ['#a855f7', '#ec4899', '#06b6d4', '#f59e0b', '#10b981', '#a855f7'];

export const MissionsPage: React.FC = () => {
  const { missionProgress } = useGame();
  const navigate = useNavigate();
  const [selectedMission, setSelectedMission] = useState<string | null>(null);

  const isMissionCompleted = (missionId: string) =>
    missionProgress.some(p => p.missionId === missionId && p.completed);

  const getCompletedCount = () => missionProgress.filter(p => p.completed).length;

  const isMissionLocked = (index: number) =>
    index > 0 && !isMissionCompleted(missions[index - 1].id);

  return (
    <div className="min-h-screen p-6 relative">
      <div className="max-w-5xl mx-auto relative z-10">
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
            onMouseEnter={e => (e.currentTarget.style.color = '#a855f7')}
            onMouseLeave={e => (e.currentTarget.style.color = '#555')}
          >
            <ArrowLeft className="w-4 h-4" />
            {'<< BACK TO BASE'}
          </button>

          <div className="flex items-center justify-between">
            <div>
              <h1
                className="text-2xl font-black tracking-wider mb-1"
                style={{ fontFamily: 'var(--font-heading)', color: '#ec4899' }}
              >
                QUEST LOG
              </h1>
              <p className="text-sm" style={{ fontFamily: 'var(--font-body)', color: '#555' }}>
                // select a quest to begin
              </p>
            </div>
            <div
              className="px-4 py-2 text-right"
              style={{ background: '#111', border: '1px solid #2a2a2a' }}
            >
              <p className="text-[9px] tracking-wider" style={{ color: '#555', fontFamily: 'var(--font-body)' }}>
                PROGRESS
              </p>
              <p className="text-lg font-bold" style={{ color: '#10b981', fontFamily: 'var(--font-heading)' }}>
                {getCompletedCount()}/{missions.length}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Hex Grid with mission cards */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          {missions.map((mission, index) => {
            const completed = isMissionCompleted(mission.id);
            const locked = isMissionLocked(index);
            const Icon = completed ? CheckCircle2 : locked ? Lock : missionIcons[index % missionIcons.length];
            const color = missionColors[index % missionColors.length];

            return (
              <motion.div
                key={mission.id}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.95 },
                  show: { opacity: 1, y: 0, scale: 1 }
                }}
              >
                <motion.button
                  whileHover={!locked ? {
                    scale: 1.02,
                    x: 4,
                    boxShadow: `0 0 25px ${color}20`,
                    borderColor: `${color}80`
                  } : {}}
                  whileTap={!locked ? { scale: 0.98 } : {}}
                  onClick={() => { sfx.click(); !locked && !completed && setSelectedMission(mission.id); }}
                  disabled={locked}
                  className="w-full text-left p-5 relative overflow-hidden transition-all duration-300"
                  style={{
                    background: locked ? 'rgba(10, 10, 10, 0.4)' : 'rgba(17, 17, 17, 0.6)',
                    backdropFilter: 'blur(12px)',
                    border: `1px solid ${locked ? '#1a1a1a' : completed ? '#10b98140' : `${color}40`}`,
                    opacity: locked ? 0.6 : 1,
                    cursor: locked ? 'not-allowed' : completed ? 'default' : 'pointer',
                  }}
                >
                  {/* Fog overlay for locked */}
                  {locked && (
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.5) 80%)',
                      }}
                    />
                  )}

                  <div className="relative z-10 flex items-start gap-4">
                    {/* Hex icon */}
                    <div
                      className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                      style={{
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                        background: locked ? '#1a1a1a' : completed ? '#10b98120' : `${color}15`,
                        border: `1px solid ${locked ? '#333' : completed ? '#10b981' : color}`,
                      }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: locked ? '#444' : completed ? '#10b981' : color }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3
                          className="text-sm font-bold tracking-wide"
                          style={{
                            fontFamily: 'var(--font-heading)',
                            color: locked ? '#444' : '#e0e0e0',
                            fontSize: '0.8rem',
                          }}
                        >
                          {mission.title.toUpperCase()}
                        </h3>
                        {completed && (
                          <span
                            className="text-[9px] px-2 py-0.5 tracking-wider flex-shrink-0"
                            style={{
                              background: '#10b98120',
                              color: '#10b981',
                              fontFamily: 'var(--font-ui)',
                            }}
                          >
                            CLEARED
                          </span>
                        )}
                      </div>

                      <p
                        className="text-xs mb-3 line-clamp-2"
                        style={{
                          fontFamily: 'var(--font-body)',
                          color: locked ? '#333' : '#555',
                          fontSize: '0.7rem',
                        }}
                      >
                        {mission.description}
                      </p>

                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="text-[9px] px-2 py-0.5 tracking-wider"
                          style={{
                            background: locked ? '#1a1a1a' : `${color}15`,
                            color: locked ? '#333' : color,
                            fontFamily: 'var(--font-body)',
                          }}
                        >
                          +{mission.xpReward} XP
                        </span>
                        {mission.badge && (
                          <span
                            className="text-[9px] px-2 py-0.5 tracking-wider"
                            style={{
                              background: '#a855f715',
                              color: '#a855f7',
                              fontFamily: 'var(--font-body)',
                            }}
                          >
                            ★ BADGE
                          </span>
                        )}
                        <span
                          className="text-[9px] px-2 py-0.5 tracking-wider uppercase"
                          style={{
                            background:
                              mission.difficulty === 'easy' ? '#10b98115' :
                                mission.difficulty === 'medium' ? '#f59e0b15' :
                                  '#ef444415',
                            color:
                              mission.difficulty === 'easy' ? '#10b981' :
                                mission.difficulty === 'medium' ? '#f59e0b' :
                                  '#ef4444',
                            fontFamily: 'var(--font-body)',
                          }}
                        >
                          {mission.difficulty}
                        </span>
                      </div>

                      {locked && (
                        <p
                          className="text-[10px] mt-2"
                          style={{ fontFamily: 'var(--font-body)', color: '#333' }}
                        >
                          ⚿ Complete previous quest to unlock
                        </p>
                      )}
                    </div>
                  </div>
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Mission Modal */}
      <AnimatePresence>
        {selectedMission && (
          <MissionModal
            missionId={selectedMission}
            onClose={() => setSelectedMission(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
