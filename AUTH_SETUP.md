# SkillLaunchpad owner admin setup

The public guides and tools remain open to visitors. This setup is for one owner account and the private `/admin.html` dashboard only. There is no public sign-up and visitor tools do not require login.

## Admin dashboard features

- Overview cards show published guide/tool/sitemap counts.
- A short site checklist links to Search Console and Analytics.
- Publishing shortcuts open the GitHub source repository and Cloudflare Pages deployments.
- This site is static: content changes are committed to GitHub and deployed by Cloudflare. The dashboard is a control room, not a CMS and does not directly edit site files.

## Connect owner sign-in

1. Open the owner login page at `https://skilllaunchpad.pages.dev/login.html` after deployment; until Supabase is connected, login is intentionally disabled. Create a Supabase project on the Free plan.
2. In Supabase Project Settings, copy the Project URL and public publishable (or legacy anon) key into `auth-config.js`. Never put a `service_role` or secret key in browser files.
3. In Supabase Authentication URL Configuration, set Site URL to `https://skilllaunchpad.pages.dev` and add redirect URLs `https://skilllaunchpad.pages.dev/login.html` and `https://skilllaunchpad.pages.dev/reset-password.html`.
4. In Supabase Authentication settings, disable public sign-ups. Create the owner's user directly in the Supabase dashboard (Users → Add user) and confirm it there.
5. Replace the placeholder email in `supabase-admin-setup.sql` with the owner's confirmed email, run the SQL in Supabase SQL Editor, then sign out and back in so the session receives the admin role.
6. Configure email delivery if password reset emails are needed.
7. Deploy the configured auth files and dashboard. Verify the owner can sign in, a non-admin cannot access `/admin.html`, sign-out works, and public tools remain available without login.

Supabase client-side auth is only the gate for this read-only owner dashboard. Never use it as authorization for privileged database operations; such work needs a server-side function with verified claims and minimal permissions.
