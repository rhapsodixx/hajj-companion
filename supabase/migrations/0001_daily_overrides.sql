-- Daily overrides table for muthawwif schedule updates
-- Run this in Supabase SQL Editor after creating the project

create table if not exists public.daily_overrides (
  id uuid default gen_random_uuid() primary key,
  day_number integer not null check (day_number between 1 and 26),
  bus text not null check (bus in ('B-18', 'B-19', 'B-20', 'B-21', 'all')),
  field text not null check (field in ('departureTime', 'note')),
  value text not null,
  published_at timestamptz default now() not null,
  published_by text not null,
  created_at timestamptz default now() not null
);

-- Enable RLS
alter table public.daily_overrides enable row level security;

-- Anyone can read (app needs this for fetching overrides)
create policy "Overrides are publicly readable"
  on public.daily_overrides
  for select
  using (true);

-- Anyone can insert (admin page is password-gated on the frontend)
create policy "Overrides are insertable"
  on public.daily_overrides
  for insert
  with check (true);

-- Anyone can delete (admin manages overrides)
create policy "Overrides are deletable"
  on public.daily_overrides
  for delete
  using (true);

-- Index for the most common query: today's overrides for a specific bus
create index idx_overrides_day_bus on public.daily_overrides (day_number, bus);
