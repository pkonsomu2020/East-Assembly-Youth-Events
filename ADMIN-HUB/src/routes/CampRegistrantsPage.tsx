import { useMemo, useState } from 'react';
import { useCampRegistrants } from '../hooks/useCampRegistrants';
import { CampRegistrantRow } from '../components/camp/CampRegistrantRow';
import { SearchInput } from '../components/common/SearchInput';

export function CampRegistrantsPage() {
  const { registrants, loading, error, refetch } = useCampRegistrants();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return registrants;
    return registrants.filter(
      (r) => r.full_name.toLowerCase().includes(q) || r.phone.toLowerCase().includes(q),
    );
  }, [registrants, search]);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Camp Ignite Registrants</h1>
          <p className="small-note">
            {registrants.length} registered. Expand a row to see their full payment history and verify pending
            payments.
          </p>
        </div>
        <SearchInput value={search} onChange={setSearch} />
      </div>

      <div className="table-card">
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th></th>
                <th>Registrant</th>
                <th>Paid / Total</th>
                <th>Progress</th>
                <th>Payment Pattern</th>
                <th>Registered</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((registrant) => (
                <CampRegistrantRow key={registrant.id} registrant={registrant} onChanged={refetch} />
              ))}
            </tbody>
          </table>
        </div>
        {!loading && filtered.length === 0 && (
          <div className="table-empty">
            {error ? `Couldn't load registrants: ${error}` : 'No camp registrants match your search.'}
          </div>
        )}
        {loading && <div className="table-empty">Loading...</div>}
      </div>
    </div>
  );
}
