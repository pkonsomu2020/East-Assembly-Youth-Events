import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { SITE_CONFIG } from '../../data/siteConfig';

const SLIDES = [
  '/assets/camp_1.jpeg',
  '/assets/camp_2.jpeg',
  '/assets/gallery/gallery-01.jpg',
  '/assets/gallery/gallery-02.jpg',
];

function formatCampDates() {
  const start = new Date(SITE_CONFIG.campStart);
  const end = new Date(SITE_CONFIG.campEnd);
  const fmt = (d: Date, withYear: boolean) =>
    d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: withYear ? 'numeric' : undefined });
  return `${fmt(start, false)} – ${fmt(end, true)}`;
}

export function HeroPhotoShowcase() {
  const [slide, setSlide] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 4500);
    return () => clearInterval(timer);
  }, []);

  function goTo(index: number) {
    setSlide(((index % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }

  return (
    <div className="hero-photo-showcase">
      <div className="hero-photo-frame">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={slide}
            className="hero-photo-frame-inner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.4 }}
          >
            <img src={SLIDES[slide]} alt="Youth ministry moments" />
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          className="hero-frame-arrow hero-frame-arrow-prev"
          aria-label="Previous photo"
          onClick={() => goTo(slide - 1)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#122A3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          className="hero-frame-arrow hero-frame-arrow-next"
          aria-label="Next photo"
          onClick={() => goTo(slide + 1)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 6L15 12L9 18" stroke="#122A3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
