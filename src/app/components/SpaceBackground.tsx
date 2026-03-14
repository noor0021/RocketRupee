import React from 'react';
import { useScroll, useTransform, useSpring, motion } from 'motion/react';
import { Stars, Astronaut, RocketFigure, PlanetRinged, Planet, Cloud } from './SpaceFigures';
import { useMobile } from '../hooks/useMobile';

export const SpaceBackground: React.FC = () => {
    const { scrollYProgress } = useScroll();
    const isMobile = useMobile();

    // Smooth out the scroll progress for a higher perceived frame rate
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Parallax transformations using the smoothed progress — reduced on mobile
    const depth = isMobile ? 0.5 : 1;
    const y1 = useTransform(smoothProgress, [0, 1], [0, -300 * depth]);
    const y2 = useTransform(smoothProgress, [0, 1], [0, -150 * depth]);
    const y3 = useTransform(smoothProgress, [0, 1], [0, -75 * depth]);
    const rotate = useTransform(smoothProgress, [0, 1], [0, 25 * depth]);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#080808]">
            <Stars />

            {/* Interactive Figures with Parallax — scaled on mobile */}
            <motion.div style={{ y: y1 }} className="absolute inset-0">
                <Astronaut
                    className="absolute top-[20%] left-[5%] md:left-[10%] pointer-events-auto"
                    style={{ width: isMobile ? 50 : 90, height: isMobile ? 60 : 110 }}
                />
            </motion.div>

            <motion.div style={{ y: y2, rotate }} className="absolute inset-0">
                <RocketFigure
                    className="absolute bottom-[20%] right-[5%] md:right-[12%] pointer-events-auto"
                    style={{ width: isMobile ? 35 : 60, height: isMobile ? 55 : 100 }}
                    direction="diagonal"
                />
            </motion.div>

            <motion.div style={{ y: y3 }} className="absolute inset-0">
                <PlanetRinged
                    className="absolute top-[15%] right-[8%] md:right-[15%] pointer-events-auto"
                    color="#ec4899"
                    size={isMobile ? 45 : 80}
                />

                {!isMobile && (
                    <Planet
                        className="absolute bottom-[25%] left-[15%] pointer-events-auto"
                        color="#f59e0b"
                        size={40}
                    />
                )}
            </motion.div>

            {!isMobile && (
                <motion.div style={{ y: y2 }} className="absolute inset-0">
                    <Cloud
                        className="absolute top-[40%] left-[5%] opacity-30"
                        size={120}
                    />
                    <Cloud
                        className="absolute bottom-[40%] right-[5%] opacity-20"
                        size={100}
                    />
                </motion.div>
            )}

            {/* Subtle depth effect overlays */}
            <div className="absolute inset-0 bg-radial-[at_50%_50%] from-transparent via-[#08080810] to-[#080808] opacity-60" />
        </div>
    );
};
