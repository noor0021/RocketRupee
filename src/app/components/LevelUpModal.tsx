import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, X, Zap } from 'lucide-react';
import { Button } from './ui/button';
import confetti from 'canvas-confetti';
import { sfx } from '../hooks/useSound';

interface LevelUpModalProps {
  level: number;
  isOpen: boolean;
  onClose: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({ level, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      sfx.levelUp();
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#a855f7', '#ec4899', '#06b6d4', '#f59e0b'],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#a855f7', '#ec4899', '#06b6d4', '#f59e0b'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="relative max-w-md w-full p-8"
            style={{
              background: '#111',
              border: '2px solid #a855f7',
              boxShadow: '0 0 60px rgba(168,85,247,0.3), 0 0 120px rgba(168,85,247,0.1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#555] hover:text-[#a855f7] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(12)].map((_, i) => {
                const colors = ['#a855f7', '#ec4899', '#06b6d4', '#f59e0b'];
                return (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 0.8, 0],
                      scale: [0, 1, 0],
                      y: [0, -30, -60],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  >
                    <Zap className="w-3 h-3" style={{ color: colors[i % colors.length] }} />
                  </motion.div>
                );
              })}
            </div>

            {/* Content */}
            <div className="text-center relative z-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-28 h-28 mx-auto mb-6 flex items-center justify-center"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  background: 'linear-gradient(135deg, #a855f730, #ec489930)',
                  border: '2px solid #a855f7',
                  boxShadow: '0 0 30px rgba(168,85,247,0.4)',
                }}
              >
                <Trophy className="w-14 h-14 text-[#a855f7]" />
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h2
                  className="text-3xl font-black mb-2 tracking-widest"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  LEVEL UP!
                </h2>
                <p
                  className="text-5xl font-black mb-4"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: '#a855f7',
                    textShadow: '0 0 30px rgba(168,85,247,0.5)',
                  }}
                >
                  {level}
                </p>
                <p className="text-sm mb-8" style={{ fontFamily: 'var(--font-body)', color: '#666' }}>
                  New rank unlocked. Keep pushing, warrior!
                </p>

                <Button
                  onClick={onClose}
                  className="w-full text-base py-5 font-bold tracking-wider"
                  style={{
                    fontFamily: 'var(--font-ui)',
                    background: '#a855f7',
                    color: '#000',
                    borderRadius: 0,
                    boxShadow: '0 0 20px rgba(168,85,247,0.4)',
                  }}
                >
                  CONTINUE
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
