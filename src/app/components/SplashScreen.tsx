import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Gamepad2 } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 500);
    const timer2 = setTimeout(() => setStage(2), 2000);
    const timer3 = setTimeout(() => onComplete(), 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#080808] flex items-center justify-center overflow-hidden">
      {/* Floating geometric particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => {
          const shapes = ['▲', '◆', '■', '⬡', '●'];
          const colors = ['#a855f7', '#ec4899', '#06b6d4', '#f59e0b'];
          return (
            <motion.div
              key={i}
              className="absolute text-xs"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                color: colors[i % colors.length],
                opacity: 0.3,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 180, 360],
                opacity: [0.1, 0.4, 0.1],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              {shapes[i % shapes.length]}
            </motion.div>
          );
        })}
      </div>

      {/* Scanline grid lines */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px bg-[#a855f7]"
            style={{ top: `${(i + 1) * 5}%` }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={
            stage >= 2
              ? { scale: 0.5, y: -200, opacity: 0 }
              : stage >= 1
                ? { scale: 1.1, rotate: 0 }
                : { scale: 0, rotate: -180 }
          }
          transition={{
            duration: stage >= 2 ? 1.2 : 0.6,
            type: stage >= 2 ? 'tween' : 'spring',
            ease: stage >= 2 ? 'easeIn' : undefined,
            stiffness: 200,
          }}
          className="relative"
        >
          <div
            className="w-28 h-28 flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #a855f7, #ec4899)',
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              boxShadow: '0 0 40px rgba(168,85,247,0.4)',
            }}
          >
            <Gamepad2 className="w-14 h-14 text-white" strokeWidth={1.5} />
          </div>

          {/* Glow ring */}
          {stage >= 1 && (
            <motion.div
              className="absolute inset-[-8px]"
              style={{
                background: 'transparent',
                border: '2px solid rgba(168,85,247,0.3)',
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.2, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </motion.div>

        {/* Logo text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: stage >= 1 ? 1 : 0, y: stage >= 1 ? 0 : 30 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10 text-center"
        >
          <h1
            className="text-4xl font-black mb-2 tracking-wider"
            style={{
              fontFamily: 'var(--font-heading)',
              background: 'linear-gradient(135deg, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: 'none',
              filter: stage >= 2 ? 'blur(2px)' : 'none',
            }}
          >
            ROCKET<span style={{ WebkitTextFillColor: '#06b6d4', background: 'none', WebkitBackgroundClip: 'unset' }}>RUPEE</span>
          </h1>
        </motion.div>
      </div>

      {/* Launch flash */}
      {stage >= 2 && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 1 }}
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)' }}
        />
      )}
    </div>
  );
};
