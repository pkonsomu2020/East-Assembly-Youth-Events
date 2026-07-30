import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';

export function Modal({
  open,
  onClose,
  title,
  size,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: 'lg';
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className={`modal-card${size === 'lg' ? ' modal-card-lg' : ''}`}
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2 }}
          >
            <button type="button" className="modal-close" aria-label="Close" onClick={onClose}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M6 6L18 18M18 6L6 18" stroke="#122A3C" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            {title && <h3 className="modal-title">{title}</h3>}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
