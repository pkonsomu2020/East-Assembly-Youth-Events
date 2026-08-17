-- ============================================================
-- MEMBER REGISTRATIONS TABLE
-- Run this in Supabase Dashboard -> SQL Editor -> New Query
-- Run AFTER schema.sql and admin-schema.sql
-- ============================================================

create table if not exists member_registrations (
  id uuid primary key default gen_random_uuid(),
  member_type text not null check (member_type in ('new', 'born-again')),
  full_name text not null,
  phone text not null,
  email text,
  residence text,
  age integer check (age > 0 and age < 120),
  how_you_heard text,
  prayer_request text,
  created_at timestamptz not null default now()
);

alter table member_registrations enable row level security;

-- Anyone (even not logged in) can submit a registration
create policy "Public can insert member registrations"
  on member_registrations for insert
  with check (true);

-- No public read access; admins use the admin hub to view registrations
create policy "Admins can view all member registrations"
  on member_registrations for select
  using (is_admin());

-- ============================================================
-- NOTE: is_admin() is defined in admin-schema.sql.
-- Run admin-schema.sql first if you have not already.
-- ============================================================
