import { useMemo, useState } from 'react';
import { useVolunteers } from '../hooks/useVolunteers';
import { SearchInput } from '../components/common/SearchInput';

export function VolunteersPage() {
  const { rows, loading } = useVolunteers();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.full_name.toLowerCase().includes(q) ||
        r.phone.toLowerCase().includes(q) ||
        r.departments.some((d) => d.toLowerCase().includes(q)),
    );
  }, [rows, search]);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Volunteers</h1>
          <p className="small-note">{rows.length} people signed up to serve.</p>
        </div>
        <SearchInput value={search} onChange={setSearch} placeholder="Search by name, phone, or team..." />
      </div>

      <div className="table-card">
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Teams</th>
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
                  <td className="wrap">{row.departments.join(', ')}</td>
                  <td className="wrap" style={{ maxWidth: 260 }}>{row.availability_notes || 'N/A'}</td>
                  <td>{new Date(row.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && filtered.length === 0 && <div className="table-empty">No volunteers match your search.</div>}
        {loading && <div className="table-empty">Loading...</div>}
      </div>
    </div>
  );
}
