import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Overview' },
  { to: '/camp-ignite', label: 'Camp Ignite' },
  { to: '/events', label: 'Events' },
  { to: '/merchandise', label: 'Merchandise' },
  { to: '/volunteers', label: 'Volunteers' },
  { to: '/members', label: 'Members' },
];

export function AdminSidebar({ email, onSignOut }: { email: string; onSignOut: () => void }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="admin-mobile-topbar">
        <Link to="/" className="admin-brand" onClick={() => setOpen(false)}>
          <img src="/assets/logo.png" alt="KAG East Assembly Youth Ministry" />
          <span>Admin Hub</span>
        </Link>
        <button
          type="button"
          className="admin-menu-toggle"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 6H21M3 12H21M3 18H21" stroke="#101C33" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className={`admin-sidebar-backdrop${open ? ' open' : ''}`} onClick={() => setOpen(false)} />

      <aside className={`admin-sidebar${open ? ' open' : ''}`}>
        <Link to="/" className="admin-brand admin-sidebar-brand" onClick={() => setOpen(false)}>
          <img src="/assets/logo.png" alt="KAG East Assembly Youth Ministry" />
          <span>Admin Hub</span>
        </Link>
        <nav className="admin-sidebar-nav">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={pathname === link.to ? 'active' : ''}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <p className="small-note" style={{ marginBottom: 10, wordBreak: 'break-all' }}>{email}</p>
          <button type="button" className="btn btn-outline btn-sm btn-block" onClick={onSignOut}>
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
