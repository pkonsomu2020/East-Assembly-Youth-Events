import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const TILTS = [-2, 1, -1, 2];

export function PinnedCard({
  index,
  step,
  title,
  children,
}: {
  index: number;
  step: string;
  title: string;
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const rotate = TILTS[index % TILTS.length];

  return (
    <motion.div
      className="pinned-card"
      style={{ rotate }}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <span className="pin-dot" />
      <span className="pinned-card-step">{step}</span>
      <h3>{title}</h3>
      <p>{children}</p>
    </motion.div>
  );
}
