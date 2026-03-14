import React from 'react';
import { motion } from 'motion/react';

// Floating Astronaut SVG
export const Astronaut: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
    <motion.div
        className={className}
        style={{ ...style, cursor: 'pointer' }}
        animate={{ y: [0, -15, 0], rotate: [0, 3, -3, 0] }}
        whileHover={{ scale: 1.1, rotate: 10, filter: 'drop-shadow(0 0 15px rgba(196, 181, 253, 0.6))' }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
        <svg width="90" height="110" viewBox="0 0 90 110" fill="none">
            {/* ... (SVG content remains same) */}
            <ellipse cx="45" cy="28" rx="22" ry="24" fill="#c4b5fd" />
            <ellipse cx="45" cy="26" rx="16" ry="17" fill="#1e1b4b" />
            <ellipse cx="45" cy="24" rx="12" ry="12" fill="#312e81" />
            <ellipse cx="40" cy="22" rx="5" ry="6" fill="#818cf8" opacity="0.4" />
            <rect x="28" y="48" width="34" height="32" rx="8" fill="#c4b5fd" />
            <rect x="32" y="52" width="26" height="10" rx="3" fill="#a78bfa" />
            <rect x="20" y="50" width="8" height="24" rx="3" fill="#8b5cf6" />
            <rect x="12" y="52" width="16" height="8" rx="4" fill="#c4b5fd" transform="rotate(-20 12 52)" />
            <rect x="62" y="48" width="16" height="8" rx="4" fill="#c4b5fd" transform="rotate(15 62 48)" />
            <circle cx="12" cy="44" r="5" fill="#c4b5fd" />
            <rect x="32" y="78" width="10" height="18" rx="4" fill="#c4b5fd" />
            <rect x="48" y="78" width="10" height="18" rx="4" fill="#c4b5fd" />
            <rect x="30" y="92" width="14" height="8" rx="3" fill="#8b5cf6" />
            <rect x="46" y="92" width="14" height="8" rx="3" fill="#8b5cf6" />
            <rect x="38" y="55" width="14" height="4" rx="1" fill="#fbbf24" />
            <rect x="40" y="60" width="10" height="3" rx="1" fill="#f472b6" />
        </svg>
    </motion.div>
);

// Floating Rocket SVG
export const RocketFigure: React.FC<{ className?: string; style?: React.CSSProperties; direction?: 'up' | 'diagonal' }> = ({ className, style, direction = 'diagonal' }) => (
    <motion.div
        className={className}
        style={{ ...style, transform: direction === 'diagonal' ? 'rotate(-30deg)' : 'rotate(0deg)', cursor: 'pointer' }}
        animate={{ y: [0, -12, 0], x: direction === 'diagonal' ? [0, 5, 0] : [0, 0, 0] }}
        whileHover={{
            scale: 1.15,
            y: direction === 'diagonal' ? -30 : -20,
            filter: 'drop-shadow(0 0 20px rgba(167, 139, 250, 0.7))'
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
        <svg width="60" height="100" viewBox="0 0 60 100" fill="none">
            {/* ... (SVG content remains same) */}
            <path d="M30 5 C30 5, 50 30, 50 55 L50 70 Q50 78 42 78 L18 78 Q10 78 10 70 L10 55 C10 30, 30 5, 30 5Z" fill="#818cf8" />
            <path d="M30 5 C30 5, 45 30, 45 55 L45 70 Q45 75 38 75 L22 75 Q15 75 15 70 L15 55 C15 30, 30 5, 30 5Z" fill="#a78bfa" />
            <circle cx="30" cy="38" r="10" fill="#1e1b4b" />
            <circle cx="30" cy="38" r="7" fill="#312e81" />
            <circle cx="30" cy="36" r="4" fill="#fbbf24" />
            <path d="M10 60 L0 80 L10 75Z" fill="#f472b6" />
            <path d="M50 60 L60 80 L50 75Z" fill="#f472b6" />
            <rect x="22" y="78" width="16" height="6" rx="2" fill="#6366f1" />
            <motion.g
                animate={{ scaleY: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 0.4, repeat: Infinity }}
            >
                <path d="M25 84 L30 100 L35 84Z" fill="#fbbf24" />
                <path d="M27 84 L30 95 L33 84Z" fill="#fb923c" />
            </motion.g>
        </svg>
    </motion.div>
);

// Planet with ring (Saturn-like)
export const PlanetRinged: React.FC<{ className?: string; style?: React.CSSProperties; color?: string; size?: number }> = ({
    className, style, color = '#f472b6', size = 60
}) => (
    <motion.div
        className={className}
        style={{ ...style, cursor: 'pointer' }}
        animate={{ rotate: [0, 5, 0] }}
        whileHover={{
            scale: 1.2,
            rotate: 20,
            filter: `drop-shadow(0 0 15px ${color})`
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    >
        <svg width={size} height={size * 0.8} viewBox="0 0 80 64" fill="none">
            {/* ... (SVG content remains same) */}
            <ellipse cx="40" cy="35" rx="38" ry="10" stroke={color} strokeWidth="3" opacity="0.4" />
            <circle cx="40" cy="32" r="20" fill={color} />
            <circle cx="40" cy="32" r="20" fill="url(#planetShade)" />
            <circle cx="34" cy="28" r="4" fill="white" opacity="0.2" />
            <circle cx="48" cy="35" r="3" fill="white" opacity="0.15" />
            <ellipse cx="40" cy="35" rx="38" ry="10" stroke={color} strokeWidth="3" fill="none" strokeDasharray="50 40" />
            <defs>
                <radialGradient id="planetShade">
                    <stop offset="0%" stopColor="white" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="black" stopOpacity="0.3" />
                </radialGradient>
            </defs>
        </svg>
    </motion.div>
);

// Simple Planet (moon/solid)
export const Planet: React.FC<{ className?: string; style?: React.CSSProperties; color?: string; size?: number }> = ({
    className, style, color = '#fbbf24', size = 40
}) => (
    <motion.div
        className={className}
        style={style}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="18" fill={color} />
            <circle cx="14" cy="15" r="5" fill="white" opacity="0.25" />
            <circle cx="26" cy="22" r="3" fill="white" opacity="0.15" />
            <circle cx="20" cy="30" r="2" fill="black" opacity="0.1" />
        </svg>
    </motion.div>
);

// Cloud
export const Cloud: React.FC<{ className?: string; style?: React.CSSProperties; size?: number }> = ({
    className, style, size = 80
}) => (
    <motion.div
        className={className}
        style={style}
        animate={{ x: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
    >
        <svg width={size} height={size * 0.5} viewBox="0 0 100 50" fill="none">
            <ellipse cx="35" cy="35" rx="25" ry="15" fill="white" opacity="0.12" />
            <ellipse cx="55" cy="30" rx="30" ry="18" fill="white" opacity="0.1" />
            <ellipse cx="75" cy="35" rx="22" ry="13" fill="white" opacity="0.08" />
        </svg>
    </motion.div>
);

// Sparkle stars
export const Stars: React.FC = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(25)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${2 + Math.random() * 4}px`,
                    height: `${2 + Math.random() * 4}px`,
                    background: 'white',
                }}
                animate={{
                    opacity: [0.2, 0.8, 0.2],
                    scale: [0.8, 1.3, 0.8],
                }}
                transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                }}
            />
        ))}
    </div>
);
