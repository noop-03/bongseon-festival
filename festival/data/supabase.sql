-- Auth schema and RLS policies for festival app

-- tables: profiles, gallery_items, questions

create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  role text not null default 'user', -- 'user' | 'admin'
  display_name text,
  created_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;

create policy "profiles are viewable by self or admin"
  on public.profiles for select
  using (auth.uid() = id or exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "profiles are insertable by user"
  on public.profiles for insert with check (auth.uid() = id);

create policy "profiles updatable by owner or admin"
  on public.profiles for update using (auth.uid() = id or exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
  ));

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete set null,
  caption text,
  url text not null,
  approved boolean not null default false,
  created_at timestamp with time zone default now()
);

alter table public.gallery_items enable row level security;

create policy "gallery viewable if approved or own"
  on public.gallery_items for select using (approved = true or auth.uid() = user_id);

create policy "gallery insert requires auth"
  on public.gallery_items for insert with check (auth.uid() = user_id);

create policy "gallery update by admin only"
  on public.gallery_items for update using (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
  ));

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete set null,
  content text not null,
  approved boolean not null default false,
  created_at timestamp with time zone default now()
);

alter table public.questions enable row level security;

create policy "questions viewable if approved or own"
  on public.questions for select using (approved = true or auth.uid() = user_id);

create policy "questions insert requires auth"
  on public.questions for insert with check (auth.uid() = user_id);

create policy "questions update by admin only"
  on public.questions for update using (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
  ));
