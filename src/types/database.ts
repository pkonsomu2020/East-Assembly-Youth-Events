export interface EventRegistrationRow {
  id: string;
  user_id: string | null;
  event_slug: string;
  event_name: string;
  full_name: string;
  phone: string;
  expectation: string | null;
  requires_payment: boolean;
  amount_expected: number | null;
  mpesa_message: string | null;
  payment_status: 'not_required' | 'pending' | 'verified';
  created_at: string;
}

export interface MerchandiseOrderRow {
  id: string;
  item_name: string;
  size: string | null;
  color: string | null;
  team_choice: string | null;
  quantity: number;
  unit_price: number;
  total_amount: number;
  buyer_name: string;
  buyer_phone: string;
  mpesa_message: string | null;
  order_status: 'pending' | 'verified' | 'fulfilled';
  created_at: string;
}

export interface VolunteerRow {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  departments: string[];
  availability_notes: string | null;
  created_at: string;
}

export interface CampRegistrationRow {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  total_fee: number;
  amount_paid: number;
  /** Postgres generated column: read-only, never send this in an insert/update payload. */
  percentage_paid: number;
  created_at: string;
}

export interface CampPaymentRow {
  id: string;
  camp_registration_id: string;
  user_id: string;
  amount: number;
  mpesa_message: string;
  status: 'pending' | 'verified' | 'rejected';
  created_at: string;
  verified_at: string | null;
}
