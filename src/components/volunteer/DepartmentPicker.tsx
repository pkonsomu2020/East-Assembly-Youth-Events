import { useEffect, useRef, useState } from 'react';
import {
  MdCameraAlt,
  MdMic,
  MdVolunteerActivism,
  MdMusicNote,
  MdCampaign,
  MdSportsSoccer,
  MdExpandMore,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdClose,
} from 'react-icons/md';
import type { IconType } from 'react-icons';

export const DEPARTMENTS: { Icon: IconType; label: string }[] = [
  { Icon: MdCameraAlt,         label: 'Media & Marketing Ministry' },
  { Icon: MdMic,               label: 'Master of Ceremonies' },
  { Icon: MdVolunteerActivism, label: 'Prayer Ministry' },
  { Icon: MdMusicNote,         label: 'Ezesha Worship Team' },
  { Icon: MdCampaign,          label: 'Outreach Ministry' },
  { Icon: MdSportsSoccer,      label: 'Sports Ministry' },
];

export function DepartmentPicker({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (dept: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const summary =
    selected.length === 0
      ? 'Select ministry team(s)…'
      : selected.length === 1
        ? selected[0]
        : `${selected.length} teams selected`;

  return (
    <div className="field">
      <label>Choose Your Team(s)</label>

      {/* Trigger button */}
      <div className="dept-dropdown" ref={ref}>
        <button
          type="button"
          className={`dept-dropdown-trigger${open ? ' open' : ''}`}
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span className="dept-dropdown-summary">{summary}</span>
          <MdExpandMore
            size={20}
            style={{ flexShrink: 0, transition: 'transform .2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </button>

        {/* Dropdown panel */}
        {open && (
          <ul className="dept-dropdown-panel" role="listbox" aria-multiselectable="true">
            {DEPARTMENTS.map((d) => {
              const checked = selected.includes(d.label);
              return (
                <li
                  key={d.label}
                  role="option"
                  aria-selected={checked}
                  className={`dept-dropdown-option${checked ? ' selected' : ''}`}
                  onClick={() => onToggle(d.label)}
                >
                  {checked
                    ? <MdCheckBox size={18} style={{ flexShrink: 0, color: 'var(--flame)' }} />
                    : <MdCheckBoxOutlineBlank size={18} style={{ flexShrink: 0, color: 'var(--ink-soft)' }} />
                  }
                  <d.Icon size={16} style={{ flexShrink: 0 }} />
                  <span>{d.label}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Selected chips shown below the dropdown */}
      {selected.length > 0 && (
        <div className="dept-chips">
          {selected.map((label) => {
            const dept = DEPARTMENTS.find((d) => d.label === label);
            return (
              <span key={label} className="dept-chip">
                {dept && <dept.Icon size={13} style={{ flexShrink: 0 }} />}
                {label}
                <button
                  type="button"
                  aria-label={`Remove ${label}`}
                  onClick={() => onToggle(label)}
                  className="dept-chip-remove"
                >
                  <MdClose size={13} />
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
