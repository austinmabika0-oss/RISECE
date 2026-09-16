-- Migration for Registration & Payment System

-- 1. Create a sequence for the Registration ID
CREATE SEQUENCE IF NOT EXISTS registration_seq START 1;

-- 2. Function to generate the unique VSTR ID
CREATE OR REPLACE FUNCTION generate_registration_id(roll_number text)
RETURNS text AS $$
DECLARE
  seq_num integer;
  random_chars text;
  result text;
BEGIN
  -- Get next sequence value (padded to 3 digits)
  SELECT nextval('registration_seq') INTO seq_num;
  
  -- Generate 2 random uppercase letters
  SELECT chr(trunc(random() * 26)::int + 65) || chr(trunc(random() * 26)::int + 65) INTO random_chars;
  
  -- Format: VSTR-001AB221FA03015
  result := 'VSTR-' || lpad(seq_num::text, 3, '0') || random_chars || roll_number;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- 3. Create the event_registrations (Payment Cart) table
CREATE TABLE public.event_registrations (
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

CREATE POLICY "Users can view their own registrations" ON public.event_registrations 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all registrations" ON public.event_registrations 
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND admin_role IS NOT NULL)
  );

CREATE POLICY "Users can insert their own registration" ON public.event_registrations 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pending registrations" ON public.event_registrations 
  FOR UPDATE USING (auth.uid() = user_id AND payment_status IN ('PENDING PAYMENT', 'REJECTED'));

CREATE POLICY "Admins can update all registrations" ON public.event_registrations 
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND admin_role = 'super_admin')
  );

-- 4. Secure RPC to calculate and insert registration
CREATE OR REPLACE FUNCTION checkout_registration(
  p_event_ids text[],
  p_program text,
  p_accommodation boolean
) RETURNS text AS $$
DECLARE
  v_user_id uuid;
  v_roll_number text;
  v_event_count integer;
  v_part_fee integer;
  v_acc_fee integer;
  v_total integer;
  v_reg_id text;
  v_existing_id text;
BEGIN
  -- Get user ID
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- Check if user already has a pending or verified registration
  -- To keep it simple, we allow ONE active registration cart per user
  SELECT registration_id INTO v_existing_id 
  FROM public.event_registrations 
  WHERE user_id = v_user_id 
  LIMIT 1;

  IF v_existing_id IS NOT NULL THEN
    RAISE EXCEPTION 'You already have an existing registration. Please manage it in your dashboard.';
  END IF;

  -- Get roll number
  SELECT roll_number INTO v_roll_number FROM public.profiles WHERE id = v_user_id;

  -- Calculate counts and fees
  v_event_count := array_length(p_event_ids, 1);
  
  IF v_event_count IS NULL OR v_event_count = 0 THEN
    RAISE EXCEPTION 'No events selected';
  END IF;

  IF v_event_count <= 2 THEN
    v_part_fee := 200;
  ELSE
    v_part_fee := 300;
  END IF;

  IF p_accommodation THEN
    v_acc_fee := 200;
  ELSE
    v_acc_fee := 0;
  END IF;

  v_total := v_part_fee + v_acc_fee;

  -- Generate ID
  v_reg_id := generate_registration_id(v_roll_number);

  -- Insert
  INSERT INTO public.event_registrations (
    registration_id, user_id, event_ids, program, 
    accommodation_required, accommodation_fee, event_count, 
    participation_fee, total_amount, payment_status
  ) VALUES (
    v_reg_id, v_user_id, p_event_ids, p_program,
    p_accommodation, v_acc_fee, v_event_count,
    v_part_fee, v_total, 'PENDING PAYMENT'
  );

  RETURN v_reg_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
