import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { CampPaymentRow, CampRegistrantWithPayments, CampRegistrationRow } from '../types/database';

export function useCampRegistrants() {
  const [registrants, setRegistrants] = useState<CampRegistrantWithPayments[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    const [{ data: regs, error: regError }, { data: payments, error: payError }] = await Promise.all([
      supabase.from('camp_registrations').select('*').order('created_at', { ascending: false }),
      supabase.from('camp_payments').select('*').order('created_at', { ascending: false }),
    ]);

    if (regError || payError) {
      setError(regError?.message ?? payError?.message ?? 'Failed to load camp registrants.');
      setRegistrants([]);
      setLoading(false);
      return;
    }

    const paymentsByReg = new Map<string, CampPaymentRow[]>();
    for (const payment of (payments ?? []) as CampPaymentRow[]) {
      const list = paymentsByReg.get(payment.camp_registration_id) ?? [];
      list.push(payment);
      paymentsByReg.set(payment.camp_registration_id, list);
    }

    const withPayments = ((regs ?? []) as CampRegistrationRow[]).map((reg) => ({
      ...reg,
      payments: paymentsByReg.get(reg.id) ?? [],
    }));

    setRegistrants(withPayments);
    setLoading(false);
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { registrants, loading, error, refetch };
}
