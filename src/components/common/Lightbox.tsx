import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';

export function Lightbox({ src, onClose }: { src: string | null; onClose: () => void }) {
  useEffect(() => {
    if (!src) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [src, onClose]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          className="lightbox-overlay open"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <button type="button" className="lightbox-close" aria-label="Close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 6L18 18M18 6L6 18" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <motion.img
            src={src}
            alt=""
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
