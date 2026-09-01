import { useMemo, useState } from 'react';
import {
  MdCameraAlt,
  MdMic,
  MdVolunteerActivism,
  MdMusicNote,
  MdCampaign,
  MdSportsSoccer,
} from 'react-icons/md';
import type { IconType } from 'react-icons';
import { useVolunteers } from '../hooks/useVolunteers';
import { SearchInput } from '../components/common/SearchInput';

// Canonical department list: must match src/components/volunteer/DepartmentPicker.tsx
const DEPT_MAP: Record<string, IconType> = {
  'Media & Marketing Ministry': MdCameraAlt,
  'Master of Ceremonies':       MdMic,
  'Prayer Ministry':            MdVolunteerActivism,
  'Ezesha Worship Team':        MdMusicNote,
  'Outreach Ministry':          MdCampaign,
  'Sports Ministry':            MdSportsSoccer,
};

function DeptBadge({ label }: { label: string }) {
  const Icon = DEPT_MAP[label];
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: '3px 9px', background: '#EDF8FE', border: '1.5px solid #1B7FB5',
        fontSize: '.75rem', fontWeight: 700, color: '#123047', whiteSpace: 'nowrap',
        marginBottom: 3,
      }}
    >
      {Icon && <Icon size={12} />}
      {label}
    </span>
  );
}

export function VolunteersPage() {
  const { rows, loading } = useVolunteers();
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');

  const filtered = useMemo(() => {
    let result =
      deptFilter === 'all'
        ? rows
        : rows.filter((r) => r.departments.includes(deptFilter));

    const q = search.trim().toLowerCase();
    if (!q) return result;
    return result.filter(
      (r) =>
        r.full_name.toLowerCase().includes(q) ||
        r.phone.toLowerCase().includes(q) ||
        r.departments.some((d) => d.toLowerCase().includes(q)),
    );
  }, [rows, search, deptFilter]);

  // Count per department
  const deptCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const dept of Object.keys(DEPT_MAP)) {
      counts[dept] = rows.filter((r) => r.departments.includes(dept)).length;
    }
    return counts;
  }, [rows]);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Volunteers</h1>
          <p className="small-note">{rows.length} people signed up to serve.</p>
        </div>
        <SearchInput value={search} onChange={setSearch} placeholder="Search by name, phone, or team..." />
      </div>

      {/* Department breakdown + filter */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
        <button
          type="button"
          className={`btn btn-sm ${deptFilter === 'all' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setDeptFilter('all')}
        >
          All ({rows.length})
        </button>
        {Object.entries(DEPT_MAP).map(([label, Icon]) => (
          <button
            key={label}
            type="button"
            className={`btn btn-sm ${deptFilter === label ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setDeptFilter(label)}
            style={{ display: 'flex', alignItems: 'center', gap: 5 }}
          >
            <Icon size={13} />
            {label} ({deptCounts[label] ?? 0})
          </button>
        ))}
      </div>

      <div className="table-card">
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Ministry Teams</th>
                <th>Notes</th>
                <th>Signed Up</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id}>
                  <td>{row.full_name}</td>
                  <td>{row.phone}</td>
                  <td>{row.email || 'N/A'}</td>
                  <td>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {row.departments.map((dept) => (
                        <DeptBadge key={dept} label={dept} />
                      ))}
                    </div>
                  </td>
                  <td className="wrap" style={{ maxWidth: 260 }}>
                    {row.availability_notes || 'N/A'}
                  </td>
                  <td>{new Date(row.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && filtered.length === 0 && (
          <div className="table-empty">No volunteers match your search or filter.</div>
        )}
        {loading && <div className="table-empty">Loading...</div>}
      </div>
    </div>
  );
}
