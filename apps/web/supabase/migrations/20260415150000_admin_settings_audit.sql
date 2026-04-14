-- Workspace settings + audit trail for admin dashboard (RLS: admin only).

create table if not exists public.site_settings (
  category text primary key
    check (char_length(category) > 0 and char_length(category) < 80),
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id) on delete set null
);

comment on table public.site_settings is 'Key-value style app settings per category; editable by admins in /admin/settings.';

create index if not exists site_settings_updated_at_idx
  on public.site_settings (updated_at desc);

alter table public.site_settings enable row level security;

drop policy if exists "site_settings_admin_select" on public.site_settings;
create policy "site_settings_admin_select"
  on public.site_settings
  for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

drop policy if exists "site_settings_admin_insert" on public.site_settings;
create policy "site_settings_admin_insert"
  on public.site_settings
  for insert
  to authenticated
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

drop policy if exists "site_settings_admin_update" on public.site_settings;
create policy "site_settings_admin_update"
  on public.site_settings
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

drop policy if exists "site_settings_admin_delete" on public.site_settings;
create policy "site_settings_admin_delete"
  on public.site_settings
  for delete
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- ---------------------------------------------------------------------------
create table if not exists public.admin_audit_log (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  actor_id uuid not null references auth.users (id) on delete cascade,
  action text not null,
  entity_type text,
  entity_id text,
  details jsonb not null default '{}'::jsonb
);

comment on table public.admin_audit_log is 'Append-only admin activity log (UI + server actions).';

create index if not exists admin_audit_log_created_at_idx
  on public.admin_audit_log (created_at desc);

alter table public.admin_audit_log enable row level security;

drop policy if exists "admin_audit_log_admin_select" on public.admin_audit_log;
create policy "admin_audit_log_admin_select"
  on public.admin_audit_log
  for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

drop policy if exists "admin_audit_log_admin_insert" on public.admin_audit_log;
create policy "admin_audit_log_admin_insert"
  on public.admin_audit_log
  for insert
  to authenticated
  with check (
    actor_id = auth.uid()
    and exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

insert into public.site_settings (category, payload) values
  ('workspace', '{
    "businessName": "Earlsdwara Digital",
    "tagline": "",
    "defaultTimezone": "Africa/Accra",
    "defaultLocale": "en-GH",
    "supportEmail": "",
    "phone": "",
    "websiteUrl": ""
  }'::jsonb),
  ('notifications', '{
    "emailDigest": "off",
    "leadAlerts": true,
    "newsletterWeeklySummary": false,
    "marketingEmails": false,
    "slackWebhookUrl": ""
  }'::jsonb),
  ('security', '{
    "requireReauthForExports": false,
    "sessionReminderHours": 72,
    "ipAllowlistEnabled": false,
    "ipAllowlist": ""
  }'::jsonb),
  ('appearance', '{
    "density": "comfortable",
    "accentPreset": "gold",
    "showSidebarLabels": true
  }'::jsonb),
  ('integrations', '{
    "notes": "Service role and API keys live in environment variables only — never in this table.",
    "resendConfigured": false,
    "sanityConfigured": false
  }'::jsonb)
on conflict (category) do nothing;
