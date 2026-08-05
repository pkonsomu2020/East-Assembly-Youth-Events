import { motion, useReducedMotion } from 'motion/react';

const OUTER_PATH =
  'M12 2C9 6 5 11 5 16.5C5 21.194 8.358 25 12.5 25C16.642 25 20 21.194 20 16.5C20 13 17.5 10 16 8C16.2 10 15 12 13.5 12.5C14.5 9 13 5 12 2Z';
const INNER_PATH =
  'M12.8 12C11.7 14 10.3 15.6 10.3 17.8C10.3 19.68 11.66 21 13.3 21C14.94 21 16.3 19.68 16.3 17.8C16.3 15.6 14.7 13.8 14 12.5C14.05 13.3 13.4 14 12.6 14.1C13 13.3 13.1 12.6 12.8 12Z';

export function FlameMeter({ pct }: { pct: number }) {
  const reduceMotion = useReducedMotion();
  const clamped = Math.max(0, Math.min(100, pct));
  const fillY = 28 - (28 * clamped) / 100;

  return (
    <div className="flame-meter">
      <svg viewBox="0 0 24 28" width="130" height="150">
        <path d={OUTER_PATH} fill="#EDF8FE" stroke="#101C33" strokeWidth="0.6" />
        <path d={INNER_PATH} fill="#F7FAFC" />
        <clipPath id="flameClip">
          <motion.rect
            x="0"
            width="24"
            height={28}
            initial={false}
            animate={{ y: fillY }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.8, ease: 'easeOut' }}
          />
        </clipPath>
        <g clipPath="url(#flameClip)">
          <path d={OUTER_PATH} fill="#F97B4F" stroke="#101C33" strokeWidth="0.6" />
          <path d={INNER_PATH} fill="#FFD9C4" />
        </g>
      </svg>
      <p
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 800,
          fontSize: '1.4rem',
          color: '#D9542B',
          margin: '6px 0 0',
        }}
      >
        {clamped}%
      </p>
    </div>
  );
}
