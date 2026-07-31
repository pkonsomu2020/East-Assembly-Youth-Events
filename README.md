# KAG East Assembly Youth Ministry Website

A React + TypeScript site (built with Vite) with Supabase as the backend/database, ready to deploy on Vercel.

## What's included

- `src/routes/HomePage.tsx`: Home page
- `src/routes/EventsPage.tsx`: Youth Dinner, Youth Retreat/Hiking, Youth Worship Experience, Chill Out (tickets + free registration + calendar)
- `src/routes/MerchandisePage.tsx`: Hoodies, T-Shirts, Jerseys, Caps, Tote Bags, Pens, Sweatshirts, Sweat Suits, Books (coming soon)
- `src/routes/CampIgnitePage.tsx`: Camp Ignite 2026 sign up/login + personal payment dashboard
- `src/routes/VolunteerPage.tsx`: Media / Worship / Ushers / Hospitality / Evangelism / Photography sign-up
- `supabase/schema.sql`: full database schema to run in Supabase
- `.env`: where you paste your Supabase project keys (gitignored; see `.env.example` for the format)
- `src/data/siteConfig.ts`: shared, non-secret site settings (till number, contact, camp fee, camp dates)

## 1. Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor → New Query**, paste the entire contents of `supabase/schema.sql`, and run it. This creates all the tables and security rules.
3. Go to **Project Settings → API** and copy your **Project URL** and **anon public key**.
4. Copy `.env.example` to `.env` and paste them in:
   ```
   VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```
5. (Recommended for a youth audience) In **Authentication → Providers → Email**, you can turn **off** "Confirm email" so people can create a Camp Ignite account and start using it immediately without checking their inbox. If you leave it on, new users must click a confirmation link before logging in.

## 2. How payments are verified (no admin app needed)

Every payment (event tickets, merchandise orders, camp installments) is submitted with a pasted M-Pesa confirmation message but is **not** automatically verified. That's intentional, since only you can check it against the actual till statement.

To verify a payment:
1. Check M-Pesa for a matching transaction on till **3171352 (JOAN GATHONI NJAU)**.
2. Go to your Supabase project → **Table Editor**.
3. Find the matching row:
   - `event_registrations` → set `payment_status` to `verified`
   - `merchandise_orders` → set `order_status` to `verified` (and `fulfilled` once handed over)
   - `camp_payments` → set `status` to `verified`, **and** open `camp_registrations`, find that person's row, and add the verified amount to their `amount_paid`. Their percentage bar on the site updates automatically; it's calculated by the database, not stored separately.
4. Notify the person directly (call/SMS/WhatsApp) that their payment/percentage has been updated, since the site doesn't send automatic notifications yet.

## 3. Local development

```bash
npm install
npm run dev
```
Opens a dev server (default `http://localhost:5173`) with hot reload. You'll need a real `.env` (step 1 above) for anything that talks to Supabase: event tickets, merchandise orders, camp accounts, and volunteer sign-ups.

To check the production build locally:
```bash
npm run build
npm run preview
```

## 4. Deploy on Vercel

1. Push this whole folder to a GitHub repository.
2. In Vercel, click **Add New → Project** and import the GitHub repo.
3. Name the project `east-assembly-youth-events`. Vercel assigns the URL `https://<project-name>.vercel.app`, so this name gives you `east-assembly-youth-events.vercel.app`.
4. Vercel auto-detects the Vite framework preset (build command `npm run build`, output directory `dist`). The included `vercel.json` pins these explicitly and also adds the SPA rewrite rule (`/* → /index.html`) so that refreshing or deep-linking to a route like `/events` or `/camp-ignite` doesn't 404. No manual routing configuration needed.
5. Under **Project Settings → Environment Variables**, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (same values as your local `.env`) for the Production (and Preview, if you want preview deployments to work too) environment.
6. Deploy.
7. **Update Supabase's allowed redirect URLs**: go to your Supabase project → **Authentication → URL Configuration** and:
   - Set **Site URL** to `https://east-assembly-youth-events.vercel.app`
   - Add `https://east-assembly-youth-events.vercel.app/**` to **Redirect URLs** (keep `http://localhost:5173/**` there too so local dev still works)

   This matters because the "Forgot password?" and signup-confirmation emails link back to whatever URL the app requests (`src/components/camp/LoginForm.tsx` and `SignupForm.tsx` build this from `window.location.origin`, so it's automatically correct for local dev, Vercel preview deployments, and production). Supabase will silently reject any redirect URL that isn't on this allow-list, so the production domain has to be added here or those email links won't work.

## 5. Things you'll likely want to fill in later

- **Social media links**: currently placeholders in the footer of every page. Swap the `href="#"` for your real Facebook/Instagram/YouTube/WhatsApp links (search `src/components/layout/SiteFooter.tsx` for `aria-label="Facebook"` etc.).
- **Ticket prices for Youth Dinner and Youth Retreat**: you didn't give a fixed shilling amount for these, so right now people type in the amount they're sending themselves (which then gets verified against your till). If you'd rather set a fixed price (e.g. Ksh 500), tell me the amount for each and I'll lock the form to that.
- **Youth Retreat date**: currently marked "date to be communicated" (`src/data/events.ts`); once you have a date, I can add it to the event card and calendar the same way Dinner, Worship Experience, and Chill Out are set up.
- **Books**: the merchandise page has a placeholder "coming soon" card; send me the price and details whenever you have them.
- **Event calendar months**: the calendar on the Events page currently only renders August and October 2026 (`src/components/events/EventCalendar.tsx`), matching the events with confirmed dates at the time it was built. It can be made to auto-generate from the events list once all dates are confirmed.

## 6. Theme & branding

Light blue (`#5FC4F0`/`#0E7BAE`) + white throughout, with a flame/fire accent (`#FF7A45`) used for buttons and the Camp Ignite payment progress meter (shaped like a flame filling up as someone pays). Design tokens live in `src/styles/tokens.css`.

Your actual logo is used in every header and footer. The white Camp Ignite flame mark sits inside a blue banner at the top of the Camp Ignite page.
