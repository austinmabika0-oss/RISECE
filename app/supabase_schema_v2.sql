-- DROP OLD TABLES FOR CLEAN SLATE
DROP TABLE IF EXISTS public.team_members CASCADE;
DROP TABLE IF EXISTS public.teams CASCADE;
DROP TABLE IF EXISTS public.event_registrations CASCADE;
DROP TABLE IF EXISTS public.events CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- 1. Profiles Table (Extended)
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  full_name text NOT NULL,
  roll_number text UNIQUE NOT NULL,
  college_id text, -- ID of the university from our dataset
  college_name text NOT NULL,
  branch text NOT NULL,
  year_of_study integer NOT NULL,
  phone_number text NOT NULL,
  id_url text, -- For future college ID uploads
  admin_role text DEFAULT NULL CHECK (admin_role IN ('super_admin', 'event_admin', 'viewer')), -- Role-based admin access
  admin_events text[] DEFAULT '{}', -- Array of event_ids this admin manages (for event_admin)
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Super Admins can update any profile." ON public.profiles FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND admin_role = 'super_admin'
  )
);

-- 2. Events Configuration Table
CREATE TABLE public.events (
  id text PRIMARY KEY, -- e.g., 'evt-01'
  title text NOT NULL,
  is_team_event boolean DEFAULT false,
  min_team_size integer DEFAULT 1,
  max_team_size integer DEFAULT 1,
  max_capacity integer DEFAULT 100, -- Max number of teams/individuals
  registration_deadline timestamp with time zone,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Events are viewable by everyone." ON public.events FOR SELECT USING (true);
-- Only admins should modify events, assuming a future admin role setup

-- 3. Teams Table
CREATE TABLE public.teams (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id text REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  leader_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'locked', 'approved', 'rejected')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  UNIQUE(event_id, name) -- Prevent duplicate team names per event
);

ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teams are viewable by everyone." ON public.teams FOR SELECT USING (true);
CREATE POLICY "Admins have full access to teams." ON public.teams FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND (
      admin_role = 'super_admin' OR 
      (admin_role = 'event_admin' AND public.teams.event_id = ANY(admin_events))
    )
  )
);
CREATE POLICY "Any authenticated user can create a team." ON public.teams FOR INSERT WITH CHECK (auth.uid() = leader_id);
CREATE POLICY "Team leader can update their team." ON public.teams FOR UPDATE USING (auth.uid() = leader_id);

-- 4. Team Members / Event Registrations Table
CREATE TABLE public.team_members (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id uuid REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  event_id text REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  role text DEFAULT 'member' CHECK (role IN ('leader', 'member')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  UNIQUE(team_id, user_id), -- A user can only be added to a specific team once
  UNIQUE(event_id, user_id) -- CRITICAL CONSTRAINT: One student = One team per event
);

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Team members viewable by everyone." ON public.team_members FOR SELECT USING (true);
CREATE POLICY "Admins have full access to team_members." ON public.team_members FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND (
      admin_role = 'super_admin' OR 
      (admin_role = 'event_admin' AND public.team_members.event_id = ANY(admin_events))
    )
  )
);
CREATE POLICY "Users can accept/decline invites." ON public.team_members FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Team leaders can invite members." ON public.team_members FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.teams WHERE id = team_id AND leader_id = auth.uid()
  )
);
CREATE POLICY "Users can insert themselves (Individual Registration)." ON public.team_members FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can leave teams." ON public.team_members FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Team leaders can remove members." ON public.team_members FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM public.teams WHERE id = team_id AND leader_id = auth.uid()
  )
);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.team_members;

-- 5. Admin Audit Logs
CREATE TABLE public.admin_audit_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  action text NOT NULL,
  target_id text, -- ID of the affected registration/team
  details jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Super Admins can view audit logs." ON public.admin_audit_logs FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND admin_role = 'super_admin')
);
CREATE POLICY "Admins can insert audit logs." ON public.admin_audit_logs FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND admin_role IS NOT NULL)
);

-- 6. Seed Events Data
-- This populates the events table so foreign key constraints are satisfied when creating teams.
INSERT INTO public.events (id, title, is_team_event, min_team_size, max_team_size) VALUES
('1', 'Bridgemania', true, 2, 4),
('2', 'AutoCAD', false, 1, 1),
('3', 'AI PROJECT', true, 2, 5),
('4', 'Technical Quiz', false, 1, 1),
('5', 'Paper presentation', true, 1, 2),
('6', 'Smart Mix', true, 2, 4),
('7', 'Technical Treasure Hunt', true, 2, 4),
('8', 'Model Making', true, 2, 4)
ON CONFLICT (id) DO NOTHING;
