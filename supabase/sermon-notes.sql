-- ============================================================
-- SERMON NOTES TABLE
-- Run in Supabase Dashboard → SQL Editor → New Query
-- Run AFTER schema.sql
-- ============================================================

create table if not exists sermon_notes (
  id          uuid        primary key default gen_random_uuid(),
  user_id     uuid        not null references auth.users(id) on delete cascade,
  title       text        not null default 'Untitled Note',
  reference   text,                        -- e.g. "John 3:16-18"
  content     text        not null default '',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table sermon_notes enable row level security;

-- Users can only see, create, update and delete their own notes
create policy "Users can view own sermon notes"
  on sermon_notes for select
  using (auth.uid() = user_id);

create policy "Users can create own sermon notes"
  on sermon_notes for insert
  with check (auth.uid() = user_id);

create policy "Users can update own sermon notes"
  on sermon_notes for update
  using (auth.uid() = user_id);

create policy "Users can delete own sermon notes"
  on sermon_notes for delete
  using (auth.uid() = user_id);

-- Trigger to keep updated_at current
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger sermon_notes_updated_at
  before update on sermon_notes
  for each row execute function set_updated_at();

-- ============================================================
-- ADMIN READ ACCESS
-- ============================================================
create policy "Admins can view all sermon notes"
  on sermon_notes for select
  using (is_admin());
