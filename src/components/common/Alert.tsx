import { useEffect, useRef } from 'react';
import type { AlertState } from '../../types/domain';

export function Alert({ state }: { state: AlertState | null }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state) ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [state]);

  return (
    <div ref={ref} className={`alert${state ? ` show alert-${state.type}` : ''}`}>
      {state?.message}
    </div>
  );
}
