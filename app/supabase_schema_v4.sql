-- DROP OLD TABLES TO AVOID SCHEMA CONFLICTS
DROP TABLE IF EXISTS public.event_registrations CASCADE;
DROP TABLE IF EXISTS public.audit_logs CASCADE;
DROP TABLE IF EXISTS public.settings CASCADE;
DROP TABLE IF EXISTS public.media CASCADE;
DROP TABLE IF EXISTS public.downloads CASCADE;
DROP TABLE IF EXISTS public.gallery CASCADE;
DROP TABLE IF EXISTS public.announcements CASCADE;
DROP TABLE IF EXISTS public.sponsors CASCADE;
DROP TABLE IF EXISTS public.event_coordinators CASCADE;
DROP TABLE IF EXISTS public.judging_criteria CASCADE;
DROP TABLE IF EXISTS public.event_rules CASCADE;
DROP TABLE IF EXISTS public.events CASCADE;
DROP TABLE IF EXISTS public.cms_users CASCADE;
DROP TABLE IF EXISTS public.cms_roles CASCADE;
-- ============================================================
-- RISECE 2K26 - CMS & Registration Database Schema (Supabase)
-- Version: 4.0 (Migrated from php_migration)
-- ============================================================

-- ────────────────────────────────────────────
-- ROLES & USERS (CMS)
-- ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.cms_roles (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text UNIQUE NOT NULL,
  permissions jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.cms_users (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  role_id bigint NOT NULL REFERENCES public.cms_roles(id),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  must_change_password boolean DEFAULT true,
  is_active boolean DEFAULT true,
  last_login timestamp with time zone,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- ────────────────────────────────────────────
-- EVENTS
-- ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.events (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  code text NOT NULL,
  title text NOT NULL,
  subtitle text DEFAULT '',
  icon_name text DEFAULT 'building',
  category text DEFAULT '',
  domain text DEFAULT '',
  team_size_text text DEFAULT '',
  is_team_event boolean DEFAULT true,
  min_team_size integer DEFAULT 1,
  max_team_size integer DEFAULT 1,
  duration text DEFAULT '',
  prize text DEFAULT '',
  overview text,
  venue text DEFAULT '',
  event_date text DEFAULT '',
  event_time text DEFAULT '',
  color text DEFAULT '#06b6d4',
  image_path text DEFAULT '',
  status text DEFAULT 'Published' CHECK (status IN ('Draft','Published','Coming Soon','Completed','Hidden')),
  display_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.event_rules (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  event_id bigint NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  rule_text text NOT NULL,
  display_order integer DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.judging_criteria (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  event_id bigint NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  name text NOT NULL,
  detail text,
  max_marks integer DEFAULT 0,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.event_coordinators (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  event_id bigint NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  name text NOT NULL,
  phone text DEFAULT '',
  role text DEFAULT '',
  display_order integer DEFAULT 0
);

-- ────────────────────────────────────────────
-- SPONSORS
-- ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.sponsors (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL,
  category text DEFAULT 'Bronze Sponsor' CHECK (category IN ('Title Sponsor','Gold Sponsor','Silver Sponsor','Bronze Sponsor','Academic Partner','Technical Partner','Industry Partner','Media Partner')),
  logo_path text DEFAULT '',
  logo_dark_path text DEFAULT '',
  website_url text DEFAULT '',
  description text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- ────────────────────────────────────────────
-- ANNOUNCEMENTS
-- ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.announcements (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title text NOT NULL,
  body text NOT NULL,
  type text DEFAULT 'General Notice' CHECK (type IN ('General Notice','Event Update','Schedule Change','Important Alert','News')),
  is_pinned boolean DEFAULT false,
  is_active boolean DEFAULT true,
  scheduled_at timestamp with time zone,
  created_by bigint REFERENCES public.cms_users(id) ON DELETE SET NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- ────────────────────────────────────────────
-- GALLERY
-- ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.gallery (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title text DEFAULT '',
  file_path text NOT NULL,
  file_type text DEFAULT 'image' CHECK (file_type IN ('image','video')),
  category text DEFAULT 'General' CHECK (category IN ('Events','Workshops','Campus','Sponsors','Previous Editions','General')),
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  uploaded_by bigint REFERENCES public.cms_users(id) ON DELETE SET NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- ────────────────────────────────────────────
-- DOWNLOADS
-- ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.downloads (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title text NOT NULL,
  description text,
  file_path text NOT NULL,
  file_type text DEFAULT 'Other' CHECK (file_type IN ('Brochure','Rulebook','Judging Criteria','Poster','Schedule','Certificate','Other')),
  download_count integer DEFAULT 0,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- ────────────────────────────────────────────
-- MEDIA LIBRARY
-- ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.media (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  original_name text NOT NULL,
  file_path text NOT NULL,
  file_type text NOT NULL,
  file_size integer DEFAULT 0,
  alt_text text DEFAULT '',
  tags text DEFAULT '',
  uploaded_by bigint REFERENCES public.cms_users(id) ON DELETE SET NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- ────────────────────────────────────────────
-- GLOBAL SETTINGS
-- ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.settings (
  setting_key text PRIMARY KEY,
  setting_value text NOT NULL,
  setting_type text DEFAULT 'text' CHECK (setting_type IN ('text','json','boolean','url','html')),
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- ────────────────────────────────────────────
-- AUDIT LOG
-- ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id bigint REFERENCES public.cms_users(id) ON DELETE SET NULL,
  action text NOT NULL,
  table_name text DEFAULT '',
  record_id integer DEFAULT 0,
  details text,
  ip_address text DEFAULT '',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- ────────────────────────────────────────────
-- EVENT REGISTRATIONS (From v3)
-- ────────────────────────────────────────────
CREATE SEQUENCE IF NOT EXISTS registration_seq START 1;

CREATE OR REPLACE FUNCTION generate_registration_id(roll_number text)
RETURNS text AS $$
DECLARE
  seq_num integer;
  random_chars text;
  result text;
BEGIN
  SELECT nextval('registration_seq') INTO seq_num;
  SELECT chr(trunc(random() * 26)::int + 65) || chr(trunc(random() * 26)::int + 65) INTO random_chars;
  result := 'VSTR-' || lpad(seq_num::text, 3, '0') || random_chars || roll_number;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS public.event_registrations (
  registration_id text PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  event_ids text[] NOT NULL DEFAULT '{}',
  department text DEFAULT 'Civil Engineering',
  program text NOT NULL,
  accommodation_required boolean DEFAULT false,
  accommodation_fee integer DEFAULT 0,
  event_count integer NOT NULL,
  participation_fee integer NOT NULL,
  total_amount integer NOT NULL,
  payment_status text DEFAULT 'PENDING PAYMENT' CHECK (payment_status IN ('PENDING PAYMENT', 'UNDER VERIFICATION', 'VERIFIED', 'REJECTED')),
  utr_number text UNIQUE,
  payment_screenshot text,
  payment_submitted_at timestamp with time zone,
  payment_verified_at timestamp with time zone,
  payment_verified_by uuid REFERENCES public.profiles(id),
  payment_rejection_reason text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own registrations" ON public.event_registrations;
CREATE POLICY "Users can view their own registrations" ON public.event_registrations 
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all registrations" ON public.event_registrations;
CREATE POLICY "Admins can view all registrations" ON public.event_registrations 
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND admin_role IS NOT NULL)
  );

DROP POLICY IF EXISTS "Users can insert their own registration" ON public.event_registrations;
CREATE POLICY "Users can insert their own registration" ON public.event_registrations 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own pending registrations" ON public.event_registrations;
CREATE POLICY "Users can update their own pending registrations" ON public.event_registrations 
  FOR UPDATE USING (auth.uid() = user_id AND payment_status IN ('PENDING PAYMENT', 'REJECTED'));

DROP POLICY IF EXISTS "Admins can update all registrations" ON public.event_registrations;
CREATE POLICY "Admins can update all registrations" ON public.event_registrations 
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND admin_role = 'super_admin')
  );

