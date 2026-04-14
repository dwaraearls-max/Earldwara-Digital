-- Denormalize auth email onto profiles so you can query: WHERE email = '...'
-- Applied via MCP as: profiles_add_email_column

alter table public.profiles
  add column if not exists email text;

comment on column public.profiles.email is 'Copy of auth.users.email for convenient lookups; kept in sync by triggers.';

-- Backfill from Supabase Auth
update public.profiles p
set email = u.email
from auth.users u
where p.id = u.id
  and (p.email is distinct from u.email);

create unique index if not exists profiles_email_lower_key
  on public.profiles (lower(trim(email)))
  where email is not null and length(trim(email)) > 0;

-- New signups: store email on profile row
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

-- Keep profile email in sync when user changes email in Auth
create or replace function public.sync_profile_email()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.email is distinct from old.email then
    update public.profiles
    set email = new.email
    where id = new.id;
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_email_updated on auth.users;
create trigger on_auth_user_email_updated
  after update of email on auth.users
  for each row
  execute function public.sync_profile_email();
