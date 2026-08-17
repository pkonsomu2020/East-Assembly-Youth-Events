import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useScrollProgress } from '../../hooks/useScrollProgress';

interface NavItem {
  to: string;
  label: string;
}

interface NavDropdown {
  label: string;
  items: NavItem[];
}

type NavEntry = NavItem | NavDropdown;

const NAV_ENTRIES: NavEntry[] = [
  { to: '/events', label: 'Youth Events' },
  { to: '/merchandise', label: 'Merchandise' },
  {
    label: 'Camp Ignite',
    items: [
      { to: '/camp-ignite', label: 'Camp Ignite 2026' },
      { to: '/camp-account', label: 'Camp Account' },
    ],
  },
  { to: '/volunteer', label: 'Volunteer' },
  { to: '/members', label: 'Members' },
  { to: '/bible', label: 'Bible' },
];

function isDropdown(entry: NavEntry): entry is NavDropdown {
  return 'items' in entry;
}

export function SiteHeader() {
  const [navOpen, setNavOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement | null>(null);
  const { pathname } = useLocation();
  const progress = useScrollProgress();

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent | TouchEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Close nav and dropdown on route change
  useEffect(() => {
    setNavOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  function handleMouseEnter() {
    if (window.innerWidth > 960) {
      setDropdownOpen(true);
    }
  }

  function handleMouseLeave() {
    if (window.innerWidth > 960) {
      setDropdownOpen(false);
    }
  }

  function toggleDropdown(e: React.MouseEvent | React.TouchEvent) {
    e.stopPropagation();
    setDropdownOpen((prev) => !prev);
  }

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
          {NAV_ENTRIES.map((entry) => {
            if (isDropdown(entry)) {
              const isChildActive = entry.items.some((item) => pathname === item.to);
              return (
                <li
                  key={entry.label}
                  ref={dropdownRef}
                  className={`nav-item-dropdown${dropdownOpen ? ' is-open' : ''}`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    className={`nav-dropdown-trigger${isChildActive ? ' active' : ''}`}
                    onClick={toggleDropdown}
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen}
                  >
                    <span>{entry.label}</span>
                    <MdKeyboardArrowDown
                      size={18}
                      className={`nav-dropdown-caret${dropdownOpen ? ' rotated' : ''}`}
                    />
                  </button>

                  <ul className={`nav-dropdown-menu${dropdownOpen ? ' show' : ''}`}>
                    {entry.items.map((sub) => (
                      <li key={sub.to} className="nav-dropdown-menu-item">
                        <Link
                          to={sub.to}
                          className={`nav-dropdown-link${pathname === sub.to ? ' active' : ''}`}
                          onClick={() => {
                            setNavOpen(false);
                            setDropdownOpen(false);
                          }}
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            }

            return (
              <li key={entry.to}>
                <Link
                  to={entry.to}
                  className={pathname === entry.to ? 'active' : ''}
                  onClick={() => setNavOpen(false)}
                >
                  {entry.label}
                </Link>
              </li>
            );
          })}

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
