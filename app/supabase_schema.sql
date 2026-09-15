-- 1. Create a table for public profiles
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  college_name text,
  phone_number text,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Set up Row Level Security (RLS) for profiles
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone." 
  on public.profiles for select using (true);

create policy "Users can insert their own profile." 
  on public.profiles for insert with check (auth.uid() = id);

create policy "Users can update own profile." 
  on public.profiles for update using (auth.uid() = id);

-- 2. Create a table for event registrations
create table public.event_registrations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  event_id text not null, -- matches ID in events.tsx (e.g. 'evt-01')
  registered_at timestamp with time zone default timezone('utc'::text, now()),
  unique(user_id, event_id) -- A user can only register once per event
);

-- Set up Row Level Security (RLS) for event registrations
alter table public.event_registrations enable row level security;

create policy "Users can view their own registrations." 
  on public.event_registrations for select using (auth.uid() = user_id);

create policy "Users can register themselves." 
  on public.event_registrations for insert with check (auth.uid() = user_id);

create policy "Users can unregister themselves." 
  on public.event_registrations for delete using (auth.uid() = user_id);

-- Optional: Enable realtime for admin dashboards later
alter publication supabase_realtime add table public.event_registrations;
