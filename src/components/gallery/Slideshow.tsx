import { useEffect, useRef, useState } from 'react';

export function Slideshow({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function goTo(index: number) {
    setCurrent(((index % images.length) + images.length) % images.length);
  }

  function resetTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % images.length), 4500);
  }

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  return (
    <div
      className="slideshow"
      onMouseEnter={() => {
        if (timerRef.current) clearInterval(timerRef.current);
      }}
      onMouseLeave={resetTimer}
    >
      {images.map((src, i) => (
        <div key={src} className={`slide${i === current ? ' active' : ''}`}>
          <img src={src} alt="Youth ministry gathering" />
        </div>
      ))}
      <button
        type="button"
        className="slideshow-arrow slideshow-prev"
        aria-label="Previous photo"
        onClick={() => {
          goTo(current - 1);
          resetTimer();
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="#122A3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        className="slideshow-arrow slideshow-next"
        aria-label="Next photo"
        onClick={() => {
          goTo(current + 1);
          resetTimer();
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M9 6L15 12L9 18" stroke="#122A3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="slideshow-dots">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            aria-label={`Go to photo ${i + 1}`}
            className={i === current ? 'active' : ''}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
