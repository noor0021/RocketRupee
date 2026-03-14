import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, Sparkles, Rocket, Target, Calculator, Trophy, User } from 'lucide-react';

interface TutorialStep {
  selector: string;
  title: string;
  description: string;
  color: string;
  icon: React.ElementType;
}

const tutorialSteps: TutorialStep[] = [
  {
    selector: '[data-tutorial="xp-bar"]',
    title: 'YOUR XP BAR',
    description: 'Track your experience points here. Complete quests to fill the bar and level up!',
    color: '#a855f7',
    icon: Sparkles,
  },
  {
    selector: '[data-tutorial="nav-quests"]',
    title: 'QUESTS',
    description: 'Tap here to explore financial quests. Each one teaches you a key investing concept!',
    color: '#ec4899',
    icon: Target,
  },
  {
    selector: '[data-tutorial="nav-sim"]',
    title: 'SIP SIMULATOR',
    description: 'Practice SIP investing in a risk-free simulator. See how your money can grow!',
    color: '#06b6d4',
    icon: Calculator,
  },
  {
    selector: '[data-tutorial="nav-ranks"]',
    title: 'LEADERBOARD',
    description: 'Compete with other players. Climb the ranks by earning XP and completing quests!',
    color: '#f59e0b',
    icon: Trophy,
  },
  {
    selector: '[data-tutorial="nav-player"]',
    title: 'YOUR PROFILE',
    description: 'View your stats, badges, and overall progress on your financial learning journey.',
    color: '#10b981',
    icon: User,
  },
];

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export const Tutorial: React.FC = () => {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [targetRect, setTargetRect] = useState<Rect | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Check if tutorial has already been completed
  useEffect(() => {
    const done = localStorage.getItem('rocketrupee_tutorial_done');
    if (!done) {
      // Small delay so the layout settles
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  // Measure the target element for the current step
  const measureTarget = useCallback(() => {
    if (!visible) return;
    const current = tutorialSteps[step];
    if (!current) return;
    const el = document.querySelector(current.selector);
    if (el) {
      const r = el.getBoundingClientRect();
      const padding = 6;
      setTargetRect({
        top: r.top - padding,
        left: r.left - padding,
        width: r.width + padding * 2,
        height: r.height + padding * 2,
      });
    } else {
      setTargetRect(null);
    }
  }, [step, visible]);

  useEffect(() => {
    measureTarget();
    window.addEventListener('resize', measureTarget);
    window.addEventListener('scroll', measureTarget, true);
    return () => {
      window.removeEventListener('resize', measureTarget);
      window.removeEventListener('scroll', measureTarget, true);
    };
  }, [measureTarget]);

  const handleNext = () => {
    if (step < tutorialSteps.length - 1) {
      setStep(step + 1);
    } else {
      finish();
    }
  };

  const finish = () => {
    setVisible(false);
    localStorage.setItem('rocketrupee_tutorial_done', 'true');
  };

  if (!visible) return null;

  const current = tutorialSteps[step];
  const StepIcon = current.icon;

  // Calculate tooltip position — place it near the highlighted element
  const getTooltipStyle = (): React.CSSProperties => {
    if (!targetRect) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };

    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;
    const tooltipW = 320;
    const tooltipH = 200;
    const gap = 16;

    const centerX = targetRect.left + targetRect.width / 2;
    const centerY = targetRect.top + targetRect.height / 2;

    // Try positioning: above, below, right, left — pick whichever fits best
    // Prefer above or below
    let top: number;
    let left: number;
    let arrowSide: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

    if (targetRect.top > tooltipH + gap + 40) {
      // Place above
      top = targetRect.top - tooltipH - gap;
      left = Math.max(16, Math.min(centerX - tooltipW / 2, viewportW - tooltipW - 16));
      arrowSide = 'bottom';
    } else if (viewportH - (targetRect.top + targetRect.height) > tooltipH + gap + 40) {
      // Place below
      top = targetRect.top + targetRect.height + gap;
      left = Math.max(16, Math.min(centerX - tooltipW / 2, viewportW - tooltipW - 16));
      arrowSide = 'top';
    } else if (viewportW - (targetRect.left + targetRect.width) > tooltipW + gap + 40) {
      // Place right
      top = Math.max(16, Math.min(centerY - tooltipH / 2, viewportH - tooltipH - 16));
      left = targetRect.left + targetRect.width + gap;
      arrowSide = 'left';
    } else {
      // Place left
      top = Math.max(16, Math.min(centerY - tooltipH / 2, viewportH - tooltipH - 16));
      left = Math.max(16, targetRect.left - tooltipW - gap);
      arrowSide = 'right';
    }

    return { top, left, position: 'fixed' as const, '--arrow-side': arrowSide } as React.CSSProperties;
  };

  const tooltipStyle = getTooltipStyle();
  const arrowSide = (tooltipStyle as any)['--arrow-side'] as string || 'bottom';

  // Arrow element pointing from tooltip toward the target
  const renderArrow = () => {
    if (!targetRect) return null;
    const size = 10;

    const arrowStyles: React.CSSProperties = { position: 'absolute' };

    if (arrowSide === 'bottom') {
      // Arrow points down (tooltip is above target)
      arrowStyles.bottom = -size;
      arrowStyles.left = '50%';
      arrowStyles.transform = 'translateX(-50%)';
      arrowStyles.borderLeft = `${size}px solid transparent`;
      arrowStyles.borderRight = `${size}px solid transparent`;
      arrowStyles.borderTop = `${size}px solid ${current.color}`;
      arrowStyles.width = 0;
      arrowStyles.height = 0;
    } else if (arrowSide === 'top') {
      // Arrow points up (tooltip is below target)
      arrowStyles.top = -size;
      arrowStyles.left = '50%';
      arrowStyles.transform = 'translateX(-50%)';
      arrowStyles.borderLeft = `${size}px solid transparent`;
      arrowStyles.borderRight = `${size}px solid transparent`;
      arrowStyles.borderBottom = `${size}px solid ${current.color}`;
      arrowStyles.width = 0;
      arrowStyles.height = 0;
    } else if (arrowSide === 'left') {
      // Arrow points left (tooltip is right of target)
      arrowStyles.left = -size;
      arrowStyles.top = '50%';
      arrowStyles.transform = 'translateY(-50%)';
      arrowStyles.borderTop = `${size}px solid transparent`;
      arrowStyles.borderBottom = `${size}px solid transparent`;
      arrowStyles.borderRight = `${size}px solid ${current.color}`;
      arrowStyles.width = 0;
      arrowStyles.height = 0;
    } else {
      // Arrow points right (tooltip is left of target)
      arrowStyles.right = -size;
      arrowStyles.top = '50%';
      arrowStyles.transform = 'translateY(-50%)';
      arrowStyles.borderTop = `${size}px solid transparent`;
      arrowStyles.borderBottom = `${size}px solid transparent`;
      arrowStyles.borderLeft = `${size}px solid ${current.color}`;
      arrowStyles.width = 0;
      arrowStyles.height = 0;
    }

    return <div style={arrowStyles} />;
  };

  // Build the clip-path that creates a "hole" in the overlay
  const getOverlayClipPath = (): string => {
    if (!targetRect) return 'none';
    const { top, left, width, height } = targetRect;
    const r = 8; // border-radius of the cutout
    // Polygon that covers the full viewport minus a rounded rect cutout
    // We use evenodd fill rule via CSS to punch a hole
    return `
      polygon(
        evenodd,
        0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%,
        ${left + r}px ${top}px,
        ${left + width - r}px ${top}px,
        ${left + width}px ${top + r}px,
        ${left + width}px ${top + height - r}px,
        ${left + width - r}px ${top + height}px,
        ${left + r}px ${top + height}px,
        ${left}px ${top + height - r}px,
        ${left}px ${top + r}px,
        ${left + r}px ${top}px
      )
    `.trim();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999]"
          style={{ pointerEvents: 'auto' }}
        >
          {/* Dark overlay with cutout */}
          <div
            className="fixed inset-0"
            style={{
              background: 'rgba(0, 0, 0, 0.82)',
              clipPath: getOverlayClipPath(),
            }}
          />

          {/* Glowing border around the cutout */}
          {targetRect && (
            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="fixed pointer-events-none"
              style={{
                top: targetRect.top,
                left: targetRect.left,
                width: targetRect.width,
                height: targetRect.height,
                border: `2px solid ${current.color}`,
                borderRadius: 8,
                boxShadow: `0 0 20px ${current.color}60, 0 0 40px ${current.color}30, inset 0 0 20px ${current.color}15`,
              }}
            >
              {/* Corner pulse */}
              <motion.div
                className="absolute inset-[-4px] rounded-[10px]"
                style={{ border: `2px solid ${current.color}` }}
                animate={{ scale: [1, 1.04, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
            </motion.div>
          )}

          {/* Tooltip Card */}
          <motion.div
            key={`tooltip-${step}`}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="fixed w-[320px]"
            style={{
              ...tooltipStyle,
              zIndex: 10000,
            }}
          >
            <div
              className="relative p-5 rounded-xl"
              style={{
                background: '#111',
                border: `1px solid ${current.color}50`,
                boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 20px ${current.color}20`,
              }}
            >
              {/* Arrow */}
              {renderArrow()}

              {/* Step indicator */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: `${current.color}20`, border: `1px solid ${current.color}50` }}
                  >
                    <StepIcon className="w-4 h-4" style={{ color: current.color }} />
                  </div>
                  <span
                    className="text-[10px] font-bold tracking-wider"
                    style={{ color: `${current.color}aa`, fontFamily: 'var(--font-ui)' }}
                  >
                    STEP {step + 1}/{tutorialSteps.length}
                  </span>
                </div>

                {/* Step dots */}
                <div className="flex gap-1">
                  {tutorialSteps.map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                      style={{
                        background: i < step ? '#10b981' : i === step ? current.color : '#333',
                        boxShadow: i === step ? `0 0 6px ${current.color}` : 'none',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Title */}
              <h3
                className="text-base font-black tracking-wider mb-1.5"
                style={{ fontFamily: 'var(--font-heading)', color: current.color }}
              >
                {current.title}
              </h3>

              {/* Description */}
              <p
                className="text-xs leading-relaxed mb-4"
                style={{ fontFamily: 'var(--font-body)', color: '#999' }}
              >
                {current.description}
              </p>

              {/* Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={finish}
                  className="px-4 py-2 text-[10px] font-bold tracking-wider transition-all hover:bg-[#222]"
                  style={{
                    fontFamily: 'var(--font-ui)',
                    color: '#666',
                    background: '#1a1a1a',
                    border: '1px solid #333',
                    borderRadius: 6,
                  }}
                >
                  SKIP
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 text-[10px] font-bold tracking-wider transition-all"
                  style={{
                    fontFamily: 'var(--font-ui)',
                    color: '#000',
                    background: current.color,
                    border: 'none',
                    borderRadius: 6,
                    boxShadow: `0 0 16px ${current.color}40`,
                  }}
                >
                  {step < tutorialSteps.length - 1 ? 'CONTINUE' : 'GOT IT!'}
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
