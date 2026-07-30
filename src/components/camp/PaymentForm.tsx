import { useState } from 'react';
import type { FormEvent } from 'react';
import { supabase } from '../../lib/supabaseClient';
import type { AlertState } from '../../types/domain';
import { Alert } from '../common/Alert';
import { Button } from '../common/Button';
import { TillBox } from '../common/TillBox';

export function PaymentForm({
  campRegistrationId,
  userId,
  onSubmitted,
}: {
  campRegistrationId: string;
  userId: string;
  onSubmitted: () => void;
}) {
  const [amount, setAmount] = useState('');
  const [mpesa, setMpesa] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState<AlertState | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    const mpesaTrimmed = mpesa.trim();
    if (!parsedAmount || !mpesaTrimmed) {
      setAlert({ message: 'Enter an amount and paste your M-Pesa message.', type: 'error' });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from('camp_payments').insert({
      camp_registration_id: campRegistrationId,
      user_id: userId,
      amount: parsedAmount,
      mpesa_message: mpesaTrimmed,
      status: 'pending',
    });
    setSubmitting(false);

    if (error) {
      setAlert({ message: 'Something went wrong submitting your payment.', type: 'error' });
      console.error(error);
      return;
    }

    setAlert({
      message: "Payment submitted! We'll verify it against our till and update your progress.",
      type: 'success',
    });
    setAmount('');
    setMpesa('');
    onSubmitted();
  }

  return (
    <div className="card" style={{ marginBottom: 24 }}>
      <h3>Make a Payment</h3>
      <TillBox />
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Amount Sent (Ksh)</label>
          <input type="number" min={1} value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </div>
        <div className="field">
          <label>Paste Your M-Pesa Confirmation Message</label>
          <textarea rows={3} value={mpesa} onChange={(e) => setMpesa(e.target.value)} required />
        </div>
        <Alert state={alert} />
        <Button type="submit" variant="flame" block disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Payment'}
        </Button>
      </form>
      <p className="small-note" style={{ marginTop: 10 }}>
        After you submit, our team verifies it against the till statement and updates your progress — you'll see
        it reflected here once confirmed.
      </p>
    </div>
  );
}
