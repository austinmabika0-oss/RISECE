-- Function to securely invite a user by their Roll Number
-- This avoids exposing the entire profiles table to public queries.
create or replace function invite_user_by_roll_number(target_roll_number text, target_team_id uuid, target_event_id text)
returns json
language plpgsql
security definer
as $$
declare
  target_user_id uuid;
  is_leader boolean;
begin
  -- 1. Check if caller is the team leader
  select exists(
    select 1 from teams where id = target_team_id and leader_id = auth.uid()
  ) into is_leader;
  
  if not is_leader then
    return json_build_object('error', 'Unauthorized: You are not the team leader.');
  end if;

  -- 2. Lookup the user ID by roll number
  select id into target_user_id from profiles where upper(roll_number) = upper(target_roll_number);
  
  if target_user_id is null then
    return json_build_object('error', 'User with this roll number not found.');
  end if;

  -- 3. Check if user is already in a team for this event
  if exists (select 1 from team_members where user_id = target_user_id and event_id = target_event_id) then
    return json_build_object('error', 'This user is already part of a team for this event.');
  end if;

  -- 4. Insert the pending invite
  insert into team_members (team_id, user_id, event_id, role, status)
  values (target_team_id, target_user_id, target_event_id, 'member', 'pending');

  return json_build_object('success', true, 'message', 'Invite sent successfully.');
exception
  when unique_violation then
    return json_build_object('error', 'User is already invited or in a team for this event.');
  when others then
    return json_build_object('error', sqlerrm);
end;
$$;
