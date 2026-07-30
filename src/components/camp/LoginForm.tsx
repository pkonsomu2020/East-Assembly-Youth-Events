import { useState } from 'react';
import type { FormEvent } from 'react';
import { supabase } from '../../lib/supabaseClient';
import type { AlertState } from '../../types/domain';
import { Alert } from '../common/Alert';
import { Button } from '../common/Button';
import { IconField } from '../common/IconField';
import { PasswordField } from '../common/PasswordField';
import { EnvelopeIcon } from '../common/formIcons';

export function LoginForm({ onLoggedIn }: { onLoggedIn: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState<AlertState | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setSubmitting(false);
    if (error) {
      setAlert({ message: error.message, type: 'error' });
      return;
    }
    onLoggedIn();
  }

  async function handleForgotPassword() {
    if (!email.trim()) {
      setAlert({ message: 'Enter your email above first, then tap "Forgot password?" again.', type: 'error' });
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/camp-account`,
    });
    if (error) {
      setAlert({ message: error.message, type: 'error' });
      return;
    }
    setAlert({ message: 'Password reset link sent — check your email.', type: 'success' });
  }

  return (
    <form onSubmit={handleSubmit}>
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
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        action={
          <button type="button" className="field-inline-link" onClick={handleForgotPassword}>
            Forgot password?
          </button>
        }
      />
      <Alert state={alert} />
      <Button type="submit" variant="flame" block disabled={submitting}>
        {submitting ? 'Signing In...' : '→ Sign In'}
      </Button>
    </form>
  );
}
