import { useMemo, useState } from 'react';
import { useMerchandiseOrders } from '../hooks/useMerchandiseOrders';
import { StatusPill } from '../components/common/StatusPill';
import { VerifyStatusButton } from '../components/common/VerifyStatusButton';
import { SearchInput } from '../components/common/SearchInput';

export function MerchandiseOrdersPage() {
  const { rows, loading, refetch } = useMerchandiseOrders();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.buyer_name.toLowerCase().includes(q) ||
        r.buyer_phone.toLowerCase().includes(q) ||
        r.item_name.toLowerCase().includes(q),
    );
  }, [rows, search]);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Merchandise Orders</h1>
          <p className="small-note">{rows.length} orders placed.</p>
        </div>
        <SearchInput value={search} onChange={setSearch} placeholder="Search by name, phone, or item..." />
      </div>

      <div className="table-card">
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Details</th>
                <th>Buyer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Ordered</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id}>
                  <td>{row.item_name} &times;{row.quantity}</td>
                  <td className="wrap">
                    {[row.size, row.color, row.team_choice].filter(Boolean).join(', ') || 'N/A'}
                  </td>
                  <td>
                    {row.buyer_name}
                    <br />
                    <span className="small-note">{row.buyer_phone}</span>
                  </td>
                  <td>Ksh {Number(row.total_amount).toLocaleString()}</td>
                  <td><StatusPill status={row.order_status} /></td>
                  <td>{new Date(row.created_at).toLocaleDateString()}</td>
                  <td>
                    {row.order_status === 'pending' && (
                      <VerifyStatusButton
                        table="merchandise_orders"
                        id={row.id}
                        column="order_status"
                        targetStatus="verified"
                        label="Verify"
                        onChanged={refetch}
                      />
                    )}
                    {row.order_status === 'verified' && (
                      <VerifyStatusButton
                        table="merchandise_orders"
                        id={row.id}
                        column="order_status"
                        targetStatus="fulfilled"
                        label="Mark Fulfilled"
                        onChanged={refetch}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && filtered.length === 0 && <div className="table-empty">No merchandise orders match your search.</div>}
        {loading && <div className="table-empty">Loading...</div>}
      </div>
    </div>
  );
}
