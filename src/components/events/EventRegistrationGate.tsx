import { useState } from 'react';
import { useAuthUser } from '../../hooks/useAuthUser';
import { AuthPanel, type AuthMode } from '../camp/AuthPanel';
import { EventRegistrationForm } from './EventRegistrationForm';
import type { EventDef } from '../../types/domain';

/**
 * Wraps EventRegistrationForm behind a login/signup prompt. Registering for
 * an event now requires the same account used for Camp Ignite, so a visitor
 * who isn't logged in sees AuthPanel first and only reaches the actual
 * registration form once they've signed in or created an account.
 */
export function EventRegistrationGate({ event }: { event: EventDef }) {
  const auth = useAuthUser();
  const [mode, setMode] = useState<AuthMode>('login');

  if (auth.status === 'loading') {
    return <p className="center small-note">Loading...</p>;
  }

  if (auth.status === 'signed-out') {
    return (
      <div>
        <p className="small-note" style={{ marginBottom: 16 }}>
          {mode === 'login'
            ? 'Log in to register for this event.'
            : 'Create a free account to register for this event.'}
        </p>
        <AuthPanel mode={mode} onModeChange={setMode} onAuthed={auth.refresh} />
      </div>
    );
  }

  return <EventRegistrationForm event={event} userId={auth.user.id} />;
}
