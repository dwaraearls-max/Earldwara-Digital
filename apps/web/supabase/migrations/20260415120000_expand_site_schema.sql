-- Richer leads, newsletter compliance fields, profile extras, storage, realtime.
-- Idempotent where possible. Applied via MCP as: expand_site_schema

-- --- Contact / leads ----------------------------------------------------------
alter table public.contact_submissions
  add column if not exists metadata jsonb not null default '{}'::jsonb;

alter table public.contact_submissions
  add column if not exists source text not null default 'web';

alter table public.contact_submissions
  add column if not exists status text not null default 'new';

alter table public.contact_submissions
  drop constraint if exists contact_submissions_status_check;

alter table public.contact_submissions
  add constraint contact_submissions_status_check
  check (status in ('new', 'read', 'replied', 'archived'));

create index if not exists contact_submissions_email_idx
  on public.contact_submissions (lower(trim(email)));

create index if not exists contact_submissions_status_idx
  on public.contact_submissions (status);

comment on column public.contact_submissions.metadata is 'Optional JSON (UTM, page path, etc.) from the client when wired.';
comment on column public.contact_submissions.source is 'Where the lead came from (e.g. web, embed).';
comment on column public.contact_submissions.status is 'Internal CRM-style status for the team.';

-- --- Newsletter ---------------------------------------------------------------
alter table public.newsletter_subscribers
  add column if not exists source text not null default 'web';

alter table public.newsletter_subscribers
  add column if not exists unsubscribed_at timestamptz;

comment on column public.newsletter_subscribers.source is 'Signup source identifier.';
comment on column public.newsletter_subscribers.unsubscribed_at is 'When the user opted out; null if still subscribed.';

create index if not exists newsletter_subscribers_active_idx
  on public.newsletter_subscribers (created_at desc)
  where unsubscribed_at is null;

-- --- Profiles (app users) -----------------------------------------------------
alter table public.profiles
  add column if not exists company text;

alter table public.profiles
  add column if not exists phone text;

alter table public.profiles
  add column if not exists bio text;

comment on column public.profiles.company is 'Optional org name for the signed-in user.';
comment on column public.profiles.phone is 'Optional contact phone.';
comment on column public.profiles.bio is 'Short bio / intro.';

create index if not exists profiles_full_name_idx
  on public.profiles (lower(trim(full_name)))
  where full_name is not null and length(trim(full_name)) > 0;

-- --- Storage: public bucket for user avatars ---------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'avatars',
  'avatars',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public read avatars" on storage.objects;
create policy "Public read avatars"
  on storage.objects for select
  using (bucket_id = 'avatars');

drop policy if exists "Authenticated insert avatars own folder" on storage.objects;
create policy "Authenticated insert avatars own folder"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Authenticated update avatars own folder" on storage.objects;
create policy "Authenticated update avatars own folder"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Authenticated delete avatars own folder" on storage.objects;
create policy "Authenticated delete avatars own folder"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- --- Realtime: profile row changes (optional client subscriptions) ----------
do $pub$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'profiles'
  ) then
    alter publication supabase_realtime add table public.profiles;
  end if;
end
$pub$;
