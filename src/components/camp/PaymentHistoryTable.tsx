import type { PaymentHistoryEntry } from '../../hooks/usePaymentHistory';

export function PaymentHistoryTable({ payments }: { payments: PaymentHistoryEntry[] }) {
  return (
    <div className="card">
      <h3>Payment History</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p, i) => (
            <tr key={i}>
              <td>{new Date(p.created_at).toLocaleDateString()}</td>
              <td>Ksh {Number(p.amount).toLocaleString()}</td>
              <td>
                <span className={`status-pill status-${p.status}`}>
                  {p.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {payments.length === 0 && <p className="small-note">No payments submitted yet.</p>}
    </div>
  );
}
