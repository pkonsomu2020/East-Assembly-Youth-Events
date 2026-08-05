import { useMemo, useState } from 'react';
import { useEventRegistrations } from '../hooks/useEventRegistrations';
import { StatusPill } from '../components/common/StatusPill';
import { VerifyStatusButton } from '../components/common/VerifyStatusButton';
import { SearchInput } from '../components/common/SearchInput';

export function EventRegistrationsPage() {
  const { rows, loading, refetch } = useEventRegistrations();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.full_name.toLowerCase().includes(q) ||
        r.phone.toLowerCase().includes(q) ||
        r.event_name.toLowerCase().includes(q),
    );
  }, [rows, search]);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Event Registrations</h1>
          <p className="small-note">{rows.length} registrations across all events.</p>
        </div>
        <SearchInput value={search} onChange={setSearch} placeholder="Search by name, phone, or event..." />
      </div>

      <div className="table-card">
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Registered</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id}>
                  <td>{row.event_name}</td>
                  <td>{row.full_name}</td>
                  <td>{row.phone}</td>
                  <td>{row.amount_expected ? `Ksh ${Number(row.amount_expected).toLocaleString()}` : 'Free'}</td>
                  <td><StatusPill status={row.payment_status} /></td>
                  <td>{new Date(row.created_at).toLocaleDateString()}</td>
                  <td>
                    {row.payment_status === 'pending' && (
                      <VerifyStatusButton
                        table="event_registrations"
                        id={row.id}
                        column="payment_status"
                        targetStatus="verified"
                        label="Verify"
                        onChanged={refetch}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && filtered.length === 0 && <div className="table-empty">No event registrations match your search.</div>}
        {loading && <div className="table-empty">Loading...</div>}
      </div>
    </div>
  );
}
