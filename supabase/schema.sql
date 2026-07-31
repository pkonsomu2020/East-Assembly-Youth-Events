-- ============================================================
-- KAG EAST ASSEMBLY YOUTH MINISTRY: SUPABASE SCHEMA
-- Run this once in Supabase Dashboard -> SQL Editor -> New query
-- ============================================================

-- ---------- EVENTS & TICKETING ----------

create table if not exists event_registrations (
  id uuid primary key default gen_random_uuid(),
  event_slug text not null,            -- 'youth-dinner' | 'youth-retreat' | 'worship-experience' | 'chill-out'
  event_name text not null,
  full_name text not null,
  phone text not null,
  expectation text,
  requires_payment boolean not null default false,
  amount_expected numeric,
  mpesa_message text,                  -- pasted M-Pesa confirmation, verified manually
  payment_status text not null default 'not_required', -- 'not_required' | 'pending' | 'verified'
  created_at timestamptz not null default now()
);

alter table event_registrations enable row level security;

-- Anyone (even not logged in) can submit a registration
create policy "Public can insert event registrations"
  on event_registrations for insert
  with check (true);

-- No public read access; admins use the Supabase Table Editor / service role to view & verify.

-- ---------- MERCHANDISE ----------

create table if not exists merchandise_orders (
  id uuid primary key default gen_random_uuid(),
  item_name text not null,             -- 'Hoodie' | 'T-Shirt' | 'Jersey' | 'Cap' | 'Tote Bag' | 'Pen' | 'Sweatshirt' | 'Book'
  size text,                           -- S, M, L, XL, 2XL (not applicable to caps/tote bags/pens)
  color text,
  team_choice text,                    -- only for jerseys
  quantity int not null default 1,
  unit_price numeric not null,
  total_amount numeric not null,
  buyer_name text not null,
  buyer_phone text not null,
  mpesa_message text,
  order_status text not null default 'pending', -- 'pending' | 'verified' | 'fulfilled'
  created_at timestamptz not null default now()
);

alter table merchandise_orders enable row level security;

create policy "Public can insert merchandise orders"
  on merchandise_orders for insert
  with check (true);

-- ---------- VOLUNTEERS ----------

create table if not exists volunteers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,
  departments text[] not null,         -- e.g. {'Media','Worship'}
  availability_notes text,
  created_at timestamptz not null default now()
);

alter table volunteers enable row level security;

create policy "Public can insert volunteer signups"
  on volunteers for insert
  with check (true);

-- ---------- CAMP IGNITE 2026 (requires login) ----------

create table if not exists camp_registrations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade unique,
  full_name text not null,
  phone text not null,
  total_fee numeric not null default 12900,
  amount_paid numeric not null default 0,
  percentage_paid numeric generated always as (
    case when total_fee > 0 then round((amount_paid / total_fee) * 100, 1) else 0 end
  ) stored,
  created_at timestamptz not null default now()
);

alter table camp_registrations enable row level security;

create policy "Users can view their own camp registration"
  on camp_registrations for select
  using (auth.uid() = user_id);

create policy "Users can create their own camp registration"
  on camp_registrations for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own camp registration"
  on camp_registrations for update
  using (auth.uid() = user_id);

create table if not exists camp_payments (
  id uuid primary key default gen_random_uuid(),
  camp_registration_id uuid not null references camp_registrations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  amount numeric not null,
  mpesa_message text not null,
  status text not null default 'pending', -- 'pending' | 'verified' | 'rejected'
  created_at timestamptz not null default now(),
  verified_at timestamptz
);

alter table camp_payments enable row level security;

create policy "Users can view their own camp payments"
  on camp_payments for select
  using (auth.uid() = user_id);

create policy "Users can submit their own camp payments"
  on camp_payments for insert
  with check (auth.uid() = user_id);

-- ============================================================
-- ADMIN WORKFLOW (manual, no admin app needed):
-- 1. Youth ministry team checks M-Pesa for a payment matching
--    till 3171352 (JOAN GATHONI NJAU).
-- 2. Open Supabase -> Table Editor -> camp_payments, find the row
--    (match by amount + pasted message), set status = 'verified'.
-- 3. Open camp_registrations for that user, update amount_paid by
--    adding the verified amount. percentage_paid recalculates
--    automatically since it's a generated column.
-- The same manual pattern applies to event_registrations and
-- merchandise_orders: update payment_status / order_status once
-- you've confirmed the M-Pesa message against your till statement.
-- ============================================================
