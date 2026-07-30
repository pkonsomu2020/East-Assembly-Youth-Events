import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export interface PaymentHistoryEntry {
  amount: number;
  status: 'pending' | 'verified' | 'rejected';
  created_at: string;
}

export function usePaymentHistory(userId: string | undefined) {
  const [payments, setPayments] = useState<PaymentHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('camp_payments')
      .select('amount, status, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    setPayments(error || !data ? [] : (data as PaymentHistoryEntry[]));
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { payments, loading, refetch };
}
