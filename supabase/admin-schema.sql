-- ============================================================
-- ADMIN HUB: ADMIN AUTHORIZATION SCHEMA
-- Run this once in Supabase Dashboard -> SQL Editor -> New query,
-- AFTER schema.sql. Adds a real admin-authorization layer so a
-- separate admin dashboard can read every user's data and verify
-- payments, without ever using the service_role key in a frontend.
-- ============================================================

-- ---------- ADMIN ROLE ----------

create table if not exists admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table admins enable row level security;
-- Intentionally no select/insert/update policy here: this table is only
-- ever read through the is_admin() function below (security definer),
-- never queried directly by a client, even an authenticated one.

create or replace function is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (select 1 from admins where user_id = auth.uid());
$$;

-- ---------- ADMIN READ ACCESS (additive: existing user-scoped policies still apply) ----------

create policy "Admins can view all event registrations"
  on event_registrations for select
  using (is_admin());

create policy "Admins can view all merchandise orders"
  on merchandise_orders for select
  using (is_admin());

create policy "Admins can view all volunteers"
  on volunteers for select
  using (is_admin());

create policy "Admins can view all camp registrations"
  on camp_registrations for select
  using (is_admin());

create policy "Admins can view all camp payments"
  on camp_payments for select
  using (is_admin());

-- ---------- ADMIN VERIFY ACTIONS ----------

-- event_registrations and merchandise_orders: single-column status flips,
-- no cross-table math, so a direct admin UPDATE policy is enough.
create policy "Admins can update event registrations"
  on event_registrations for update
  using (is_admin());

create policy "Admins can update merchandise orders"
  on merchandise_orders for update
  using (is_admin());

-- camp_payments -> camp_registrations.amount_paid has an invariant to protect
-- (amount_paid must equal the sum of verified payments, and a payment must
-- never be double-counted), so this goes through one RPC instead of a broad
-- admin UPDATE policy on either table.
create or replace function verify_camp_payment(p_payment_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_payment camp_payments%rowtype;
begin
  if not is_admin() then
    raise exception 'Not authorized';
  end if;

  select * into v_payment
  from camp_payments
  where id = p_payment_id and status = 'pending'
  for update;

  if not found then
    raise exception 'Payment not found or already processed';
  end if;

  update camp_payments
  set status = 'verified', verified_at = now()
  where id = p_payment_id;

  update camp_registrations
  set amount_paid = amount_paid + v_payment.amount
  where id = v_payment.camp_registration_id;
end;
$$;

-- ============================================================
-- ONE-TIME SETUP TO GRANT YOURSELF ADMIN ACCESS:
-- 1. Supabase Dashboard -> Authentication -> Users -> Add user
--    (create a real login for whoever should have admin access).
-- 2. Copy that user's UID from the Users list.
-- 3. Run, replacing the UID below:
--      insert into admins (user_id) values ('paste-uid-here');
-- Repeat step 3 for each additional admin.
-- ============================================================
