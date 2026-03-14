import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Trophy, Sparkles, Zap } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { missions, badges } from '../data/missions';
import { Button } from './ui/button';
import confetti from 'canvas-confetti';
import { sfx } from '../hooks/useSound';

interface MissionModalProps {
  missionId: string;
  onClose: () => void;
}

export const MissionModal: React.FC<MissionModalProps> = ({ missionId, onClose }) => {
  const { completeMission, user } = useGame();
  const [stage, setStage] = useState<'intro' | 'activity' | 'complete'>('intro');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [flashIndex, setFlashIndex] = useState<number | null>(null);

  const mission = missions.find(m => m.id === missionId);
  if (!mission) return null;

  const missionIndex = missions.findIndex(m => m.id === missionId);
  const totalSteps = 3; // intro, activity, complete
  const currentStep = stage === 'intro' ? 1 : stage === 'activity' ? 2 : 3;

  const handleAnswerSelect = (index: number) => {
    sfx.click();
    setFlashIndex(index);
    setTimeout(() => {
      setFlashIndex(null);
      setSelectedAnswer(index);
      // Play correct/wrong sound after flash
      const content = getMissionContent();
      if (index === content.correctAnswer) {
        sfx.correct();
      } else {
        sfx.wrong();
      }
    }, 200);
  };

  const handleComplete = () => {
    sfx.complete();
    completeMission(missionId);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#a855f7', '#ec4899', '#06b6d4', '#f59e0b'],
    });
    setStage('complete');
  };

  const getMissionContent = () => {
    switch (missionId) {
      case 'mission-1':
        return { question: 'What does SIP stand for?', options: ['Simple Interest Plan', 'Systematic Investment Plan', 'Stock Investment Portfolio', 'Savings Interest Program'], correctAnswer: 1, explanation: 'SIP stands for Systematic Investment Plan — a disciplined way to invest a fixed amount regularly in mutual funds.' };
      case 'mission-2':
        return { question: 'If inflation is 6% per year, what should your investment returns be to beat inflation?', options: ['Less than 6%', 'Exactly 6%', 'More than 6%', "It doesn't matter"], correctAnswer: 2, explanation: 'Your returns must be MORE than the inflation rate to actually grow your wealth in real terms!' };
      case 'mission-3':
        return { question: 'In compounding, what earns returns over time?', options: ['Only your initial investment', 'Only your monthly contributions', 'Both principal and accumulated returns', 'Only the interest'], correctAnswer: 2, explanation: "Compounding means you earn returns on your principal AND on the returns you've already earned. That's the magic!" };
      case 'mission-4':
        return { question: 'During a market crash, what should you do with your SIP?', options: ['Stop investing immediately', 'Continue your SIP', 'Sell everything', 'Double your investment'], correctAnswer: 1, explanation: 'Continue your SIP! When markets fall, you buy more units at lower prices (rupee-cost averaging), which helps long-term.' };
      case 'mission-5':
        return { question: 'A balanced portfolio should have:', options: ['Only stocks', 'Only bonds', 'A mix of stocks, bonds, and other assets', 'Only cash'], correctAnswer: 2, explanation: 'Diversification across different asset types helps reduce risk while maintaining growth potential!' };
      case 'mission-6':
        return { question: 'Rupee-cost averaging means:', options: ['Investing a lump sum at once', 'Investing fixed amounts regularly', 'Timing the market perfectly', 'Waiting for the best time to invest'], correctAnswer: 1, explanation: 'Rupee-cost averaging is investing fixed amounts regularly, which averages out the cost and reduces timing risk!' };
      default:
        return { question: 'Ready to learn?', options: ['Yes!'], correctAnswer: 0, explanation: "Great! Let's get started." };
    }
  };

  const content = getMissionContent();
  const colors = ['#a855f7', '#ec4899', '#06b6d4', '#f59e0b'];
  const missionColor = colors[missionIndex % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Diagonal split background */}
      <div className="absolute inset-0" style={{ background: '#080808' }} />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${missionColor}12 0%, transparent 50%)`,
        }}
      />

      {/* Segmented progress bar at top */}
      <div className="absolute top-0 left-0 right-0 flex gap-1 p-4">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className="flex-1 h-1"
            style={{
              background: i < currentStep ? missionColor : '#2a2a2a',
              boxShadow: i < currentStep ? `0 0 8px ${missionColor}60` : 'none',
            }}
          />
        ))}
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-2 transition-colors"
        style={{ color: '#555' }}
        onMouseEnter={e => (e.currentTarget.style.color = '#ec4899')}
        onMouseLeave={e => (e.currentTarget.style.color = '#555')}
      >
        <X className="w-5 h-5" />
      </button>

      {/* Content */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative z-10 w-full max-w-xl mx-4 p-8"
        style={{
          background: '#111',
          border: `1px solid ${missionColor}30`,
          boxShadow: `0 0 40px ${missionColor}10`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {stage === 'intro' && (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-6 flex items-center justify-center"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                background: `${missionColor}20`,
                border: `2px solid ${missionColor}`,
              }}
            >
              <Trophy className="w-10 h-10" style={{ color: missionColor }} />
            </motion.div>

            <h2
              className="text-xl font-black mb-3 tracking-wider"
              style={{ fontFamily: 'var(--font-heading)', color: missionColor }}
            >
              {mission.title.toUpperCase()}
            </h2>
            <p className="text-sm mb-6" style={{ fontFamily: 'var(--font-body)', color: '#666' }}>
              {mission.description}
            </p>

            <div className="flex gap-2 justify-center mb-6">
              <span
                className="text-xs px-3 py-1 tracking-wider"
                style={{ background: `${missionColor}15`, color: missionColor, fontFamily: 'var(--font-body)' }}
              >
                +{mission.xpReward} XP
              </span>
              {mission.badge && (
                <span
                  className="text-xs px-3 py-1 tracking-wider"
                  style={{ background: '#a855f715', color: '#a855f7', fontFamily: 'var(--font-body)' }}
                >
                  ★ BADGE
                </span>
              )}
            </div>

            <Button
              onClick={() => { sfx.click(); setStage('activity'); }}
              className="w-full text-base py-5 font-bold tracking-wider"
              style={{
                fontFamily: 'var(--font-ui)',
                background: missionColor,
                color: '#000',
                borderRadius: 0,
                boxShadow: `0 0 20px ${missionColor}40`,
              }}
            >
              <Zap className="mr-2 w-5 h-5" />
              BEGIN QUEST
            </Button>
          </div>
        )}

        {stage === 'activity' && (
          <div>
            <h3
              className="text-lg font-bold mb-6 tracking-wide"
              style={{ fontFamily: 'var(--font-heading)', color: '#e0e0e0', fontSize: '1rem' }}
            >
              {content.question}
            </h3>

            <div className="space-y-2 mb-6">
              {content.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswerSelect(index)}
                  className="w-full p-4 text-left flex items-center gap-3 transition-all"
                  style={{
                    background: flashIndex === index
                      ? '#ec489940'
                      : selectedAnswer === index
                        ? '#ec489920'
                        : '#0a0a0a',
                    border: `1px solid ${selectedAnswer === index ? '#ec4899' : flashIndex === index ? '#ec4899' : '#2a2a2a'
                      }`,
                    color: selectedAnswer === index ? '#ec4899' : '#888',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    borderRadius: 0,
                    boxShadow: flashIndex === index ? '0 0 20px rgba(236,72,153,0.3)' : selectedAnswer === index ? '0 0 10px rgba(236,72,153,0.2)' : 'none',
                  }}
                >
                  <span
                    className="w-7 h-7 flex items-center justify-center flex-shrink-0 text-xs font-bold"
                    style={{
                      background: selectedAnswer === index ? '#ec4899' : '#1a1a1a',
                      color: selectedAnswer === index ? '#000' : '#555',
                      fontFamily: 'var(--font-heading)',
                      border: `1px solid ${selectedAnswer === index ? '#ec4899' : '#333'}`,
                    }}
                  >
                    {index + 1}
                  </span>
                  {option}
                </motion.button>
              ))}
            </div>

            {selectedAnswer !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div
                  className="p-4 mb-6"
                  style={{
                    background: selectedAnswer === content.correctAnswer ? '#10b98115' : '#f59e0b15',
                    border: `1px solid ${selectedAnswer === content.correctAnswer ? '#10b981' : '#f59e0b'}`,
                  }}
                >
                  <p
                    className="text-sm font-bold mb-1"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      color: selectedAnswer === content.correctAnswer ? '#10b981' : '#f59e0b',
                      fontSize: '0.75rem',
                    }}
                  >
                    {selectedAnswer === content.correctAnswer ? '► CORRECT!' : '► CLOSE ONE!'}
                  </p>
                  <p className="text-xs" style={{ fontFamily: 'var(--font-body)', color: '#888' }}>
                    {content.explanation}
                  </p>
                </div>

                <Button
                  onClick={handleComplete}
                  className="w-full text-base py-5 font-bold tracking-wider"
                  style={{
                    fontFamily: 'var(--font-ui)',
                    background: '#ec4899',
                    color: '#000',
                    borderRadius: 0,
                    boxShadow: '0 0 20px rgba(236,72,153,0.4)',
                  }}
                >
                  COMPLETE QUEST
                </Button>
              </motion.div>
            )}
          </div>
        )}

        {stage === 'complete' && (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="w-24 h-24 mx-auto mb-6 flex items-center justify-center"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                background: '#10b98120',
                border: '2px solid #10b981',
                boxShadow: '0 0 30px rgba(16,185,129,0.3)',
              }}
            >
              <Sparkles className="w-12 h-12 text-[#10b981]" />
            </motion.div>

            <h2
              className="text-2xl font-black mb-2 tracking-wider"
              style={{ fontFamily: 'var(--font-heading)', color: '#10b981' }}
            >
              QUEST CLEARED!
            </h2>

            {/* Floating XP particle */}
            <motion.div
              className="text-sm font-bold tracking-wider"
              style={{ fontFamily: 'var(--font-heading)', color: '#a855f7' }}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -40 }}
              transition={{ duration: 1.5, delay: 0.3 }}
            >
              +{mission.xpReward} XP
            </motion.div>

            <p className="text-sm mb-6" style={{ fontFamily: 'var(--font-body)', color: '#666' }}>
              Quest rewards have been added to your profile.
            </p>

            {mission.badge && (
              <div
                className="mb-6 p-4"
                style={{
                  background: '#a855f715',
                  border: '1px solid #a855f750',
                }}
              >
                <p className="text-xs mb-1" style={{ fontFamily: 'var(--font-heading)', color: '#a855f7', letterSpacing: '0.1em' }}>
                  ★ NEW BADGE UNLOCKED
                </p>
                <p className="text-sm font-bold" style={{ fontFamily: 'var(--font-ui)', color: '#e0e0e0' }}>
                  {badges.find(b => b.id === mission.badge)?.name}
                </p>
              </div>
            )}

            <Button
              onClick={onClose}
              className="w-full text-base py-5 font-bold tracking-wider"
              style={{
                fontFamily: 'var(--font-ui)',
                background: '#10b981',
                color: '#000',
                borderRadius: 0,
                boxShadow: '0 0 20px rgba(16,185,129,0.4)',
              }}
            >
              CONTINUE
            </Button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
