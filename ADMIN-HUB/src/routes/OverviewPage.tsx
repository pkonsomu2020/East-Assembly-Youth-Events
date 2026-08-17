import { useMemo } from 'react';
import { useCampRegistrants } from '../hooks/useCampRegistrants';
import { useEventRegistrations } from '../hooks/useEventRegistrations';
import { useMerchandiseOrders } from '../hooks/useMerchandiseOrders';
import { useVolunteers } from '../hooks/useVolunteers';
import { useMemberRegistrations } from '../hooks/useMemberRegistrations';
import { getPaymentPattern } from '../lib/paymentPattern';
import { StatCard } from '../components/common/StatCard';

export function OverviewPage() {
  const { registrants, loading: campLoading } = useCampRegistrants();
  const { rows: events, loading: eventsLoading } = useEventRegistrations();
  const { rows: orders, loading: ordersLoading } = useMerchandiseOrders();
  const { rows: volunteers, loading: volunteersLoading } = useVolunteers();
  const { rows: members, loading: membersLoading } = useMemberRegistrations();

  const campStats = useMemo(() => {
    let collected = 0;
    let pendingAmount = 0;
    let pendingCount = 0;
    let fullPayers = 0;
    let installmentPayers = 0;
    let noPayment = 0;

    for (const reg of registrants) {
      collected += Number(reg.amount_paid);
      const pattern = getPaymentPattern(Number(reg.percentage_paid) || 0, reg.payments);
      if (pattern.pattern === 'full-one-time' || pattern.pattern === 'full-installments') fullPayers++;
      else if (pattern.pattern === 'installments' || pattern.pattern === 'partial-one') installmentPayers++;
      else noPayment++;

      for (const payment of reg.payments) {
        if (payment.status === 'pending') {
          pendingAmount += Number(payment.amount);
          pendingCount++;
        }
      }
    }

    return { collected, pendingAmount, pendingCount, fullPayers, installmentPayers, noPayment };
  }, [registrants]);

  const pendingEvents = events.filter((e) => e.payment_status === 'pending').length;
  const pendingOrders = orders.filter((o) => o.order_status === 'pending').length;

  const loading = campLoading || eventsLoading || ordersLoading || volunteersLoading || membersLoading;

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Overview</h1>
          <p className="small-note">A snapshot across Camp Ignite, events, merchandise, and volunteers.</p>
        </div>
      </div>

      {loading ? (
        <p className="small-note">Loading...</p>
      ) : (
        <>
          <h2 style={{ marginTop: 4 }}>Camp Ignite 2026</h2>
          <div className="stat-grid">
            <StatCard label="Registrants" value={String(registrants.length)} />
            <StatCard label="Total Collected" value={`Ksh ${campStats.collected.toLocaleString()}`} tone="success" />
            <StatCard
              label="Pending Verification"
              value={`Ksh ${campStats.pendingAmount.toLocaleString()}`}
              sub={`${campStats.pendingCount} payment${campStats.pendingCount === 1 ? '' : 's'} waiting`}
              tone="pending"
            />
            <StatCard label="Paid In Full" value={String(campStats.fullPayers)} tone="success" />
            <StatCard label="Lipa Small Small" value={String(campStats.installmentPayers)} tone="flame" />
            <StatCard label="No Payment Yet" value={String(campStats.noPayment)} />
          </div>

          <h2>Events & Merchandise</h2>
          <div className="stat-grid">
            <StatCard label="Event Registrations" value={String(events.length)} sub={`${pendingEvents} pending verification`} />
            <StatCard label="Merchandise Orders" value={String(orders.length)} sub={`${pendingOrders} pending verification`} />
            <StatCard label="Volunteers Signed Up" value={String(volunteers.length)} />
            <StatCard
              label="Member Registrations"
              value={String(members.length)}
              sub={`${members.filter((m) => m.member_type === 'born-again').length} born again`}
            />
          </div>
        </>
      )}
    </div>
  );
}
