-- Run in Supabase SQL Editor after registering and confirming your owner account.
-- Replace the email below with the exact confirmed account email.
-- The role is stored in server-managed app_metadata, not user-editable user_metadata.
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
where lower(email) = lower('REPLACE_WITH_YOUR_OWNER_EMAIL');
-- Sign out and back in so the refreshed session receives the new role claim.