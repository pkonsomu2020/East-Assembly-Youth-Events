import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export type AdminAuthState =
  | { status: 'loading' }
  | { status: 'signed-out' }
  | { status: 'not-admin' }
  | { status: 'admin'; email: string };

export function useAdminAuth() {
  const [state, setState] = useState<AdminAuthState>({ status: 'loading' });

  const refresh = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setState({ status: 'signed-out' });
      return;
    }

    // Logging in with valid Supabase Auth credentials only proves you have
    // *an* account (e.g. a Camp Ignite account on the main site); never
    // treat that alone as admin access. is_admin() is backed by the same
    // database check that the RLS policies use, so this can't drift out of
    // sync with what the database actually allows a user to read/write.
    const { data: isAdmin, error } = await supabase.rpc('is_admin');

    if (error || !isAdmin) {
      setState({ status: 'not-admin' });
      return;
    }

    setState({ status: 'admin', email: user.email ?? '' });
  }, []);

  useEffect(() => {
    refresh();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => refresh());
    return () => subscription.unsubscribe();
  }, [refresh]);

  async function signOut() {
    await supabase.auth.signOut();
  }

  return { state, refresh, signOut };
}
