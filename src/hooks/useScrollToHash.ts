import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * React Router doesn't jump to #hash targets the way a plain <a href="#join">
 * did on the old static site. Replicate that behavior on every navigation.
 */
export function useScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }
    const id = hash.slice(1);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash, pathname]);
}
