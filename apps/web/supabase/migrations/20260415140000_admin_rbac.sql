-- Admin role on profiles + RLS so authenticated admins can read/update leads & newsletter in the app (not via service role in the browser).

alter table public.profiles
  add column if not exists role text not null default 'user';

alter table public.profiles
  drop constraint if exists profiles_role_check;

alter table public.profiles
  add constraint profiles_role_check
  check (role in ('user', 'admin'));

comment on column public.profiles.role is 'user | admin — only admin can access /admin dashboard data via RLS.';

drop policy if exists "contact_submissions_admin_select" on public.contact_submissions;
create policy "contact_submissions_admin_select"
  on public.contact_submissions
  for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

drop policy if exists "contact_submissions_admin_update" on public.contact_submissions;
create policy "contact_submissions_admin_update"
  on public.contact_submissions
  for update
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

drop policy if exists "newsletter_subscribers_admin_select" on public.newsletter_subscribers;
create policy "newsletter_subscribers_admin_select"
  on public.newsletter_subscribers
  for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

drop policy if exists "newsletter_subscribers_admin_update" on public.newsletter_subscribers;
create policy "newsletter_subscribers_admin_update"
  on public.newsletter_subscribers
  for update
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );
