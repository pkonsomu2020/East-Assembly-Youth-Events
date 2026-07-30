import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

export type AuthMode = 'login' | 'signup';

export function AuthPanel({
  mode,
  onModeChange,
  onAuthed,
}: {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  onAuthed: () => void;
}) {
  return (
    <div>
      {mode === 'login' ? <LoginForm onLoggedIn={onAuthed} /> : <SignupForm onSignedIn={onAuthed} />}

      <p className="auth-toggle-link">
        {mode === 'login' ? (
          <>
            New to Camp Ignite?{' '}
            <button type="button" onClick={() => onModeChange('signup')}>
              Create an account
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button type="button" onClick={() => onModeChange('login')}>
              Sign in
            </button>
          </>
        )}
      </p>
    </div>
  );
}
