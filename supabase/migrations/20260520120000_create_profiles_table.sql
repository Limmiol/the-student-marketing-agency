-- Create profiles table to store user metadata
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  avatar_url text,
  plan text,
  created_at timestamptz default now()
);

-- Enable Row Level Security and add sensible policies
alter table public.profiles enable row level security;

-- Allow anyone to SELECT public profiles (optional; change as needed)
create policy allow_select_public on public.profiles for select using (true);

-- Allow authenticated users to insert/update/delete only their own profile
create policy users_manage_own_profile on public.profiles
  for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Trigger function to create a profiles row when a new auth user is created
create or replace function public.handle_new_user()
returns trigger as $$
begin
  -- Attempt to create a minimal profile; ignore if it already exists
  insert into public.profiles (id, email, created_at)
  values (new.id, new.email, now())
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

-- Attach trigger to auth.users so profiles are created automatically
create trigger auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
