import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { SITE_CONFIG } from '../../data/siteConfig';

const SLIDES = [
  '/assets/camp_1.jpeg',
  '/assets/camp_2.jpeg',
  '/assets/camp_3.jpeg',
  '/assets/camp_4.jpeg',
  '/assets/camp_5.jpeg',
];

const slideVariants = {
  enter: (dir: number) => ({ x: `${dir * 100}%` }),
  center: { x: 0 },
  exit: (dir: number) => ({ x: `${dir * -100}%` }),
};

function formatCampDates() {
  const start = new Date(SITE_CONFIG.campStart);
  const end = new Date(SITE_CONFIG.campEnd);
  const fmt = (d: Date, withYear: boolean) =>
    d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: withYear ? 'numeric' : undefined });
  return `${fmt(start, false)} – ${fmt(end, true)}`;
}

export function HeroPhotoShowcase() {
  const [[slide, direction], setSlide] = useState<[number, number]>([0, 1]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setInterval(() => goTo(slide + 1), 4500);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slide]);

  function goTo(index: number) {
    const dir = index > slide || (index === 0 && slide === SLIDES.length - 1) ? 1 : -1;
    setSlide([((index % SLIDES.length) + SLIDES.length) % SLIDES.length, dir]);
  }

  return (
    <div className="hero-photo-showcase">
      <div className="hero-photo-frame">
        <div className="hero-photo-viewport">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={slide}
              className="hero-photo-frame-inner"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: reduceMotion ? 0 : 0.55, ease: 'easeInOut' }}
            >
              <motion.img
                src={SLIDES[slide]}
                alt="Youth ministry moments"
                initial={{ scale: 1 }}
                animate={{ scale: reduceMotion ? 1 : 1.12 }}
                transition={{ duration: 4.5, ease: 'linear' }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          type="button"
          className="hero-frame-arrow hero-frame-arrow-prev"
          aria-label="Previous photo"
          onClick={() => goTo(slide - 1)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#101C33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          className="hero-frame-arrow hero-frame-arrow-next"
          aria-label="Next photo"
          onClick={() => goTo(slide + 1)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 6L15 12L9 18" stroke="#101C33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="hero-frame-dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to photo ${i + 1}`}
              className={i === slide ? 'active' : ''}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>

      <div className="hero-badge hero-badge-top">
        🔥 <span>On Fire For Christ</span>
      </div>
      <div className="hero-badge hero-badge-bottom">
        <b>Camp Ignite 2026</b>
        <span>{formatCampDates()}</span>
      </div>
    </div>
  );
}
