-- Core tables: contact_submissions, newsletter_subscribers, profiles + auth trigger.
-- Run before: 20260415120000_expand_site_schema.sql (extra columns, storage, realtime).
-- Applied on Supabase via MCP (names may vary). Re-run in SQL Editor / psql if needed.

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  company text not null,
  service_interest text not null,
  message text not null
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null
);

create unique index if not exists newsletter_subscribers_email_lower_key
  on public.newsletter_subscribers (lower(trim(email)));

alter table public.contact_submissions enable row level security;
alter table public.newsletter_subscribers enable row level security;

comment on table public.contact_submissions is 'Contact / strategy call form (earlsdwara.digital)';
comment on table public.newsletter_subscribers is 'Newsletter signups from the marketing site';

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  full_name text,
  avatar_url text
);

comment on table public.profiles is 'App user profile; row created when a user signs up via Supabase Auth.';

create or replace function public.set_profiles_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row
  execute function public.set_profiles_updated_at();

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select to authenticated
  using (id = (select auth.uid()));

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles for insert to authenticated
  with check (id = (select auth.uid()));

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
