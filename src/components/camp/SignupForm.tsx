import { useState } from 'react';
import type { FormEvent } from 'react';
import { supabase } from '../../lib/supabaseClient';
import type { AlertState } from '../../types/domain';
import { Alert } from '../common/Alert';
import { Button } from '../common/Button';
import { IconField } from '../common/IconField';
import { PasswordField } from '../common/PasswordField';
import { PersonIcon, PhoneIcon, EnvelopeIcon } from '../common/formIcons';

export function SignupForm({ onSignedIn }: { onSignedIn: () => void }) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState<AlertState | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlert({ message: 'Passwords do not match.', type: 'error' });
      return;
    }

    setSubmitting(true);
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { full_name: fullName.trim(), phone: phone.trim() },
        emailRedirectTo: `${window.location.origin}/camp-account`,
      },
    });
    setSubmitting(false);

    if (error) {
      setAlert({ message: error.message, type: 'error' });
      return;
    }

    if (!data.session) {
      setAlert({ message: 'Account created! Check your email to confirm, then log in.', type: 'success' });
      return;
    }

    onSignedIn();
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
      <IconField
        label="Email Address"
        icon={EnvelopeIcon}
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <PasswordField
        label="Password"
        placeholder="At least 6 characters"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
      />
      <PasswordField
        label="Confirm Password"
        placeholder="Re-enter your password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        minLength={6}
      />
      <Alert state={alert} />
      <Button type="submit" variant="flame" block disabled={submitting}>
        {submitting ? 'Creating Account...' : '+ Create Account'}
      </Button>
    </form>
  );
}
