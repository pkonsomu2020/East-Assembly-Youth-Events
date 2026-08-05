import { useState } from 'react';
import type { FormEvent } from 'react';
import { supabase } from '../lib/supabaseClient';

export function LoginPage({ notAdmin, onSignOut }: { notAdmin?: boolean; onSignOut?: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setSubmitting(false);
    if (error) setError(error.message);
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <img src="/assets/logo.png" alt="KAG East Assembly Youth Ministry" className="login-logo" />
        <h1 style={{ textAlign: 'center', fontSize: '1.3rem' }}>Admin Hub</h1>
        <p className="small-note" style={{ textAlign: 'center', marginBottom: 20 }}>
          Sign in with your admin account to continue.
        </p>

        {notAdmin && (
          <div className="alert alert-error">
            This account doesn't have admin access. Ask an existing admin to grant it, or{' '}
            <button
              type="button"
              onClick={onSignOut}
              style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', textDecoration: 'underline', cursor: 'pointer' }}
            >
              sign out
            </button>{' '}
            and use a different account.
          </div>
        )}

        {!notAdmin && (
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {error && <div className="alert alert-error">{error}</div>}
            <button type="submit" className="btn btn-flame" style={{ width: '100%' }} disabled={submitting}>
              {submitting ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
