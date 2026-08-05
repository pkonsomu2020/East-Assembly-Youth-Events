import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

export function LoadingScreen() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduceMotion) {
      setVisible(false);
      return;
    }
    const timer = setTimeout(() => setVisible(false), 2600);
    return () => clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="loading-flame-mask">
            <img src="/assets/camp-ignite-flame-icon.png" alt="" className="loading-flame-ghost" />
            <motion.div
              className="loading-flame-fill"
              initial={{ height: '0%' }}
              animate={{ height: '100%' }}
              transition={{ duration: 2.2, ease: 'easeInOut' }}
            >
              <img src="/assets/camp-ignite-flame-icon.png" alt="" />
            </motion.div>
          </div>
          <span className="loading-label">KAG East Assembly</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
