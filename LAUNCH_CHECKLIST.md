# SkillLaunchpad: launch and income setup

This is an owner checklist. The public website has opt-in Google Analytics 4. It has no ad code, affiliate links, visitor accounts, or paid products enabled.

## Published foundation

- Static global site on Cloudflare Pages: https://skilllaunchpad.pages.dev/
- Nine beginner guides, three browser tools, resource directory, About, Contact, FAQ, Privacy, robots.txt, and sitemap.xml.
- Google Search Console ownership was verified and the sitemap was submitted. The owner shared screenshots showing the homepage indexed and one guide available in Google's live URL test. Indexing for every URL still needs to be checked in Search Console over time.
- Browser tools run locally and do not send user inputs to the site.

## AdSense

1. Keep publishing original, useful pages and maintain clear navigation and a good visitor experience. Google reviews sites for unique, relevant content and user experience; approval is Google's decision, not guaranteed by having a certain page count.
2. Apply through the owner's own AdSense account and verify control of the Pages site as Google requests. Do not add sample or copied ad code before the account provides its real publisher/ad code.
3. After approval, add Google's exact code and publisher ID. If Google issues an `ads.txt` record, publish that exact record; never invent a publisher ID.
4. Update the Privacy page before ads begin. Review Google's current publisher policies and any consent requirements that apply to the locations of visitors.
5. Never click your own ads, ask others to click, or put ads where they can be mistaken for tool buttons.

Official starting points: [AdSense site readiness](https://support.google.com/adsense/answer/7299563), [site ownership](https://support.google.com/adsense/answer/91205), [publisher policies](https://support.google.com/adsense/answer/23921).

## Affiliate income

- No affiliate program has been selected or approved. Do not add affiliate links until the owner has joined a program and checked its regional, disclosure, and link rules.
- Add a clear disclosure near affiliate recommendations and update Privacy before those links go live.
- Recommendations need original comparison or other reader value; a page made mostly of affiliate links is not a useful launch strategy.

## Traffic measurement

- Search Console reports search queries, impressions, clicks, and indexing. Review it periodically; an indexing request does not guarantee inclusion.
- Google Analytics 4 is installed with explicit opt-in: the tag loads only after a visitor accepts, the page includes a Privacy choices control, and analytics cookies are cleared where accessible after rejection.
- After deployment, the owner should accept analytics on the live site, then check the GA4 Realtime report. New data can take up to 48 hours to show in standard reports.
- The Privacy page describes analytics. Review any additional privacy/consent duties that apply to the site's audience and location.

## Accounts and admin

- Visitor login is intentionally off while tools remain free and browser-only.
- Supabase admin/login scaffolding is local and unconfigured. It is not linked from public pages or part of this website update.
- To activate accounts later, the owner must create the Supabase project, configure email delivery or a social identity provider, supply the public project URL/key, verify redirect settings, set the owner admin role, and test the full flow. Never use or publish a service-role secret in browser files.
- Login checks around entirely client-side tools are not strong access control. Sensitive or paid features need server-side enforcement before they are gated.