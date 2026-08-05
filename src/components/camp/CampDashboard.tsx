import { supabase } from '../../lib/supabaseClient';
import { usePaymentHistory } from '../../hooks/usePaymentHistory';
import type { CampRegistrationRow } from '../../types/database';
import { Button } from '../common/Button';
import { FlameMeter } from './FlameMeter';
import { PaymentForm } from './PaymentForm';
import { PaymentHistoryTable } from './PaymentHistoryTable';

export function CampDashboard({
  registration,
  onLoggedOut,
}: {
  registration: CampRegistrationRow;
  onLoggedOut: () => void;
}) {
  const { payments, refetch } = usePaymentHistory(registration.user_id);
  const totalFee = Number(registration.total_fee);
  const amountPaid = Number(registration.amount_paid);
  const remaining = Math.max(0, totalFee - amountPaid);

  async function handleLogout() {
    await supabase.auth.signOut();
    onLoggedOut();
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <span className="dashboard-eyebrow">Camp Ignite 2026</span>
          <h2 className="mb-0">Welcome, {registration.full_name.split(' ')[0]}</h2>
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          Log Out
        </Button>
      </div>

      <div className="dashboard-grid">
        <div className="card center dashboard-flame-card">
          <h3 className="small-note" style={{ textTransform: 'uppercase', letterSpacing: '.06em', fontSize: '.78rem' }}>
            Your Progress
          </h3>
          <FlameMeter pct={Number(registration.percentage_paid) || 0} />
          <div className="dashboard-stats">
            <div className="dashboard-stat">
              <span className="dashboard-stat-value">Ksh {amountPaid.toLocaleString()}</span>
              <span className="dashboard-stat-label">Paid</span>
            </div>
            <div className="dashboard-stat">
              <span className="dashboard-stat-value">Ksh {remaining.toLocaleString()}</span>
              <span className="dashboard-stat-label">Remaining</span>
            </div>
          </div>
        </div>

        <div className="dashboard-main">
          <PaymentForm
            campRegistrationId={registration.id}
            userId={registration.user_id}
            onSubmitted={refetch}
          />
          <PaymentHistoryTable payments={payments} />
        </div>
      </div>
    </div>
  );
}
