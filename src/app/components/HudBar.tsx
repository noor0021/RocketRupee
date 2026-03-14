import React from 'react';
import { motion } from 'motion/react';
import { Heart, Coins, Swords, Zap } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { useMobile } from '../hooks/useMobile';

export const HudBar: React.FC = () => {
    const { user } = useGame();
    const isMobile = useMobile();

    if (!user) return null;

    const currentLevelXP = (user.level - 1) * 500;
    const nextLevelXP = user.level * 500;
    const progressToNextLevel = ((user.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

    const hudChips = [
        { icon: Heart, label: 'STREAK', value: `${user.streak}d`, color: '#ec4899' },
        { icon: Coins, label: 'COINS', value: `₹${user.portfolioValue.toLocaleString()}`, color: '#f59e0b' },
        { icon: Swords, label: 'RANK', value: `LV.${user.level}`, color: '#a855f7' },
    ];

    return (
        <div className="w-full" style={{ fontFamily: 'var(--font-heading)' }}>
            {/* XP Bar - Full Width */}
            <div data-tutorial="xp-bar" className="w-full bg-[#111] border-b border-[#2a2a2a] px-3 py-1.5 md:px-4 md:py-2">
                <div className="flex items-center gap-2 md:gap-3">
                    <Zap className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#a855f7] flex-shrink-0" />
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-0.5 md:mb-1">
                            <span className="text-[8px] md:text-[10px] text-[#888] tracking-widest uppercase">
                                XP {user.xp.toLocaleString()} / {nextLevelXP.toLocaleString()}
                            </span>
                            <span className="text-[8px] md:text-[10px] text-[#a855f7] tracking-wider">
                                {Math.round(progressToNextLevel)}%
                            </span>
                        </div>
                        {/* Segmented XP Bar */}
                        <div className="flex gap-[1px] md:gap-[2px]">
                            {Array.from({ length: isMobile ? 10 : 20 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="flex-1 h-[4px] md:h-[5px] transition-all duration-300"
                                    style={{
                                        background: i < Math.floor(progressToNextLevel / (isMobile ? 10 : 5))
                                            ? '#a855f7'
                                            : '#2a2a2a',
                                        boxShadow: i < Math.floor(progressToNextLevel / (isMobile ? 10 : 5))
                                            ? '0 0 6px rgba(168,85,247,0.4)'
                                            : 'none',
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* HUD Chips */}
            <div className="flex items-center justify-end gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-[#0a0a0a] border-b border-[#2a2a2a] overflow-x-auto">
                {hudChips.map((chip) => {
                    const Icon = chip.icon;
                    return (
                        <motion.div
                            key={chip.label}
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-0.5 md:py-1 flex-shrink-0"
                            style={{
                                background: `${chip.color}10`,
                                border: `1px solid ${chip.color}40`,
                            }}
                        >
                            <Icon className="w-3 h-3 md:w-3.5 md:h-3.5" style={{ color: chip.color }} />
                            {!isMobile && (
                                <span className="text-[10px] tracking-wider" style={{ color: `${chip.color}aa` }}>
                                    {chip.label}
                                </span>
                            )}
                            <span className="text-[10px] md:text-xs font-bold" style={{ color: chip.color }}>
                                {chip.value}
                            </span>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};
