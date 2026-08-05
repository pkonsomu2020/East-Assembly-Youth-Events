import { useState } from 'react';

export function FlameToggleCTA() {
  const [lit, setLit] = useState(false);

  return (
    <div className="flame-toggle-wrap">
      <button
        type="button"
        className={`flame-toggle-btn${lit ? ' lit' : ''}`}
        aria-pressed={lit}
        onClick={() => setLit((v) => !v)}
      >
        <span className="flame-toggle-glow" aria-hidden="true" />
        <img src="/assets/camp-ignite-flame-icon.png" alt="" />
      </button>
      <span className="flame-toggle-caption">
        {lit ? "That's the spirit! Tap again." : 'Tap to stoke the fire'}
      </span>
    </div>
  );
}
