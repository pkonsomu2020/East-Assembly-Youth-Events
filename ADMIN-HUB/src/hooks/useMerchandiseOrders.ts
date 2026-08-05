import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { MerchandiseOrderRow } from '../types/database';

export function useMerchandiseOrders() {
  const [rows, setRows] = useState<MerchandiseOrderRow[]>([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('merchandise_orders')
      .select('*')
      .order('created_at', { ascending: false });
    setRows((data ?? []) as MerchandiseOrderRow[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { rows, loading, refetch };
}
