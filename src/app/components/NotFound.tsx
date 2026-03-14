import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Gamepad2 } from 'lucide-react';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-[#080808] flex items-center justify-center overflow-hidden">
      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.03]">
        {[...Array(20)].map((_, i) => (
          <div key={`h-${i}`} className="absolute w-full h-px bg-[#a855f7]" style={{ top: `${(i + 1) * 5}%` }} />
        ))}
      </div>

      <div className="relative z-10 text-center p-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <div
            className="w-24 h-24 mx-auto mb-6 flex items-center justify-center"
            style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              background: '#ec489920',
              border: '2px solid #ec4899',
            }}
          >
            <Gamepad2 className="w-12 h-12 text-[#ec4899]" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-black tracking-widest mb-2"
          style={{
            fontFamily: 'var(--font-heading)',
            color: '#ec4899',
            textShadow: '0 0 30px rgba(236,72,153,0.3)',
          }}
        >
          GAME OVER
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm mb-2"
          style={{ fontFamily: 'var(--font-heading)', color: '#555', letterSpacing: '0.2em' }}
        >
          ERROR 404
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs mb-8"
          style={{ fontFamily: 'var(--font-body)', color: '#444' }}
        >
          This level doesn't exist... yet.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/dashboard')}
          className="px-8 py-3 text-sm font-bold tracking-wider"
          style={{
            fontFamily: 'var(--font-ui)',
            background: '#ec4899',
            color: '#000',
            border: 'none',
            boxShadow: '0 0 20px rgba(236,72,153,0.4)',
            cursor: 'pointer',
          }}
        >
          RESPAWN AT BASE
        </motion.button>
      </div>
    </div>
  );
};
