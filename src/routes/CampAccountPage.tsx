import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthPanel, type AuthMode } from '../components/camp/AuthPanel';
import { RegisterCampForm } from '../components/camp/RegisterCampForm';
import { CampDashboard } from '../components/camp/CampDashboard';
import { useCampRegistration } from '../hooks/useCampRegistration';

export function CampAccountPage() {
  const { state, refresh } = useCampRegistration();
  const [mode, setMode] = useState<AuthMode>('login');

  let heading = 'Welcome Back';
  let subheading = 'Sign in to continue tracking your Camp Ignite progress';

  if (state.status === 'signed-out' && mode === 'signup') {
    heading = 'Join Camp Ignite 2026';
    subheading = 'Create your account to start tracking your payments';
  } else if (state.status === 'needs-registration') {
    heading = 'Complete Your Registration';
    subheading = 'Just your name and phone number — takes less than a minute';
  } else if (state.status === 'dashboard') {
    heading = 'Your Camp Ignite Dashboard';
    subheading = 'Track your payments and progress toward camp';
  }

  return (
    <section className="auth-page">
      <span className="auth-page-decor auth-page-decor-1" />
      <span className="auth-page-decor auth-page-decor-2" />

      <div className="auth-page-inner">
        <Link to="/" className="auth-logo-link">
          <img src="/assets/logo.png" alt="KAG East Assembly Youth Ministry" className="auth-logo" />
        </Link>
        <h1 className="auth-heading">{heading}</h1>
        <p className="auth-subheading">{subheading}</p>

        {state.status === 'dashboard' ? (
          <CampDashboard registration={state.registration} onLoggedOut={refresh} />
        ) : (
          <div className="auth-card">
            {state.status === 'loading' && <p className="center small-note">Loading...</p>}
            {state.status === 'signed-out' && (
              <AuthPanel mode={mode} onModeChange={setMode} onAuthed={refresh} />
            )}
            {state.status === 'needs-registration' && (
              <RegisterCampForm userId={state.userId} onRegistered={refresh} />
            )}
          </div>
        )}

        <p className="small-note center" style={{ marginTop: 20 }}>
          <Link to="/camp-ignite">← Back to Camp Ignite 2026</Link>
        </p>
      </div>
    </section>
  );
}
