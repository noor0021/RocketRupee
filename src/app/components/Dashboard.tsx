import React from 'react';
import { motion } from 'motion/react';
import { Lock, CheckCircle2, Star } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { useNavigate } from 'react-router';
import { missions } from '../data/missions';
import { sfx } from '../hooks/useSound';
import { useMobile } from '../hooks/useMobile';

const missionColors = ['#a78bfa', '#f472b6', '#38bdf8', '#fbbf24', '#34d399', '#c084fc'];

export const Dashboard: React.FC = () => {
  const { user, missionProgress } = useGame();
  const navigate = useNavigate();
  const isMobile = useMobile();

  if (!user) return null;

  const isMissionCompleted = (missionId: string) =>
    missionProgress.some(p => p.missionId === missionId && p.completed);

  const isMissionLocked = (index: number) =>
    index > 0 && !isMissionCompleted(missions[index - 1].id);

  // Winding path positions — alternating left/right like a snake path
  const getPathPosition = (index: number) => {
    const totalWidth = 100; // percentage
    const centerX = 50;
    const amplitude = isMobile ? 18 : 28; // how far left/right nodes swing
    const side = index % 2 === 0 ? -1 : 1;
    return {
      x: centerX + (side * amplitude),
      y: index,
    };
  };

  return (
    <div className="min-h-screen relative">
      {/* Main Content */}
      <div className="relative z-10 px-4 md:px-6 pt-4 pb-24 max-w-lg mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1
            className="text-xl font-black tracking-wider mb-1"
            style={{ fontFamily: 'var(--font-heading)', color: '#fff', textShadow: '0 2px 20px rgba(168,85,247,0.5)' }}
          >
            LEARNING PATH
          </h1>
          <p className="text-xs" style={{ fontFamily: 'var(--font-body)', color: '#c4b5fd' }}>
            // {user.name}'s space journey
          </p>
        </motion.div>

        {/* Winding Path Container */}
        <div className="relative" style={{ minHeight: `${missions.length * 140 + 60}px` }}>
          {/* Path connector SVG */}
          <svg
            className="absolute inset-0 pointer-events-none"
            style={{ width: '100%', height: '100%' }}
          >
            {missions.map((_, index) => {
              if (index === 0) return null;
              const prev = getPathPosition(index - 1);
              const curr = getPathPosition(index);
              const prevCompleted = isMissionCompleted(missions[index - 1].id);

              // Calculate actual pixel positions
              const prevX = (prev.x / 100) * 100 + '%';
              const currX = (curr.x / 100) * 100 + '%';
              const prevY = index * 140 - 140 + 35;
              const currY = index * 140 + 35;

              return (
                <g key={`path-${index}`}>
                  <line
                    x1={prevX}
                    y1={prevY}
                    x2={currX}
                    y2={currY}
                    stroke={prevCompleted ? '#a78bfa' : '#ffffff20'}
                    strokeWidth={prevCompleted ? 3 : 2}
                    strokeDasharray={prevCompleted ? '0' : '8 6'}
                    style={{
                      filter: prevCompleted ? 'drop-shadow(0 0 6px rgba(167,139,250,0.5))' : 'none',
                    }}
                  />
                  {/* Animated dots along completed paths */}
                  {prevCompleted && (
                    <motion.circle
                      r="3"
                      fill="#a78bfa"
                      animate={{
                        cx: [prevX, currX],
                        cy: [prevY, currY],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Mission Nodes */}
          {missions.map((mission, index) => {
            const pos = getPathPosition(index);
            const completed = isMissionCompleted(mission.id);
            const locked = isMissionLocked(index);
            const color = missionColors[index % missionColors.length];
            const isFirst = index === 0;
            const isNext = !locked && !completed;

            return (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: (index % 3) * 0.1,
                  type: 'spring',
                  stiffness: 200,
                  damping: 15
                }}
                className="absolute flex flex-col items-center"
                style={{
                  left: `${pos.x}%`,
                  top: `${index * 140}px`,
                  transform: 'translateX(-50%)',
                  width: '120px',
                }}
              >
                {/* Node circle */}
                <motion.button
                  whileHover={!locked ? { scale: 1.15 } : {}}
                  whileTap={!locked ? { scale: 0.9 } : {}}
                  onClick={() => { sfx.click(); !locked && navigate('/missions'); }}
                  disabled={locked}
                  className="relative flex items-center justify-center"
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    background: locked
                      ? 'rgba(255,255,255,0.08)'
                      : completed
                        ? `linear-gradient(135deg, ${color}, ${color}cc)`
                        : `linear-gradient(135deg, ${color}60, ${color}30)`,
                    border: locked
                      ? '2px dashed rgba(255,255,255,0.15)'
                      : `3px solid ${color}`,
                    boxShadow: locked
                      ? 'none'
                      : isNext
                        ? `0 0 20px ${color}60, 0 0 40px ${color}30`
                        : completed
                          ? `0 0 15px ${color}50`
                          : 'none',
                    cursor: locked ? 'not-allowed' : 'pointer',
                    opacity: locked ? 0.35 : 1,
                  }}
                >
                  {/* Pulse ring for next available level */}
                  {isNext && (
                    <motion.div
                      className="absolute inset-[-6px] rounded-full"
                      style={{ border: `2px solid ${color}` }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.6, 0, 0.6],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}

                  {/* Icon */}
                  {completed ? (
                    <CheckCircle2 className="w-7 h-7 text-white" />
                  ) : locked ? (
                    <Lock className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.3)' }} />
                  ) : (
                    <Star className="w-7 h-7" style={{ color: 'white' }} />
                  )}
                </motion.button>

                {/* Label */}
                <div className="mt-2 text-center">
                  <p
                    className="text-[10px] font-bold tracking-wide leading-tight"
                    style={{
                      fontFamily: 'var(--font-ui)',
                      color: locked ? 'rgba(255,255,255,0.2)' : 'white',
                      textShadow: locked ? 'none' : '0 1px 8px rgba(0,0,0,0.5)',
                    }}
                  >
                    {locked ? 'LOCKED' : mission.title.split(' ').slice(0, 3).join(' ')}
                  </p>
                  {!locked && (
                    <p
                      className="text-[9px] mt-0.5"
                      style={{
                        fontFamily: 'var(--font-body)',
                        color: completed ? '#a7f3d0' : '#e9d5ff',
                      }}
                    >
                      {completed ? '✓ cleared' : `+${mission.xpReward}XP`}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex gap-3 justify-center mt-8"
        >
          {[
            { label: 'COMPLETED', value: `${missionProgress.filter(p => p.completed).length}/${missions.length}`, color: '#34d399' },
            { label: 'BADGES', value: `${user.badges.length}`, color: '#a78bfa' },
            { label: 'STREAK', value: `${user.streak}d`, color: '#f472b6' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="px-4 py-2 text-center"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <p className="text-[8px] tracking-wider" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>
                {stat.label}
              </p>
              <p className="text-sm font-bold" style={{ color: stat.color, fontFamily: 'var(--font-heading)' }}>
                {stat.value}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
