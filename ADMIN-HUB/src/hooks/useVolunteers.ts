import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { VolunteerRow } from '../types/database';

export function useVolunteers() {
  const [rows, setRows] = useState<VolunteerRow[]>([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('volunteers').select('*').order('created_at', { ascending: false });
    setRows((data ?? []) as VolunteerRow[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { rows, loading, refetch };
}
