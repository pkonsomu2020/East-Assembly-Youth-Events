import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { EventRegistrationRow } from '../types/database';

export function useEventRegistrations() {
  const [rows, setRows] = useState<EventRegistrationRow[]>([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('event_registrations')
      .select('*')
      .order('created_at', { ascending: false });
    setRows((data ?? []) as EventRegistrationRow[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { rows, loading, refetch };
}
