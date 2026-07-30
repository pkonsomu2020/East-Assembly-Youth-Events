import { useState } from 'react';
import type { FormEvent } from 'react';
import { supabase } from '../../lib/supabaseClient';
import type { EventDef } from '../../types/domain';
import type { AlertState } from '../../types/domain';
import { Alert } from '../common/Alert';
import { Button } from '../common/Button';
import { TillBox } from '../common/TillBox';

export function EventRegistrationForm({ event }: { event: EventDef }) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [expectation, setExpectation] = useState('');
  const [amount, setAmount] = useState('');
  const [mpesa, setMpesa] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState<AlertState | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const payload: Record<string, unknown> = {
      event_slug: event.slug,
      event_name: event.name,
      full_name: fullName.trim(),
      phone: phone.trim(),
      expectation: expectation.trim(),
      requires_payment: event.requiresPayment,
      payment_status: event.requiresPayment ? 'pending' : 'not_required',
    };

    if (event.requiresPayment) {
      const parsedAmount = parseFloat(amount);
      const mpesaTrimmed = mpesa.trim();
      if (!parsedAmount || !mpesaTrimmed) {
        setAlert({ message: 'Please fill in the amount and paste your M-Pesa message.', type: 'error' });
        return;
      }
      payload.amount_expected = parsedAmount;
      payload.mpesa_message = mpesaTrimmed;
    }

    setSubmitting(true);
    const { error } = await supabase.from('event_registrations').insert(payload);
    setSubmitting(false);

    if (error) {
      setAlert({ message: 'Something went wrong. Please try again or contact us directly.', type: 'error' });
      console.error(error);
      return;
    }

    setAlert({
      message: event.requiresPayment
        ? "You're in! We'll verify your payment and confirm your ticket shortly."
        : "You're registered! See you there.",
      type: 'success',
    });
    setFullName('');
    setPhone('');
    setExpectation('');
    setAmount('');
    setMpesa('');
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
      <div className="field">
        <label>Full Name</label>
        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
      </div>
      <div className="field">
        <label>Phone Number</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          placeholder="07XXXXXXXX"
        />
      </div>
      <div className="field">
        <label>What are you expecting from this event?</label>
        <textarea rows={2} value={expectation} onChange={(e) => setExpectation(e.target.value)} />
      </div>

      {event.requiresPayment && (
        <>
          <TillBox />
          <div className="field">
            <label>Amount Sent (Ksh)</label>
            <input type="number" min={1} value={amount} onChange={(e) => setAmount(e.target.value)} required />
          </div>
          <div className="field">
            <label>Paste Your M-Pesa Confirmation Message</label>
            <textarea
              rows={3}
              value={mpesa}
              onChange={(e) => setMpesa(e.target.value)}
              required
              placeholder="e.g. QFT1XXXXX Confirmed. Ksh500.00 sent to JOAN GATHONI NJAU..."
            />
            <small>We'll verify this against our till statement and confirm your ticket.</small>
          </div>
        </>
      )}

      <Alert state={alert} />

      <Button type="submit" variant="flame" block disabled={submitting}>
        {submitting
          ? 'Submitting...'
          : event.requiresPayment
            ? 'Submit & Reserve Ticket'
            : 'Submit Registration'}
      </Button>
    </form>
  );
}
