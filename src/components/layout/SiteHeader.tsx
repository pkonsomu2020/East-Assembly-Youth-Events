import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollProgress } from '../../hooks/useScrollProgress';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/events', label: 'Youth Events' },
  { to: '/merchandise', label: 'Merchandise' },
  { to: '/camp-ignite', label: 'Camp Ignite 2026' },
  { to: '/camp-account', label: 'Camp Account' },
  { to: '/volunteer', label: 'Volunteer' },
];

export function SiteHeader() {
  const [navOpen, setNavOpen] = useState(false);
  const { pathname } = useLocation();
  const progress = useScrollProgress();

  return (
    <header className="site-header">
      <span className="scroll-progress" style={{ width: `${progress}%` }} />
      <div className="nav-wrap">
        <Link to="/" className="brand" onClick={() => setNavOpen(false)}>
          <img src="/assets/logo.png" alt="KAG East Assembly Youth Ministry" className="brand-logo" />
        </Link>
        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle menu"
          onClick={() => setNavOpen((open) => !open)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M3 6H21M3 12H21M3 18H21" stroke="#101C33" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <ul className={`nav-links${navOpen ? ' open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={pathname === link.to ? 'active' : ''}
                onClick={() => setNavOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="nav-cta">
            <Link to="/#join" className="btn btn-flame btn-sm" onClick={() => setNavOpen(false)}>
              Join Us
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
