import { motion, useReducedMotion } from 'motion/react';

const FLAME_OUTER =
  'M12 2C9 6 5 11 5 16.5C5 21.194 8.358 25 12.5 25C16.642 25 20 21.194 20 16.5C20 13 17.5 10 16 8C16.2 10 15 12 13.5 12.5C14.5 9 13 5 12 2Z';

export function EventsHeroIllustration() {
  const reduceMotion = useReducedMotion();
  const loop = (duration: number) =>
    reduceMotion
      ? { duration: 0 }
      : { duration, repeat: Infinity, ease: 'easeInOut' as const };

  return (
    <svg viewBox="0 0 380 420" style={{ width: '100%', maxWidth: 380, margin: '0 auto', display: 'block' }}>
      <defs>
        <linearGradient id="hoodieGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--flame)" />
          <stop offset="100%" stopColor="var(--flame-deep)" />
        </linearGradient>
        <linearGradient id="capeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--flame-pale)" />
          <stop offset="100%" stopColor="var(--flame)" />
        </linearGradient>
        <linearGradient id="legGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--sky)" />
          <stop offset="100%" stopColor="var(--sky-deep)" />
        </linearGradient>
      </defs>

      {/* Motion / speed lines */}
      <motion.g
        animate={{ x: [0, -14, 0], opacity: [0.35, 0.85, 0.35] }}
        transition={loop(2.4)}
      >
        <path d="M15 150 Q70 145 120 152" stroke="var(--sky-pale)" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M30 185 Q80 180 135 188" stroke="var(--sky-pale)" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M20 220 Q65 216 110 222" stroke="var(--sky-pale)" strokeWidth="6" strokeLinecap="round" fill="none" />
      </motion.g>

      {/* Whole figure gently floats */}
      <motion.g animate={{ y: [0, -10, 0] }} transition={loop(3)}>
        {/* Cape, flowing behind */}
        <motion.path
          d="M175 132 Q120 158 98 218 Q88 258 120 290 Q152 268 166 228 Q172 178 182 140 Z"
          fill="url(#capeGrad)"
          opacity="0.94"
          style={{ transformOrigin: '178px 135px' }}
          animate={{ rotate: [0, -5, 0] }}
          transition={loop(2.2)}
        />

        {/* Legs */}
        <path d="M197 224 Q191 262 196 302 Q199 332 191 362" stroke="url(#legGrad)" strokeWidth="26" strokeLinecap="round" fill="none" />
        <path d="M216 224 Q224 262 219 302 Q217 332 226 362" stroke="url(#legGrad)" strokeWidth="26" strokeLinecap="round" fill="none" />
        <ellipse cx="189" cy="370" rx="17" ry="10" fill="var(--flame-deep)" />
        <ellipse cx="228" cy="370" rx="17" ry="10" fill="var(--flame-deep)" />

        {/* Torso / hoodie */}
        <path d="M177 122 Q206 111 236 122 L241 232 Q206 247 172 232 Z" fill="url(#hoodieGrad)" />

        {/* Back arm (hand on hip) */}
        <path d="M186 137 Q160 152 155 177" stroke="#A66B4A" strokeWidth="19" strokeLinecap="round" fill="none" />

        {/* Hair, behind head */}
        <motion.path
          d="M182 72 Q142 92 152 152 Q162 192 192 177 Q177 132 187 92 Z"
          fill="#3A2318"
          style={{ transformOrigin: '190px 90px' }}
          animate={{ rotate: [0, -4, 0] }}
          transition={loop(2.6)}
        />

        {/* Head */}
        <circle cx="207" cy="96" r="32" fill="#A66B4A" />
        <circle cx="197" cy="92" r="2.6" fill="#2B1B12" />
        <circle cx="215" cy="92" r="2.6" fill="#2B1B12" />
        <path d="M197 106 Q207 113 217 106" stroke="#2B1B12" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Hair, front wisp */}
        <path d="M180 78 Q192 68 208 70" stroke="#3A2318" strokeWidth="6" strokeLinecap="round" fill="none" />

        {/* Raised arm + flame spark */}
        <path d="M228 132 Q258 112 268 82 Q274 67 286 61" stroke="#A66B4A" strokeWidth="21" strokeLinecap="round" fill="none" />
        <circle cx="286" cy="61" r="12" fill="#A66B4A" />

        <motion.g
          style={{ transformOrigin: '289px 40px' }}
          animate={{ scale: [1, 1.18, 1], opacity: [0.85, 1, 0.85] }}
          transition={loop(1.2)}
        >
          <path d={FLAME_OUTER} fill="var(--flame)" transform="translate(277, 22) scale(1)" />
        </motion.g>
      </motion.g>
    </svg>
  );
}
