import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export function VerifyPaymentButton({ paymentId, onVerified }: { paymentId: string; onVerified: () => void }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleVerify() {
    if (!confirm('Mark this payment as verified? This will add the amount to the registrant\'s total.')) return;
    setSubmitting(true);
    setError(null);
    const { error } = await supabase.rpc('verify_camp_payment', { p_payment_id: paymentId });
    setSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }
    onVerified();
  }

  return (
    <div className="flex items-center gap-8">
      <button type="button" className="btn btn-flame btn-sm" onClick={handleVerify} disabled={submitting}>
        {submitting ? 'Verifying...' : 'Verify'}
      </button>
      {error && <span className="small-note" style={{ color: 'var(--danger)' }}>{error}</span>}
    </div>
  );
}
