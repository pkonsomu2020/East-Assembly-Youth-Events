import type { CampPaymentRow } from '../types/database';

export type PaymentPattern = 'full-one-time' | 'full-installments' | 'installments' | 'partial-one' | 'none';

export function getPaymentPattern(
  percentagePaid: number,
  payments: CampPaymentRow[],
): { pattern: PaymentPattern; label: string; className: string } {
  const verifiedCount = payments.filter((p) => p.status === 'verified').length;
  const isComplete = percentagePaid >= 100;

  if (payments.length === 0) {
    return { pattern: 'none', label: 'No Payments Yet', className: 'pattern-none' };
  }
  if (isComplete && verifiedCount <= 1) {
    return { pattern: 'full-one-time', label: 'Paid In Full (One-Time)', className: 'pattern-full' };
  }
  if (isComplete) {
    return {
      pattern: 'full-installments',
      label: `Paid In Full (${verifiedCount} Installments)`,
      className: 'pattern-full',
    };
  }
  if (payments.length > 1) {
    return {
      pattern: 'installments',
      label: `Lipa Small Small (${payments.length} payments)`,
      className: 'pattern-installments',
    };
  }
  return { pattern: 'partial-one', label: 'Partial Payment', className: 'pattern-installments' };
}
