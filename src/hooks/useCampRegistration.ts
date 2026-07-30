import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { CampRegistrationRow } from '../types/database';

export type CampViewState =
  | { status: 'loading' }
  | { status: 'signed-out' }
  | { status: 'needs-registration'; userId: string }
  | { status: 'dashboard'; registration: CampRegistrationRow };

export function useCampRegistration() {
  const [state, setState] = useState<CampViewState>({ status: 'loading' });

  const refresh = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setState({ status: 'signed-out' });
      return;
    }

    const { data: reg } = await supabase
      .from('camp_registrations')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (!reg) {
      setState({ status: 'needs-registration', userId: user.id });
      return;
    }

    setState({ status: 'dashboard', registration: reg as CampRegistrationRow });
  }, []);

  useEffect(() => {
    refresh();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => refresh());
    return () => subscription.unsubscribe();
  }, [refresh]);

  return { state, refresh };
}
