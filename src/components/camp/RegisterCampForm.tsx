import { useState } from 'react';
import type { FormEvent } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { SITE_CONFIG } from '../../data/siteConfig';
import type { AlertState } from '../../types/domain';
import { Alert } from '../common/Alert';
import { Button } from '../common/Button';
import { IconField } from '../common/IconField';
import { PersonIcon, PhoneIcon } from '../common/formIcons';

export function RegisterCampForm({ userId, onRegistered }: { userId: string; onRegistered: () => void }) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState<AlertState | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.from('camp_registrations').insert({
      user_id: userId,
      full_name: fullName.trim(),
      phone: phone.trim(),
      total_fee: SITE_CONFIG.campFeeTotal,
      amount_paid: 0,
    });
    setSubmitting(false);

    if (error) {
      setAlert({ message: 'Could not complete registration. Please try again.', type: 'error' });
      console.error(error);
      return;
    }

    onRegistered();
  }

  return (
    <form onSubmit={handleSubmit}>
      <IconField
        label="Full Name"
        icon={PersonIcon}
        type="text"
        placeholder="Your full name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />
      <IconField
        label="Phone Number"
        icon={PhoneIcon}
        type="tel"
        placeholder="07XXXXXXXX"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <Alert state={alert} />
      <Button type="submit" variant="flame" block disabled={submitting}>
        {submitting ? 'Registering...' : 'Register For Camp Ignite 2026'}
      </Button>
    </form>
  );
}
