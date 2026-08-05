import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Overview' },
  { to: '/camp-ignite', label: 'Camp Ignite' },
  { to: '/events', label: 'Events' },
  { to: '/merchandise', label: 'Merchandise' },
  { to: '/volunteers', label: 'Volunteers' },
];

export function AdminHeader({ email, onSignOut }: { email: string; onSignOut: () => void }) {
  const { pathname } = useLocation();

  return (
    <header className="admin-header">
      <div className="admin-header-inner">
        <Link to="/" className="admin-brand">
          <img src="/assets/logo.png" alt="KAG East Assembly Youth Ministry" />
          <span>Admin Hub</span>
        </Link>
        <ul className="admin-nav">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <Link to={link.to} className={pathname === link.to ? 'active' : ''}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-12">
          <span className="small-note">{email}</span>
          <button type="button" className="btn btn-outline btn-sm" onClick={onSignOut}>
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
