import { useMemo, useState } from 'react';
import { useMemberRegistrations } from '../hooks/useMemberRegistrations';
import { SearchInput } from '../components/common/SearchInput';

const TYPE_LABELS: Record<string, string> = {
  'new': 'New Member',
  'born-again': 'Born Again',
};

export function MemberRegistrationsPage() {
  const { rows, loading } = useMemberRegistrations();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'new' | 'born-again'>('all');

  const filtered = useMemo(() => {
    let result = typeFilter === 'all' ? rows : rows.filter((r) => r.member_type === typeFilter);
    const q = search.trim().toLowerCase();
    if (!q) return result;
    return result.filter(
      (r) =>
        r.full_name.toLowerCase().includes(q) ||
        r.phone.toLowerCase().includes(q) ||
        (r.email ?? '').toLowerCase().includes(q) ||
        (r.residence ?? '').toLowerCase().includes(q),
    );
  }, [rows, search, typeFilter]);

  const newCount = rows.filter((r) => r.member_type === 'new').length;
  const bornAgainCount = rows.filter((r) => r.member_type === 'born-again').length;

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Member Registrations</h1>
          <p className="subtext">
            {rows.length} total | {newCount} new member{newCount !== 1 ? 's' : ''}, {bornAgainCount} born again.
          </p>
        </div>
        <SearchInput value={search} onChange={setSearch} placeholder="Search by name, phone, or location..." />
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {(['all', 'new', 'born-again'] as const).map((f) => (
          <button
            key={f}
            type="button"
            className={`btn btn-sm ${typeFilter === f ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setTypeFilter(f)}
          >
            {f === 'all' ? `All (${rows.length})` : f === 'new' ? `New Members (${newCount})` : `Born Again (${bornAgainCount})`}
          </button>
        ))}
      </div>

      <div className="table-card">
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Residence</th>
                <th>Age</th>
                <th>How They Heard</th>
                <th>Prayer / Notes</th>
                <th>Registered</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id}>
                  <td>{row.full_name}</td>
                  <td>
                    <span
                      className={`status-badge ${row.member_type === 'born-again' ? 'status-verified' : 'status-pending'}`}
                    >
                      {TYPE_LABELS[row.member_type] ?? row.member_type}
                    </span>
                  </td>
                  <td>{row.phone}</td>
                  <td>{row.email || 'N/A'}</td>
                  <td>{row.residence || 'N/A'}</td>
                  <td>{row.age ?? 'N/A'}</td>
                  <td className="wrap" style={{ maxWidth: 180 }}>{row.how_you_heard || 'N/A'}</td>
                  <td className="wrap" style={{ maxWidth: 260 }}>{row.prayer_request || 'N/A'}</td>
                  <td>{new Date(row.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && filtered.length === 0 && (
          <div className="table-empty">No registrations match your search or filter.</div>
        )}
        {loading && <div className="table-empty">Loading...</div>}
      </div>
    </div>
  );
}
