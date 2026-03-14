import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, Target, Trophy, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useGame } from '../context/GameContext';

interface OnboardingProps {
  onComplete: () => void;
}

const onboardingSteps = [
  {
    icon: Gamepad2,
    title: 'WELCOME TO THE ARCADE',
    description: 'Learn investing through intense, gamified missions. No boring lectures — just pure gameplay.',
    color: '#a855f7',
  },
  {
    icon: Target,
    title: 'COMPLETE QUESTS',
    description: 'Each quest teaches you a key financial concept through hands-on battle experience.',
    color: '#ec4899',
  },
  {
    icon: Trophy,
    title: 'EARN LOOT',
    description: 'Gain XP, unlock badges, level up your rank, and build your virtual investment empire.',
    color: '#f59e0b',
  },
  {
    icon: TrendingUp,
    title: 'MASTER SIP COMBAT',
    description: 'Understand compounding, market volatility, and rupee-cost averaging in just 10 minutes!',
    color: '#06b6d4',
  },
];

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [displayText, setDisplayText] = useState('');
  const { completeOnboarding } = useGame();

  const currentStep = step < onboardingSteps.length ? onboardingSteps[step] : null;

  // Typewriter effect for description
  useEffect(() => {
    if (!currentStep) return;
    setDisplayText('');
    let i = 0;
    const text = currentStep.description;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [step]);

  const handleNext = () => {
    if (step < onboardingSteps.length - 1) {
      setStep(step + 1);
    } else {
      setStep(onboardingSteps.length);
    }
  };

  const handleStart = () => {
    if (name.trim()) {
      completeOnboarding(name.trim());
      onComplete();
    }
  };

  const CurrentIcon = currentStep ? currentStep.icon : Gamepad2;
  const currentColor = currentStep ? currentStep.color : '#a855f7';

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Diagonal split background */}
      <div className="absolute inset-0 bg-[#080808]" />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${currentColor}15 0%, transparent 50%, #080808 50%)`,
        }}
      />

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.03]">
        {[...Array(30)].map((_, i) => (
          <div key={`h-${i}`} className="absolute w-full h-px bg-white" style={{ top: `${(i + 1) * 3.33}%` }} />
        ))}
        {[...Array(30)].map((_, i) => (
          <div key={`v-${i}`} className="absolute h-full w-px bg-white" style={{ left: `${(i + 1) * 3.33}%` }} />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-lg w-full">
          {/* Segmented progress bar */}
          <div className="flex gap-1 mb-8">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className="flex-1 h-1 transition-all duration-500"
                style={{
                  background: index < step ? '#10b981' : index === step ? currentColor : '#2a2a2a',
                  boxShadow: index === step ? `0 0 8px ${currentColor}60` : 'none',
                }}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step < onboardingSteps.length ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 100, filter: 'hue-rotate(90deg)' }}
                animate={{ opacity: 1, x: 0, filter: 'hue-rotate(0deg)' }}
                exit={{ opacity: 0, x: -100, filter: 'hue-rotate(-90deg)' }}
                transition={{ duration: 0.4 }}
                className="p-8"
                style={{
                  background: '#111',
                  border: `1px solid ${currentColor}40`,
                  boxShadow: `0 0 30px ${currentColor}10`,
                }}
              >
                <div className="flex flex-col items-center text-center">
                  {/* Icon in hexagon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="w-20 h-20 flex items-center justify-center mb-6"
                    style={{
                      background: `${currentColor}20`,
                      border: `2px solid ${currentColor}`,
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      boxShadow: `0 0 20px ${currentColor}40`,
                    }}
                  >
                    <CurrentIcon className="w-10 h-10" style={{ color: currentColor }} />
                  </motion.div>

                  <h2
                    className="text-2xl font-black mb-4 tracking-wider"
                    style={{ fontFamily: 'var(--font-heading)', color: currentColor }}
                  >
                    {onboardingSteps[step].title}
                  </h2>

                  <p
                    className="text-sm mb-8 min-h-[3rem]"
                    style={{ fontFamily: 'var(--font-body)', color: '#888' }}
                  >
                    {displayText}
                    <span className="inline-block w-0.5 h-4 ml-0.5 align-middle" style={{ background: currentColor, animation: 'blink-caret 0.75s step-end infinite' }} />
                  </p>

                  <Button
                    onClick={handleNext}
                    className="w-full text-base py-5 font-bold tracking-wider"
                    style={{
                      fontFamily: 'var(--font-ui)',
                      background: currentColor,
                      color: '#000',
                      borderRadius: 0,
                      boxShadow: `0 0 20px ${currentColor}40`,
                    }}
                  >
                    <span className="mr-2 text-xs opacity-60">[ENTER]</span>
                    CONTINUE
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="name-input"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8"
                style={{
                  background: '#111',
                  border: '1px solid #a855f740',
                  boxShadow: '0 0 30px rgba(168,85,247,0.1)',
                }}
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    className="w-20 h-20 flex items-center justify-center mb-6"
                    style={{
                      background: 'linear-gradient(135deg, #a855f720, #ec489920)',
                      border: '2px solid #a855f7',
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    }}
                  >
                    <Gamepad2 className="w-10 h-10 text-[#a855f7]" />
                  </motion.div>

                  <h2
                    className="text-2xl font-black mb-2 tracking-wider"
                    style={{ fontFamily: 'var(--font-heading)', color: '#a855f7' }}
                  >
                    ENTER PLAYER TAG
                  </h2>
                  <p
                    className="text-sm mb-6"
                    style={{ fontFamily: 'var(--font-body)', color: '#666' }}
                  >
                    What should we call you, warrior?
                  </p>

                  <Input
                    type="text"
                    placeholder=">> Enter your tag..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleStart()}
                    className="mb-6 text-base py-5"
                    style={{
                      fontFamily: 'var(--font-body)',
                      background: '#0a0a0a',
                      border: '1px solid #2a2a2a',
                      color: '#a855f7',
                      borderRadius: 0,
                    }}
                    autoFocus
                  />

                  <Button
                    onClick={handleStart}
                    disabled={!name.trim()}
                    className="w-full text-base py-5 font-bold tracking-wider disabled:opacity-30"
                    style={{
                      fontFamily: 'var(--font-ui)',
                      background: '#ec4899',
                      color: '#000',
                      borderRadius: 0,
                      boxShadow: name.trim() ? '0 0 20px rgba(236,72,153,0.4)' : 'none',
                    }}
                  >
                    <Gamepad2 className="mr-2 w-5 h-5" />
                    START GAME
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
