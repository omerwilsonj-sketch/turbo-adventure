-- VantageFit Supabase Schema Setup

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";

-- 2. TABLES

-- Profiles Table
create table public.profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamptz,
  username text unique,
  full_name text,
  avatar_url text,
  website text,
  subscription_tier text check (subscription_tier in ('go', 'core', 'vip')) default 'go',
  goal text,
  constraint username_length check (char_length(username) >= 3)
);

-- Workout Logs Table
create table public.workout_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  workout_id text not null,
  date timestamptz default now(),
  duration_seconds integer not null,
  logs jsonb not null,
  notes text
);

-- Nutrition Logs Table
create table public.nutrition_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  date timestamptz default now(),
  food_name text not null,
  calories integer not null,
  protein integer not null,
  carbs integer not null,
  fat integer not null,
  servings float default 1.0
);

-- Chat Channels Table
create table public.chat_channels (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  type text check (type in ('group', 'private')) not null,
  created_at timestamptz default now()
);

-- Chat Messages Table
create table public.chat_messages (
  id uuid default uuid_generate_v4() primary key,
  channel_id uuid references public.chat_channels(id) on delete cascade not null,
  user_id uuid references auth.users not null,
  user_email text,
  content text not null,
  image_url text,
  created_at timestamptz default now()
);

-- 3. ROW LEVEL SECURITY (RLS)

alter table public.profiles enable row level security;
alter table public.workout_logs enable row level security;
alter table public.nutrition_logs enable row level security;
alter table public.chat_channels enable row level security;
alter table public.chat_messages enable row level security;

-- Profiles: Users can view and update their own profile
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);

-- Workout Logs: Users can only see and manage their own logs
create policy "Users can manage own workout logs" on workout_logs 
  for all using (auth.uid() = user_id);

-- Nutrition Logs: Users can only see and manage their own logs
create policy "Users can manage own nutrition logs" on nutrition_logs 
  for all using (auth.uid() = user_id);

-- Chat Channels:
-- Group channels are visible to Core and VIP members
-- Private channels are visible only to the members involved (logic simplified here)
create policy "Group channels are visible to members" on chat_channels 
  for select using (true); -- In practice, check user tier

-- Chat Messages:
-- Users can see messages in channels they have access to
-- (This policy should be refined based on user tier and channel type)
create policy "Users can see messages in their channels" on chat_messages 
  for select using (true); 
create policy "Users can insert messages" on chat_messages 
  for insert with check (auth.uid() = user_id);

-- 4. REALTIME CONFIGURATION
-- Enable realtime for chat_messages
begin;
  -- remove the table from the publication if it exists
  alter publication supabase_realtime HrE_table public.chat_messages;
  -- add the table to the publication
  alter publication supabase_realtime add table public.chat_messages;
commit;

-- 5. TRIGGER FOR NEW USER PROFILE
-- Create a profile automatically when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, full_name, avatar_url, subscription_tier)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', 'go');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
