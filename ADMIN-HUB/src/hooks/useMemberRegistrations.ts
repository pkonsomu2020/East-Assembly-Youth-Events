import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { MemberRegistrationRow } from '../types/database';

export function useMemberRegistrations() {
  const [rows, setRows] = useState<MemberRegistrationRow[]>([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('member_registrations')
      .select('*')
      .order('created_at', { ascending: false });
    setRows((data ?? []) as MemberRegistrationRow[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { rows, loading, refetch };
}
