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

  async function handleLogout() {
    await supabase.auth.signOut();
    onLoggedOut();
  }

  return (
    <div>
      <div className="card center" style={{ marginBottom: 24 }}>
        <h3>Welcome, {registration.full_name.split(' ')[0]}</h3>
        <FlameMeter pct={Number(registration.percentage_paid) || 0} />
        <p style={{ marginTop: 10 }}>
          Paid <b>Ksh {Number(registration.amount_paid).toLocaleString()}</b> of{' '}
          <b>Ksh {Number(registration.total_fee).toLocaleString()}</b>
        </p>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          Log Out
        </Button>
      </div>

      <PaymentForm
        campRegistrationId={registration.id}
        userId={registration.user_id}
        onSubmitted={refetch}
      />

      <PaymentHistoryTable payments={payments} />
    </div>
  );
}
