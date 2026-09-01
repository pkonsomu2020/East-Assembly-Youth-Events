-- ============================================================
-- MIGRATION: event registration now requires a logged-in account
-- Run this once in Supabase Dashboard -> SQL Editor -> New query,
-- on a project that already ran the original schema.sql.
--
-- IMPORTANT: run this BEFORE deploying the updated frontend. The
-- new EventRegistrationForm sends a `user_id` on every insert; if this
-- column doesn't exist yet, every registration will fail with a
-- "column does not exist" error until this migration is applied.
--
-- Existing rows submitted before this migration are untouched and
-- simply have user_id = null; nothing is deleted or overwritten.
-- ============================================================

alter table event_registrations
  add column if not exists user_id uuid references auth.users(id) on delete set null;

drop policy if exists "Public can insert event registrations" on event_registrations;

create policy "Authenticated users can insert their own event registrations"
  on event_registrations for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can view their own event registrations"
  on event_registrations for select
  using (auth.uid() = user_id);
