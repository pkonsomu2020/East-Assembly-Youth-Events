import { useState } from 'react';
import type { CampRegistrantWithPayments } from '../../types/database';
import { getPaymentPattern } from '../../lib/paymentPattern';
import { StatusPill } from '../common/StatusPill';
import { VerifyPaymentButton } from './VerifyPaymentButton';
import { ChevronDownIcon, ChevronUpIcon } from '../common/icons';

export function CampRegistrantRow({
  registrant,
  onChanged,
}: {
  registrant: CampRegistrantWithPayments;
  onChanged: () => void;
}) {
  const [open, setOpen] = useState(false);
  const pct = Number(registrant.percentage_paid) || 0;
  const pattern = getPaymentPattern(pct, registrant.payments);

  return (
    <>
      <tr>
        <td>
          <button type="button" className="expand-toggle" onClick={() => setOpen((v) => !v)} aria-label="Toggle payment history">
            {open ? ChevronUpIcon : ChevronDownIcon}
          </button>
        </td>
        <td className="wrap">
          <b>{registrant.full_name}</b>
          <br />
          <span className="small-note">{registrant.phone}</span>
        </td>
        <td>Ksh {Number(registrant.amount_paid).toLocaleString()} / {Number(registrant.total_fee).toLocaleString()}</td>
        <td>
          <div className="flex items-center gap-8">
            <div className="progress-bar"><div className="progress-bar-fill" style={{ width: `${Math.min(100, pct)}%` }} /></div>
            <span className="small-note">{pct}%</span>
          </div>
        </td>
        <td><span className={`pattern-badge ${pattern.className}`}>{pattern.label}</span></td>
        <td>{new Date(registrant.created_at).toLocaleDateString()}</td>
      </tr>
      {open && (
        <tr>
          <td colSpan={6} style={{ padding: 0, border: 'none' }}>
            <div className="payment-history">
              {registrant.payments.length === 0 ? (
                <p className="small-note" style={{ margin: '10px 0 0' }}>No payments submitted yet.</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>M-Pesa Message</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrant.payments.map((payment) => (
                      <tr key={payment.id}>
                        <td>{new Date(payment.created_at).toLocaleDateString()}</td>
                        <td>Ksh {Number(payment.amount).toLocaleString()}</td>
                        <td className="wrap" style={{ maxWidth: 320 }}>{payment.mpesa_message}</td>
                        <td><StatusPill status={payment.status} /></td>
                        <td>
                          {payment.status === 'pending' ? (
                            <VerifyPaymentButton paymentId={payment.id} onVerified={onChanged} />
                          ) : (
                            <span className="small-note">
                              {payment.verified_at ? new Date(payment.verified_at).toLocaleDateString() : 'N/A'}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
