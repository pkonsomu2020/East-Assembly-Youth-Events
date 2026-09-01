import { useCallback, useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';

export type AuthUserState =
  | { status: 'loading' }
  | { status: 'signed-out' }
  | { status: 'signed-in'; user: User };

/**
 * Lightweight "is someone logged in" check, shared by any flow that needs to
 * gate content behind login/signup (event registration, Camp Ignite) without
 * caring about camp-specific registration state.
 */
export function useAuthUser() {
  const [state, setState] = useState<AuthUserState>({ status: 'loading' });

  const refresh = useCallback(async () => {
    const { data } = await supabase.auth.getUser();
    setState(data.user ? { status: 'signed-in', user: data.user } : { status: 'signed-out' });
  }, []);

  useEffect(() => {
    refresh();
    const { data: subscription } = supabase.auth.onAuthStateChange(() => refresh());
    return () => subscription.subscription.unsubscribe();
  }, [refresh]);

  return { ...state, refresh };
}
