# Admin Hub | KAG East Assembly Youth Ministry

An internal dashboard for ministry leadership: see every Camp Ignite registrant and their payment history (including who's paying "Lipa Small Small" in installments vs. all at once), every event ticket registration, every merchandise order, and every volunteer sign-up, plus one-click payment verification instead of hand-editing rows in the Supabase Table Editor.

This is a **separate app** from the main public site, deployed on its own, but pointed at the **same Supabase project**.

## How access control works (read this before deploying)

Nothing here uses the Supabase `service_role` key. That key bypasses all security rules, and this is a plain static frontend, so shipping it would let anyone who opens dev tools read and modify the entire database. Instead, admin access is granted entirely inside Postgres:

- An `admins` table lists which specific Supabase Auth accounts are allowed to see everything.
- An `is_admin()` database function checks membership in that table.
- Every table's Row Level Security policy uses `is_admin()` to allow admins to read (and for payment status, update) rows that normally only their own owner could see.
- Logging into this app with *any* valid Supabase account (including a regular Camp Ignite account from the main site) does **not** grant access. `useAdminAuth` explicitly calls `is_admin()` after login and shows "not authorized" if it returns false.

## What each page does

- **Overview**: total registrants/collected/pending across Camp Ignite, plus counts for events, merchandise, and volunteers.
- **Camp Ignite**: every registrant, search by name/phone, expandable payment history per person, a "Paid In Full" / "Lipa Small Small" / "No Payments Yet" pattern badge, and a Verify button on pending payments (atomically updates both the payment and the registrant's running total; see `verify_camp_payment()` in `admin-schema.sql`).
- **Events**: every event ticket/registration with a Verify action on pending payments.
- **Merchandise**: every order with Verify then Mark Fulfilled actions.
- **Volunteers**: every sign-up, read-only (no payment concept).
